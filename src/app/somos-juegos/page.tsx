import { Metadata } from 'next'
import { HeroJuegos } from '@/components/sections/juegos/hero-juegos'
import { GameShowcase } from '@/components/sections/juegos/game-showcase'

export const metadata: Metadata = {
  title: 'SOMOS Juegos & Gamificación',
  description:
    'Desarrollamos juegos en base a nuestros productos con premios exclusivos para nuestros usuarios.',
}

export default function SomosJuegosPage() {
  return (
    <main className="bg-black min-h-screen">
      <HeroJuegos />
      <GameShowcase />
    </main>
  )
}
