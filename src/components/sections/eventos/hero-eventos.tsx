'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/section-heading'

export function HeroEventos() {
  return (
    <section className="bg-black">
      <div className="relative h-[360px] md:h-[480px] lg:h-[560px] overflow-hidden">
        <Image
          src="/images/home/slider-eventos/cmf-evento.webp"
          alt="Eventos"
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black" />
        <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent" />
      </div>

      <div className="px-5 lg:px-16 xl:px-24 -mt-16 lg:-mt-24 relative z-10 pb-8 lg:pb-12">
        <div className="max-w-[1728px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              label="SOMOS"
              title="Eventos"
              className="gap-1"
              titleClassName="lg:text-6xl xl:text-7xl leading-9"
            />
            <p className="text-white/90 text-sm lg:text-base leading-tight mt-5 max-w-lg">
              Creamos contenido en todos los formatos, desde experiencias en
              vivo hasta producciones de larga, mediana y corta duración.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
