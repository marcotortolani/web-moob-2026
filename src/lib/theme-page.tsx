import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type Locale } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo'
import { ThemeHero } from '@/components/sections/contenido/theme/theme-hero'
import { ThemeStats } from '@/components/sections/contenido/theme/theme-stats'
import { ThemeProductsSlider } from '@/components/sections/contenido/theme/theme-products-slider'
import type { ThemeContent } from '@/lib/data/contenido/types'

export async function generateThemeMetadata(
  slug: string,
  params: Promise<{ locale: Locale }>,
): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ContentThemes' })
  return {
    title: t(`${slug}.metaTitle`),
    description: t(`${slug}.heroDescription`),
    alternates: getAlternates(`/somos-contenido/${slug}`, locale),
  }
}

interface ThemePageProps {
  slug: string
  content: ThemeContent
  params: Promise<{ locale: Locale }>
}

export async function ThemePage({ slug, content, params }: ThemePageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'ContentThemes' })
  const tHub = await getTranslations({ locale, namespace: 'ContentHub' })

  return (
    <main className="bg-black min-h-screen pt-14">
      <ThemeHero
        {...content.hero}
        label={tHub('label')}
        title={t(`${slug}.heroTitle`)}
        description={t(`${slug}.heroDescription`)}
      />
      <ThemeStats
        {...content.stats}
        label={t(`${slug}.statsLabel`)}
        caption={t(`${slug}.statsCaption`)}
        ctaText={t(`${slug}.statsCta`)}
      />
      <ThemeProductsSlider products={content.products} themeSlug={slug} />
    </main>
  )
}
