import { getTranslations } from 'next-intl/server'
import { getFromAddress, sendEmail } from '@/lib/email/sender'
import { joinUsServerSchema } from '@/lib/schemas/join-us'
import { renderConfirmation, renderNotification } from './render-emails'

const CV_MAX_SIZE = 5 * 1024 * 1024

const LOCALES = ['es', 'en', 'pt'] as const
type AppLocale = (typeof LOCALES)[number]

function resolveLocale(value: unknown): AppLocale {
  return LOCALES.includes(value as AppLocale) ? (value as AppLocale) : 'es'
}

export async function POST(request: Request) {
  const formData = await request.formData()

  const locale = resolveLocale(formData.get('locale'))
  const t = await getTranslations({ locale, namespace: 'Emails' })

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
    return Response.json(
      { ok: false, error: t('apiErrors.cvRequired') },
      { status: 400 }
    )
  }
  if (cvFile.type !== 'application/pdf') {
    return Response.json(
      { ok: false, error: t('apiErrors.cvPdf') },
      { status: 400 }
    )
  }
  if (cvFile.size > CV_MAX_SIZE) {
    return Response.json(
      { ok: false, error: t('apiErrors.cvSize') },
      { status: 400 }
    )
  }

  const { name, email, country, linkedin, portfolio } = parsed.data
  const cvBuffer = Buffer.from(await cvFile.arrayBuffer())
  const cvFilename = cvFile.name || 'cv.pdf'
  const from = getFromAddress()

  try {
    await sendEmail({
      from,
      to: process.env.JOIN_US_TO_EMAIL ?? 'hola@memoob.com',
      replyTo: email,
      subject: t('subjects.joinNotify'),
      attachments: [{ filename: cvFilename, content: cvBuffer }],
      html: await renderNotification({
        name,
        email,
        country,
        linkedin: linkedin || undefined,
        portfolio: portfolio || undefined,
        locale,
        preview: t('joinNotify.preview', { name }),
        heading: t('joinNotify.heading'),
        labels: {
          name: t('joinNotify.name'),
          email: t('joinNotify.email'),
          country: t('joinNotify.country'),
          linkedin: t('joinNotify.linkedin'),
          portfolio: t('joinNotify.portfolio'),
        },
        cvAttached: t('joinNotify.cvAttached', { filename: cvFilename }),
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

  renderConfirmation({
    locale,
    preview: t('joinConfirm.preview', { name }),
    heading: t('joinConfirm.heading'),
    body: t('joinConfirm.body', { name }),
    accent: t('joinConfirm.accent'),
    footer: t('joinConfirm.footer'),
  })
    .then((html) =>
      sendEmail({
        from,
        to: email,
        subject: t('subjects.joinConfirm'),
        html,
      })
    )
    .catch((err) => console.error('[join-us] auto-reply failed:', err))

  return Response.json({ ok: true })
}
