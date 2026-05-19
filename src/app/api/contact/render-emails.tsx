import { render } from '@react-email/components'
import ContactConfirmationEmail from '@/emails/contact-confirmation'
import ContactNotificationEmail from '@/emails/contact-notification'

interface NotificationProps {
  name: string
  email: string
  message: string
  country?: string
}

export const renderNotification = (props: NotificationProps) =>
  render(<ContactNotificationEmail {...props} />)

export const renderConfirmation = (name: string) =>
  render(<ContactConfirmationEmail name={name} />)
