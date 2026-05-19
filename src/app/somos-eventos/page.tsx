import { Metadata } from 'next'
import { HeroEventos } from '@/components/sections/eventos/hero-eventos'
import { EventsGrid } from '@/components/sections/eventos/events-grid'

export const metadata: Metadata = {
  title: 'SOMOS Eventos',
  description:
    'Creamos contenido en todos los formatos, desde experiencias en vivo hasta producciones de larga, mediana y corta duración en más de 30 países.',
}

export default function SomosEventosPage() {
  return (
    <main className="bg-black min-h-screen">
      <HeroEventos />
      <EventsGrid />
    </main>
  )
}
