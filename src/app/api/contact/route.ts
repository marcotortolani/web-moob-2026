import { getTranslations } from 'next-intl/server'
import { getFromAddress, sendEmail } from '@/lib/email/sender'
import { contactSchema } from '@/lib/schemas/contact'
import { renderConfirmation, renderNotification } from './render-emails'

const LOCALES = ['es', 'en', 'pt'] as const
type AppLocale = (typeof LOCALES)[number]

function resolveLocale(value: unknown): AppLocale {
  return LOCALES.includes(value as AppLocale) ? (value as AppLocale) : 'es'
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const locale = resolveLocale(
    body && typeof body === 'object' ? (body as { locale?: unknown }).locale : undefined
  )

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { name, email, message, country } = parsed.data
  const from = getFromAddress()
  const t = await getTranslations({ locale, namespace: 'Emails' })

  try {
    await sendEmail({
      from,
      to: process.env.CONTACT_TO_EMAIL ?? 'hola@memoob.com',
      replyTo: email,
      subject: t('subjects.contactNotify'),
      html: await renderNotification({
        name,
        email,
        message,
        country,
        locale,
        preview: t('contactNotify.preview', { name }),
        heading: t('contactNotify.heading'),
        labels: {
          name: t('contactNotify.name'),
          email: t('contactNotify.email'),
          country: t('contactNotify.country'),
          message: t('contactNotify.message'),
        },
      }),
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

  renderConfirmation({
    locale,
    preview: t('contactConfirm.preview', { name }),
    heading: t('contactConfirm.heading'),
    body: t('contactConfirm.body', { name }),
    accent: t('contactConfirm.accent'),
    footer: t('contactConfirm.footer'),
  })
    .then((html) =>
      sendEmail({
        from,
        to: email,
        subject: t('subjects.contactConfirm'),
        html,
      })
    )
    .catch((err) => console.error('[contact] auto-reply failed:', err))

  return Response.json({ ok: true })
}
