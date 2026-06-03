import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type Locale } from '@/i18n/routing'
import { HeroEventos } from '@/components/sections/eventos/hero-eventos'
import { EventsGrid } from '@/components/sections/eventos/events-grid'
import { getAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'EventsPage' })
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: getAlternates('/somos-eventos', locale),
  }
}

export default async function SomosEventosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="bg-black min-h-screen">
      <HeroEventos />
      <EventsGrid />
    </main>
  )
}
