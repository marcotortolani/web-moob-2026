import { sendEmail } from '@/lib/email/sender'
import { joinUsServerSchema } from '@/lib/schemas/join-us'
import { renderConfirmation, renderNotification } from './render-emails'

const FROM = 'Web Moob <web@memoob.com>'
const CV_MAX_SIZE = 5 * 1024 * 1024

export async function POST(request: Request) {
  const formData = await request.formData()

  const body = {
    name: formData.get('name'),
    email: formData.get('email'),
    country: formData.get('country'),
    linkedin: formData.get('linkedin') ?? '',
    portfolio: formData.get('portfolio') ?? '',
  }

  const parsed = joinUsServerSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const cvFile = formData.get('cv')
  if (!(cvFile instanceof File) || cvFile.size === 0) {
    return Response.json({ ok: false, error: 'CV requerido' }, { status: 400 })
  }
  if (cvFile.type !== 'application/pdf') {
    return Response.json({ ok: false, error: 'Solo PDF' }, { status: 400 })
  }
  if (cvFile.size > CV_MAX_SIZE) {
    return Response.json({ ok: false, error: 'PDF demasiado grande' }, { status: 400 })
  }

  const { name, email, country, linkedin, portfolio } = parsed.data
  const cvBuffer = Buffer.from(await cvFile.arrayBuffer())
  const cvFilename = cvFile.name || 'cv.pdf'

  try {
    await sendEmail({
      from: FROM,
      to: process.env.JOIN_US_TO_EMAIL ?? 'hola@memoob.com',
      replyTo: email,
      subject: 'Nueva postulación Website Moob',
      attachments: [{ filename: cvFilename, content: cvBuffer }],
      html: await renderNotification({
        name,
        email,
        country,
        linkedin: linkedin || undefined,
        portfolio: portfolio || undefined,
        cvFilename,
      }),
    })
  } catch (err) {
    console.error('[join-us] send failed:', err)
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
        subject: 'Recibimos tu postulación — Moob',
        html,
      })
    )
    .catch((err) => console.error('[join-us] auto-reply failed:', err))

  return Response.json({ ok: true })
}
