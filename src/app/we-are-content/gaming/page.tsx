import type { Metadata } from 'next'
import { ThemeHero } from '@/components/sections/contenido/theme/theme-hero'
import { ThemeStats } from '@/components/sections/contenido/theme/theme-stats'
import { ThemeProductsSlider } from '@/components/sections/contenido/theme/theme-products-slider'
import { gamingContent } from '@/lib/data/contenido/gaming'

export const metadata: Metadata = {
  title: 'SOMOS Gaming',
  description: gamingContent.hero.description,
}

export default function SomosGamingPage() {
  return (
    <main className="bg-black min-h-screen pt-14">
      <ThemeHero {...gamingContent.hero} />
      <ThemeStats {...gamingContent.stats} />
      <ThemeProductsSlider products={gamingContent.products} />
    </main>
  )
}
