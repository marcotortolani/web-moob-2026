import type { Metadata } from 'next'
import { ThemeHero } from '@/components/sections/contenido/theme/theme-hero'
import { ThemeStats } from '@/components/sections/contenido/theme/theme-stats'
import { ThemeProductsSlider } from '@/components/sections/contenido/theme/theme-products-slider'
import { kidsContent } from '@/lib/data/contenido/kids'

export const metadata: Metadata = {
  title: 'SOMOS Kids',
  description: kidsContent.hero.description,
}

export default function SomosKidsPage() {
  return (
    <main className="bg-black min-h-screen pt-14">
      <ThemeHero {...kidsContent.hero} />
      <ThemeStats {...kidsContent.stats} />
      <ThemeProductsSlider products={kidsContent.products} />
    </main>
  )
}
