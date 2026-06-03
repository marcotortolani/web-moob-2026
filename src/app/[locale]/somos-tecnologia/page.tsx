import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type Locale } from '@/i18n/routing'
import { HeroTech } from '@/components/sections/tecnologia/hero-tech'
import { ServiceDetail } from '@/components/sections/tecnologia/service-detail'
import { getAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'TechPage' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: getAlternates('/somos-tecnologia', locale),
  }
}

export default async function SomosTecnologiaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="bg-black min-h-screen">
      <HeroTech />
      <ServiceDetail />
    </main>
  )
}
