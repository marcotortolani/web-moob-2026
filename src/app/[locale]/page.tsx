import { HeroSection } from '@/components/sections/home/hero-section'
import { ContentSection } from '@/components/sections/home/content-section'
import { StatsSection } from '@/components/sections/home/stats-section'
import { EventsSection } from '@/components/sections/home/events-section'
import { TechSection } from '@/components/sections/home/tech-section'
import { ActivationsSection } from '@/components/sections/home/activations-section'
import { GamesSection } from '@/components/sections/home/games-section'
import { MapSection } from '@/components/sections/home/map-section'
import { ContactSection } from '@/components/sections/home/contact-section'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ProductsSlider } from '@/components/sections/home/products-slider'
import { BrandsSlider } from '@/components/sections/home/brands-slider'
import type { Locale } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    alternates: getAlternates('/', locale),
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="flex-1">
      <HeroSection locale={locale} />
      <ContentSection />
      <ProductsSlider />
      <StatsSection />
      <TechSection />
      <EventsSection />
      <BrandsSlider />
      <ActivationsSection />
      <GamesSection />
      <MapSection />
      <ContactSection />
    </main>
  )
}
