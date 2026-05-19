import type { Metadata } from 'next'
import { ThemeHero } from '@/components/sections/contenido/theme/theme-hero'
import { ThemeStats } from '@/components/sections/contenido/theme/theme-stats'
import { ThemeProductsSlider } from '@/components/sections/contenido/theme/theme-products-slider'
import { viajesContent } from '@/lib/data/contenido/viajes'

export const metadata: Metadata = {
  title: 'SOMOS Viajes',
  description: viajesContent.hero.description,
}

export default function SomosViajesPage() {
  return (
    <main className="bg-black min-h-screen pt-14">
      <ThemeHero {...viajesContent.hero} />
      <ThemeStats {...viajesContent.stats} />
      <ThemeProductsSlider products={viajesContent.products} />
    </main>
  )
}
