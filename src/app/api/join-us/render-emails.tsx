import { render } from '@react-email/components'
import JoinUsConfirmationEmail from '@/emails/join-us-confirmation'
import JoinUsNotificationEmail from '@/emails/join-us-notification'

interface NotificationProps {
  name: string
  email: string
  country: string
  linkedin?: string
  portfolio?: string
  cvFilename: string
}

export const renderNotification = (props: NotificationProps) =>
  render(<JoinUsNotificationEmail {...props} />)

export const renderConfirmation = (name: string) =>
  render(<JoinUsConfirmationEmail name={name} />)
