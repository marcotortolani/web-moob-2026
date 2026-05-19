import { sendEmail } from '@/lib/email/sender'
import { contactSchema } from '@/lib/schemas/contact'
import { renderConfirmation, renderNotification } from './render-emails'

const FROM = 'Web Moob <web@memoob.com>'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { name, email, message, country } = parsed.data

  try {
    await sendEmail({
      from: FROM,
      to: process.env.CONTACT_TO_EMAIL ?? 'hola@memoob.com',
      replyTo: email,
      subject: 'Formulario Contacto Website Moob',
      html: await renderNotification({ name, email, message, country }),
    })
  } catch (err) {
    console.error('[contact] send failed:', err)
    const detail =
      process.env.NODE_ENV !== 'production' && err instanceof Error
        ? err.message
        : undefined
    return Response.json(
      { ok: false, error: 'send_failed', detail },
      { status: 502 }
    )
  }

  renderConfirmation(name)
    .then((html) =>
      sendEmail({
        from: FROM,
        to: email,
        subject: 'Recibimos tu mensaje — Moob',
        html,
      })
    )
    .catch((err) => console.error('[contact] auto-reply failed:', err))

  return Response.json({ ok: true })
}
