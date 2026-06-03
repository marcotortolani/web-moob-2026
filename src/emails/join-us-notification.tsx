import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'
import { formatCountry } from '@/lib/countries'

interface Props {
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

const styles = {
  main: { backgroundColor: '#0a0a0a', fontFamily: 'sans-serif' },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#111111',
    borderRadius: '12px',
    padding: '32px',
  },
  heading: { color: '#40b09d', margin: '0 0 24px', fontSize: '22px' },
  label: { color: '#999999', fontSize: '12px', margin: '0 0 4px' },
  value: { color: '#ffffff', fontSize: '15px', margin: '0 0 16px' },
  link: { color: '#40b09d' },
  note: {
    color: '#999999',
    fontSize: '12px',
    marginTop: '24px',
    borderTop: '1px solid #222222',
    paddingTop: '16px',
  },
}

export default function JoinUsNotificationEmail({
  name,
  email,
  country,
  linkedin,
  portfolio,
  locale,
  preview,
  heading,
  labels,
  cvAttached,
}: Props) {
  return (
    <Html lang={locale}>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>{heading}</Heading>

          <Text style={styles.label}>{labels.name}</Text>
          <Text style={styles.value}>{name}</Text>

          <Text style={styles.label}>{labels.email}</Text>
          <Text style={styles.value}>
            <Link href={`mailto:${email}`} style={styles.link}>{email}</Link>
          </Text>

          <Text style={styles.label}>{labels.country}</Text>
          <Text style={styles.value}>{formatCountry(country) ?? country}</Text>

          {linkedin && (
            <>
              <Text style={styles.label}>{labels.linkedin}</Text>
              <Text style={styles.value}>
                <Link href={linkedin} style={styles.link}>{linkedin}</Link>
              </Text>
            </>
          )}

          {portfolio && (
            <>
              <Text style={styles.label}>{labels.portfolio}</Text>
              <Text style={styles.value}>
                <Link href={portfolio} style={styles.link}>{portfolio}</Link>
              </Text>
            </>
          )}

          <Text style={styles.note}>{cvAttached}</Text>
        </Container>
      </Body>
    </Html>
  )
}
