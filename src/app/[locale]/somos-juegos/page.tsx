import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type Locale } from '@/i18n/routing'
import { HeroJuegos } from '@/components/sections/juegos/hero-juegos'
import { GameShowcase } from '@/components/sections/juegos/game-showcase'
import { getAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'GamesPage' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: getAlternates('/somos-juegos', locale),
  }
}

export default async function SomosJuegosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="bg-black min-h-screen">
      <HeroJuegos />
      <GameShowcase />
    </main>
  )
}
