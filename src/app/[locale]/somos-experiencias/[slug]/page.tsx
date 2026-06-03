import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type Locale } from '@/i18n/routing'
import { DetailGallery } from '@/components/sections/activaciones/detail-gallery'
import { activations } from '@/lib/data/activations'
import { getAlternates } from '@/lib/seo'

interface Props {
  params: Promise<{ locale: Locale; slug: string }>
}

export function generateStaticParams() {
  return activations.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const activation = activations.find((a) => a.slug === slug)
  if (!activation) return {}
  const t = await getTranslations({ locale, namespace: 'ActivationItems' })
  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.description`),
    alternates: getAlternates('/somos-experiencias/[slug]', locale, slug),
  }
}

export default async function ExperienciaDetallePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const activation = activations.find((a) => a.slug === slug)
  if (!activation) notFound()

  return (
    <main className="relative bg-black min-h-screen">
      <DetailGallery activation={activation} />
    </main>
  )
}
