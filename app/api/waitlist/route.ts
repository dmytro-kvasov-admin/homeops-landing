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
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
  const adminEmail = process.env.RESEND_ADMIN_EMAIL || 'homeopsaiapp@gmail.com'

  try {
    // Confirmation email to the user
    await resend.emails.send({
      from: `HomeOps <${fromEmail}>`,
      to: email,
      subject: "You're on the HomeOps waitlist",
      html: userConfirmationEmail(name),
    })

    // Internal lead notification
    await resend.emails.send({
      from: `HomeOps Alerts <${fromEmail}>`,
      to: adminEmail,
      subject: `New waitlist signup: ${email}`,
      html: adminNotificationEmail(name, email, age, zip),
    })

    return Response.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    if (message.includes('already exists') || message.includes('duplicate')) {
      return Response.json({ success: true })
    }
    return Response.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }
}
