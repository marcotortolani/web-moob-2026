import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type Locale } from '@/i18n/routing'
import { DetailGallery } from '@/components/sections/eventos/detail-gallery'
import { events } from '@/lib/data/events'
import { getAlternates } from '@/lib/seo'

interface Props {
  params: Promise<{ locale: Locale; slug: string }>
}

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const event = events.find((e) => e.slug === slug)
  if (!event) return {}
  const t = await getTranslations({ locale, namespace: 'EventItems' })
  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.description`),
    alternates: getAlternates('/somos-eventos/[slug]', locale, slug),
  }
}

export default async function EventoDetallePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const event = events.find((e) => e.slug === slug)
  if (!event) notFound()

  return (
    <main className="relative bg-black min-h-screen">
      <DetailGallery event={event} />
    </main>
  )
}
