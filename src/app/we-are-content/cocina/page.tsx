import type { Metadata } from 'next'
import { ThemeHero } from '@/components/sections/contenido/theme/theme-hero'
import { ThemeStats } from '@/components/sections/contenido/theme/theme-stats'
import { ThemeProductsSlider } from '@/components/sections/contenido/theme/theme-products-slider'
import { cocinaContent } from '@/lib/data/contenido/cocina'

export const metadata: Metadata = {
  title: 'SOMOS Cocina',
  description: cocinaContent.hero.description,
}

export default function SomosCocinaPage() {
  return (
    <main className="bg-black min-h-screen pt-14">
      <ThemeHero {...cocinaContent.hero} />
      <ThemeStats {...cocinaContent.stats} />
      <ThemeProductsSlider products={cocinaContent.products} />
    </main>
  )
}
