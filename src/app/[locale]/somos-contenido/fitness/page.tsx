import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type Locale } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo'
import { ThemeHero } from '@/components/sections/contenido/theme/theme-hero'
import { ThemeStats } from '@/components/sections/contenido/theme/theme-stats'
import { ThemeProductsSlider } from '@/components/sections/contenido/theme/theme-products-slider'
import { fitnessContent } from '@/lib/data/contenido/fitness'

const SLUG = 'fitness'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ContentThemes' })
  return {
    title: t(`${SLUG}.metaTitle`),
    description: t(`${SLUG}.heroDescription`),
    alternates: getAlternates(`/somos-contenido/${SLUG}`, locale),
  }
}

export default async function SomosFitnessPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'ContentThemes' })
  const tHub = await getTranslations({ locale, namespace: 'ContentHub' })

  return (
    <main className="bg-black min-h-screen pt-14">
      <ThemeHero
        {...fitnessContent.hero}
        label={tHub('label')}
        title={t(`${SLUG}.heroTitle`)}
        description={t(`${SLUG}.heroDescription`)}
      />
      <ThemeStats
        {...fitnessContent.stats}
        label={t(`${SLUG}.statsLabel`)}
        caption={t(`${SLUG}.statsCaption`)}
        ctaText={t(`${SLUG}.statsCta`)}
      />
      <ThemeProductsSlider products={fitnessContent.products} themeSlug={SLUG} />
    </main>
  )
}
