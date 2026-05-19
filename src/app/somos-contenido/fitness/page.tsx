import type { Metadata } from 'next'
import { ThemeHero } from '@/components/sections/contenido/theme/theme-hero'
import { ThemeStats } from '@/components/sections/contenido/theme/theme-stats'
import { ThemeProductsSlider } from '@/components/sections/contenido/theme/theme-products-slider'
import { fitnessContent } from '@/lib/data/contenido/fitness'

export const metadata: Metadata = {
  title: 'SOMOS Fitness',
  description: fitnessContent.hero.description,
}

export default function SomosFitnessPage() {
  return (
    <main className="bg-black min-h-screen pt-14">
      <ThemeHero {...fitnessContent.hero} />
      <ThemeStats {...fitnessContent.stats} />
      <ThemeProductsSlider products={fitnessContent.products} />
    </main>
  )
}
