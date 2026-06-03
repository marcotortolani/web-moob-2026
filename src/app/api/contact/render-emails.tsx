import { render } from '@react-email/components'
import ContactConfirmationEmail from '@/emails/contact-confirmation'
import ContactNotificationEmail from '@/emails/contact-notification'

interface NotificationProps {
  name: string
  email: string
  message: string
  country?: string
  locale: string
  preview: string
  heading: string
  labels: {
    name: string
    email: string
    country: string
    message: string
  }
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
  render(<ContactNotificationEmail {...props} />)

export const renderConfirmation = (props: ConfirmationProps) =>
  render(<ContactConfirmationEmail {...props} />)
