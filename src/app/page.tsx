import { HeroSection } from '@/components/sections/home/hero-section'
import { ContentSection } from '@/components/sections/home/content-section'
import { StatsSection } from '@/components/sections/home/stats-section'
import { EventsSection } from '@/components/sections/home/events-section'
import { TechSection } from '@/components/sections/home/tech-section'
import { ActivationsSection } from '@/components/sections/home/activations-section'
import { GamesSection } from '@/components/sections/home/games-section'
import { MapSection } from '@/components/sections/home/map-section'
import type { Metadata } from 'next'
import { ProductsSlider } from '@/components/sections/home/products-slider'
import { BrandsSlider } from '@/components/sections/home/brands-slider'

export const metadata: Metadata = {
  title: 'Media Moob — Somos Creativos, Somos Curiosos',
  description:
    'Creamos contenido, tecnología y experiencias únicas para más de 30 países. 1200 HS de contenido exclusivo, 550K suscriptores y 15 años de experiencia.',
}

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ContentSection />
      <ProductsSlider />
      <StatsSection />
      <EventsSection />
      <TechSection />
      <BrandsSlider />
      <ActivationsSection />
      <GamesSection />
      <MapSection />
    </main>
  )
}
