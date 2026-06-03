import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type Locale } from '@/i18n/routing'
import { HeroActivaciones } from '@/components/sections/activaciones/hero-activaciones'
import { ActivationsGrid } from '@/components/sections/activaciones/activations-grid'
import { getAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ExperiencesPage' })
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: getAlternates('/somos-experiencias', locale),
  }
}

export default async function SomosExperienciasPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="bg-black min-h-screen">
      <HeroActivaciones />
      <ActivationsGrid />
    </main>
  )
}
