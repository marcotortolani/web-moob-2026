interface BrevoOptions {
  from: string
  to: string
  replyTo?: string
  subject: string
  html: string
  attachments?: Array<{ filename: string; content: Buffer }>
}

function parseNameEmail(value: string): { name?: string; email: string } {
  const match = value.match(/^(.+?)\s*<([^>]+)>$/)
  if (match) return { name: match[1].trim(), email: match[2].trim() }
  return { email: value.trim() }
}

export async function sendViaBrevo(opts: BrevoOptions): Promise<void> {
  const sender = parseNameEmail(opts.from)
  const recipient = parseNameEmail(opts.to)

  const body: Record<string, unknown> = {
    sender,
    to: [recipient],
    subject: opts.subject,
    htmlContent: opts.html,
  }

  if (opts.replyTo) {
    body.replyTo = parseNameEmail(opts.replyTo)
  }

  if (opts.attachments?.length) {
    body.attachment = opts.attachments.map((a) => ({
      name: a.filename,
      content: a.content.toString('base64'),
    }))
  }

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Brevo error ${res.status}: ${text}`)
  }
}
