import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type Locale } from '@/i18n/routing'
import { ContenidoExperience } from '@/components/sections/contenido/contenido-experience'
import { getAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ContentHub' })
  return {
    title: `${t('label')} ${t('title')}`,
    description: t('metaDescription'),
    alternates: getAlternates('/somos-contenido', locale),
  }
}

export default async function SomosContenidoPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <link rel="preconnect" href="https://player.vimeo.com" />
      <link rel="preconnect" href="https://i.vimeocdn.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://f.vimeocdn.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fresnel.vimeocdn.com" />
      <ContenidoExperience />
    </>
  )
}
