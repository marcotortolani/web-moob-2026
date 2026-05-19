import { getResend } from './resend'
import { sendViaBrevo } from './brevo'

interface EmailOptions {
  from: string
  to: string
  replyTo?: string
  subject: string
  html: string
  attachments?: Array<{ filename: string; content: Buffer }>
}

const isDev = process.env.NODE_ENV !== 'production'

export function getFromAddress(): string {
  if (process.env.RESEND_API_KEY) {
    return process.env.RESEND_FROM_EMAIL ?? 'Web Moob <onboarding@resend.dev>'
  }
  if (process.env.BREVO_API_KEY) {
    return process.env.BREVO_FROM_EMAIL ?? 'Web Moob <hola@memoob.com>'
  }
  return 'Web Moob <web@memoob.com>'
}

export async function sendEmail(opts: EmailOptions): Promise<void> {
  if (process.env.RESEND_API_KEY) {
    if (isDev) console.log('[email] using resend')
    const { error } = await getResend().emails.send({
      from: opts.from,
      to: opts.to,
      replyTo: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
      attachments: opts.attachments,
    })
    if (error) throw new Error(`${error.name}: ${error.message}`)
    return
  }

  if (process.env.BREVO_API_KEY) {
    if (isDev) console.log('[email] using brevo')
    await sendViaBrevo(opts)
    return
  }

  throw new Error('No email provider configured: set RESEND_API_KEY or BREVO_API_KEY')
}
