import nodemailer from 'nodemailer'
import { getResend } from './resend'

interface EmailOptions {
  from: string
  to: string
  replyTo?: string
  subject: string
  html: string
  attachments?: Array<{ filename: string; content: Buffer }>
}

function getNodemailerTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

const isDev = process.env.NODE_ENV !== 'production'

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

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error(
      'No email provider configured: set RESEND_API_KEY or GMAIL_USER + GMAIL_APP_PASSWORD'
    )
  }

  if (isDev) console.log('[email] using nodemailer gmail')

  await getNodemailerTransport().sendMail({
    from: `Moob Web <${process.env.GMAIL_USER}>`,
    to: opts.to,
    replyTo: opts.replyTo ?? opts.from,
    subject: opts.subject,
    html: opts.html,
    attachments: opts.attachments,
  })
}
