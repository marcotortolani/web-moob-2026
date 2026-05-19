import { Metadata } from 'next'
import { HeroActivaciones } from '@/components/sections/activaciones/hero-activaciones'
import { ActivationsGrid } from '@/components/sections/activaciones/activations-grid'

export const metadata: Metadata = {
  title: 'SOMOS Eventos',
  description:
    'Lorem ',
}

export default function SomosExperienciasPage() {
  return (
    <main className="bg-black min-h-screen">
      <HeroActivaciones />
      <ActivationsGrid />
    </main>
  )
}
