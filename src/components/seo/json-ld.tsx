import { SITE_URL } from '@/lib/seo'
import { socialLinks } from '@/lib/data/social'

interface JsonLdProps {
  locale: string
}

/**
 * Injects Organization + WebSite structured data (JSON-LD / schema.org)
 * into every page. Runs server-side only — no client JS.
 */
export function JsonLd({ locale }: JsonLdProps) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Media Moob',
    url: SITE_URL,
    logo: `${SITE_URL}/images/media-moob-logo-large.webp`,
    sameAs: [socialLinks.instagram, socialLinks.linkedin],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Media Moob',
    url: SITE_URL,
    inLanguage: locale,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
