import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { DetailGallery } from '@/components/sections/eventos/detail-gallery'
import { events } from '@/lib/data/events'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = events.find((e) => e.slug === slug)
  if (!event) return {}
  return {
    title: event.title,
    description: event.description,
  }
}

export default async function EventoDetallePage({ params }: Props) {
  const { slug } = await params
  const event = events.find((e) => e.slug === slug)
  if (!event) notFound()

  return (
    <main className="relative bg-black min-h-screen">
      <DetailGallery event={event} />
    </main>
  )
}
