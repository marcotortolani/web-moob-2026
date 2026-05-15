import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { DetailGallery } from '@/components/sections/activaciones/detail-gallery'
import { activations } from '@/lib/data/activations'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return activations.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const activation = activations.find((a) => a.slug === slug)
  if (!activation) return {}
  return {
    title: activation.title,
    description: activation.description,
  }
}

export default async function ExperienciaDetallePage({ params }: Props) {
  const { slug } = await params
  const activation = activations.find((a) => a.slug === slug)
  if (!activation) notFound()

  return (
    <main className="relative bg-black min-h-screen">
      <DetailGallery activation={activation} />
    </main>
  )
}
