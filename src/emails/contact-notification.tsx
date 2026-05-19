import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { formatCountry } from '@/lib/countries'

interface Props {
  name: string
  email: string
  message: string
  country?: string
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
  messageBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    borderLeft: '3px solid #40b09d',
    padding: '20px',
    marginTop: '8px',
  },
  messageText: { color: '#ffffff', margin: '0', whiteSpace: 'pre-wrap' as const },
  link: { color: '#40b09d' },
}

export default function ContactNotificationEmail({ name, email, message, country }: Props) {
  const countryLabel = formatCountry(country)
  return (
    <Html lang="es">
      <Head />
      <Preview>Nuevo mensaje de {name}</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Nuevo mensaje de contacto</Heading>

          <Text style={styles.label}>NOMBRE</Text>
          <Text style={styles.value}>{name}</Text>

          <Text style={styles.label}>EMAIL</Text>
          <Text style={styles.value}>
            <Link href={`mailto:${email}`} style={styles.link}>{email}</Link>
          </Text>

          {countryLabel && (
            <>
              <Text style={styles.label}>PAÍS</Text>
              <Text style={styles.value}>{countryLabel}</Text>
            </>
          )}

          <Text style={styles.label}>MENSAJE</Text>
          <Section style={styles.messageBox}>
            <Text style={styles.messageText}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
