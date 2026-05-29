import type { Metadata } from 'next'
import { ContenidoExperience } from '@/components/sections/contenido/contenido-experience'

export const metadata: Metadata = {
  title: 'SOMOS Contenido',
  description:
    'Contenido vertical de Media Moob: cocina, gaming, viajes, fitness, kids, educación, música y lifestyle.',
}

export default function SomosContenidoPage() {
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
