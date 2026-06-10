import { Resend } from 'resend'
import { z } from 'zod'
import { userConfirmationEmail, adminNotificationEmail } from '@/app/lib/emails'

export const runtime = 'edge'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().max(100).optional(),
  age: z.string().optional(),
  zip: z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits').optional(),
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

  const { email, name, age, zip } = parsed.data
  const resend = new Resend(process.env.RESEND_API_KEY)
  const adminEmail = process.env.RESEND_ADMIN_EMAIL || 'homeopsaiapp@gmail.com'
  // Resend's shared sender — works without a verified domain.
  // Note: with `onboarding@resend.dev`, Resend only allows sending to the
  // email that owns the Resend account. To send to arbitrary signups you
  // must verify a domain at resend.com/domains.
  const fromAddress = 'HomeOps <onboarding@resend.dev>'

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

  try {
    console.log('[waitlist] incoming signup', { email, name, age, zip, from: fromAddress, adminEmail })

    const userResult = await resend.emails.send({
      from: fromAddress,
      replyTo: adminEmail,
      to: email,
      subject: "You're on the HomeOps waitlist",
      html: userConfirmationEmail(name),
    })
    console.log('[waitlist] user email result', userResult)
    if (userResult.error) {
      return errorPayload('User confirmation send failed', userResult.error)
    }

    const adminResult = await resend.emails.send({
      from: fromAddress,
      replyTo: email,
      to: adminEmail,
      subject: `New waitlist signup: ${email}`,
      html: adminNotificationEmail(name, email, age, zip),
    })
    console.log('[waitlist] admin email result', adminResult)
    if (adminResult.error) {
      // User mail already sent — surface the admin error but still treat overall as success.
      console.error('[waitlist] admin send error (non-fatal):', adminResult.error)
    }

    return Response.json({ success: true, userId: userResult.data?.id, adminId: adminResult.data?.id })
  } catch (err) {
    return errorPayload('Resend exception', err)
  }
}
