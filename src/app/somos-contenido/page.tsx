import type { Metadata } from 'next'
import { ContenidoReels } from '@/components/sections/contenido/contenido-reels'

export const metadata: Metadata = {
  title: 'SOMOS Contenido',
  description:
    'Contenido vertical de Media Moob: cocina, gaming, viajes, fitness, kids, educación, música y lifestyle.',
}

export default function SomosContenidoPage() {
  return <ContenidoReels />
}
