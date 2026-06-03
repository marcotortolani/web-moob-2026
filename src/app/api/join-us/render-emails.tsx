import { render } from '@react-email/components'
import JoinUsConfirmationEmail from '@/emails/join-us-confirmation'
import JoinUsNotificationEmail from '@/emails/join-us-notification'

interface NotificationProps {
  name: string
  email: string
  country: string
  linkedin?: string
  portfolio?: string
  locale: string
  preview: string
  heading: string
  labels: {
    name: string
    email: string
    country: string
    linkedin: string
    portfolio: string
  }
  cvAttached: string
}

interface ConfirmationProps {
  locale: string
  preview: string
  heading: string
  body: string
  accent: string
  footer: string
}

export const renderNotification = (props: NotificationProps) =>
  render(<JoinUsNotificationEmail {...props} />)

export const renderConfirmation = (props: ConfirmationProps) =>
  render(<JoinUsConfirmationEmail {...props} />)
