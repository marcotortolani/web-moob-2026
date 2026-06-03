import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type Locale } from '@/i18n/routing'
import { JoinUsSection } from '@/components/sections/join-us/join-us-section'
import { getAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'JoinUs' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: getAlternates('/join-us', locale),
  }
}

export default async function JoinUsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <JoinUsSection />
}
