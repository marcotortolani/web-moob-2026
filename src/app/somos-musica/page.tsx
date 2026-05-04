import { Metadata } from 'next'
import { HeroMusica } from '@/components/sections/musica/hero-musica'
import { ProductShowcase } from '@/components/sections/musica/product-showcase'
import { SectionHeading } from '@/components/ui/section-heading'
import { Play } from 'lucide-react'

export const metadata: Metadata = {
  title: 'SOMOS Música',
  description:
    'Te acercamos a la música, a los artistas, a sus recitales y mucho más. Contenido exclusivo de corta, mediana y larga duración.',
}

export default function SomosMusicaPage() {
  return (
    <main className="bg-black min-h-screen">
      <HeroMusica />

      {/* Section heading + description */}
      <section className="bg-black py-10 lg:py-16 px-5 lg:px-16 xl:px-24">
        <div className="max-w-[1728px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <SectionHeading
              label="SOMOS"
              title="Música"
              titleClassName="lg:text-7xl xl:text-8xl"
            />
            <div className="mt-4 lg:mt-0 max-w-lg">
              <p className="text-white/70 text-sm lg:text-base leading-relaxed">
                Te acercamos a la música, a los artistas, a sus recitales y
                mucho más.{' '}
                <strong className="text-mint font-semibold">
                  ¡Llená tu vida de música!
                </strong>
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8 lg:mt-10 py-6 border-y border-white/10">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-full border border-mint/40 flex items-center justify-center shrink-0">
                <Play size={18} className="text-mint ml-0.5" />
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-5xl lg:text-6xl text-white leading-none">
                  1200
                </span>
                <span className="font-display text-3xl lg:text-4xl text-mint leading-none">
                  HS
                </span>
              </div>
            </div>
            <div className="sm:ml-4 lg:ml-8">
              <p className="text-xs lg:text-sm uppercase tracking-widest text-mint font-semibold">
                Contenido exclusivo
              </p>
              <p className="text-white/40 text-xs lg:text-sm italic mt-0.5">
                Contenido de corta, mediana y larga duración
              </p>
            </div>
          </div>

          {/* Mint CTA banner */}
          <div className="mt-8 lg:mt-10 bg-mint rounded-2xl px-6 lg:px-10 py-5 lg:py-6">
            <p className="text-black font-bold text-sm lg:text-base xl:text-lg leading-snug max-w-2xl">
              Conocé nuestros productos de contenido exclusivo musical
            </p>
          </div>
        </div>
      </section>

      <ProductShowcase />
    </main>
  )
}
