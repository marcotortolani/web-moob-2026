import type { Metadata } from 'next'
import { ThemeHero } from '@/components/sections/contenido/theme/theme-hero'
import { ThemeStats } from '@/components/sections/contenido/theme/theme-stats'
import { ThemeProductsSlider } from '@/components/sections/contenido/theme/theme-products-slider'
import { musicaContent } from '@/lib/data/contenido/musica'

export const metadata: Metadata = {
  title: 'SOMOS Música',
  description: musicaContent.hero.description,
}

export default function SomosMusicaPage() {
  return (
    <main className="bg-black min-h-screen pt-14">
      <ThemeHero {...musicaContent.hero} />
      <ThemeStats {...musicaContent.stats} />
      <ThemeProductsSlider products={musicaContent.products} />
    </main>
  )
}
