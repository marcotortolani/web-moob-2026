import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface Props {
  locale: string
  preview: string
  heading: string
  body: string
  accent: string
  footer: string
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
  heading: { color: '#40b09d', margin: '0 0 16px', fontSize: '22px' },
  text: { color: '#cccccc', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' },
  accent: {
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    borderLeft: '3px solid #40b09d',
    padding: '16px 20px',
    marginTop: '8px',
  },
  accentText: { color: '#ffffff', margin: '0', fontSize: '15px' },
  footer: { color: '#555555', fontSize: '12px', marginTop: '32px' },
}

export default function ContactConfirmationEmail({
  locale,
  preview,
  heading,
  body,
  accent,
  footer,
}: Props) {
  return (
    <Html lang={locale}>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>{heading}</Heading>

          <Text style={styles.text}>{body}</Text>

          <Section style={styles.accent}>
            <Text style={styles.accentText}>{accent}</Text>
          </Section>

          <Text style={styles.footer}>{footer}</Text>
        </Container>
      </Body>
    </Html>
  )
}
