import { Resend } from 'resend'
import { z } from 'zod'
import { userConfirmationEmail, adminNotificationEmail, type ClientMetadata } from '@/app/lib/emails'

export const runtime = 'edge'

const metadataSchema = z
  .object({
    userAgent: z.string().max(500).optional(),
    language: z.string().max(50).optional(),
    timezone: z.string().max(100).optional(),
    viewport: z.object({ width: z.number(), height: z.number() }).optional(),
    screen: z.object({ width: z.number(), height: z.number(), dpr: z.number() }).optional(),
    referrer: z.string().max(1000).optional(),
    landingUrl: z.string().max(1000).optional(),
    submitUrl: z.string().max(1000).optional(),
    utm: z
      .object({
        source: z.string().max(200).optional(),
        medium: z.string().max(200).optional(),
        campaign: z.string().max(200).optional(),
        term: z.string().max(200).optional(),
        content: z.string().max(200).optional(),
      })
      .optional(),
    gclid: z.string().max(200).optional(),
    fbclid: z.string().max(200).optional(),
    connection: z.string().max(20).optional(),
    timeOnPageMs: z.number().optional(),
  })
  .optional()

const schema = z.object({
  email: z.string().email('Invalid email address'),
  metadata: metadataSchema,
})

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { error: 'Service unavailable. Please try again later.' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.errors[0]?.message ?? 'Invalid input' },
      { status: 400 }
    )
  }

  const { email, metadata } = parsed.data
  const resend = new Resend(process.env.RESEND_API_KEY)
  const adminEmail = process.env.RESEND_ADMIN_EMAIL || 'homeopsaiapp@gmail.com'
  // Resend's shared sender — works without a verified domain.
  // Until a domain is verified, this sender can only deliver to the Resend
  // account owner's address (i.e. `adminEmail`). Flip RESEND_DOMAIN_VERIFIED=true
  // and update `fromAddress` once homeops.us (or .com) is verified at
  // resend.com/domains.
  const domainVerified = process.env.RESEND_DOMAIN_VERIFIED === 'true'
  const fromAddress = domainVerified
    ? (process.env.RESEND_FROM_EMAIL || 'HomeOps <noreply@homeops.us>')
    : 'HomeOps <onboarding@resend.dev>'

  const errorPayload = (label: string, detail: unknown, status = 500) => {
    const message = detail instanceof Error
      ? detail.message
      : typeof detail === 'string'
        ? detail
        : detail && typeof detail === 'object' && 'message' in detail && typeof (detail as { message: unknown }).message === 'string'
          ? (detail as { message: string }).message
          : 'Unknown error'
    console.error(`[waitlist] ${label}:`, detail)
    return Response.json(
      { error: `${label}: ${message}`, detail },
      { status },
    )
  }

  // Pull request-side signals we couldn't get from the browser.
  const requestMeta = {
    ip:
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      undefined,
    country: request.headers.get('x-vercel-ip-country') || undefined,
    region: request.headers.get('x-vercel-ip-country-region') || undefined,
    city: request.headers.get('x-vercel-ip-city')
      ? decodeURIComponent(request.headers.get('x-vercel-ip-city') as string)
      : undefined,
  }

  const fullMetadata: ClientMetadata & typeof requestMeta = {
    ...(metadata ?? {}),
    ...requestMeta,
  }

  try {
    console.log('[waitlist] incoming signup', {
      email,
      metadata: fullMetadata,
      from: fromAddress,
      adminEmail,
      domainVerified,
    })

    // Admin notification — always send. Uses customer email as replyTo so you
    // can reply directly to the lead from your inbox.
    const adminResult = await resend.emails.send({
      from: fromAddress,
      replyTo: email,
      to: adminEmail,
      subject: `New waitlist signup: ${email}`,
      html: adminNotificationEmail(email, fullMetadata),
    })
    console.log('[waitlist] admin email result', adminResult)
    if (adminResult.error) {
      return errorPayload('Admin notification send failed', adminResult.error)
    }

    // Customer confirmation — only sent once a verified domain is configured.
    // Without it, Resend's sandbox refuses any recipient that isn't the account owner.
    let userId: string | undefined
    if (domainVerified) {
      const userResult = await resend.emails.send({
        from: fromAddress,
        replyTo: adminEmail,
        to: email,
        subject: "You're on the HomeOps waitlist",
        html: userConfirmationEmail(),
      })
      console.log('[waitlist] user email result', userResult)
      if (userResult.error) {
        // Lead is already captured — surface but don't fail the signup.
        console.error('[waitlist] user send error (non-fatal):', userResult.error)
      } else {
        userId = userResult.data?.id
      }
    } else {
      console.log('[waitlist] skipping user confirmation — domain not verified')
    }

    return Response.json({
      success: true,
      adminId: adminResult.data?.id,
      userId,
      confirmationEmailSent: Boolean(userId),
    })
  } catch (err) {
    return errorPayload('Resend exception', err)
  }
}
