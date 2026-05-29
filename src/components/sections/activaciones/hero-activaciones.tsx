'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/section-heading'

export function HeroActivaciones() {
  return (
    <section className="bg-black">
      {/* Banner — max-width constrained, overlays suavizan todos los bordes */}
      <div className="relative max-w-[1528px] mx-auto">
        <div className="relative h-[360px] md:h-[480px] lg:h-[560px] overflow-hidden">
          <Image
            src="/images/experiencias/queguayviajes-movistar-ve/activacion-QGV-horizontal01.webp"
            alt="Activaciones y Experiencias"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1528px) 100vw, 1528px"
            priority
          />
          {/* Top */}
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-linear-to-b from-black via-black/70 to-transparent" />
          {/* Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-linear-to-t from-black via-black/70 to-transparent" />
          {/* Left */}
          <div className="absolute top-0 left-0 bottom-0 w-[20%] bg-linear-to-r from-black/60 via-black/20 to-transparent" />
          {/* Right */}
          <div className="absolute top-0 right-0 bottom-0 w-[20%] bg-linear-to-l from-black/60 via-black/20 to-transparent" />
        </div>
      </div>

      {/* Texto */}
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 -mt-20 md:-mt-24 lg:-mt-32 relative z-10 pb-8 lg:pb-12">
        <div className="max-w-[1528px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col xl:flex-row xl:items-end xl:gap-12"
          >
            <SectionHeading
              label="SOMOS"
              title={
                <>
                  Activaciones
                  <br />y experiencias
                </>
              }
              align="left"
              className="flex-col justify-start gap-0 xl:min-w-64"
              titleClassName="text-[28px] min-[375px]:text-5xl md:text-6xl xl:text-6xl 2xl:text-7xl xl:leading-14 2xl:leading-16"
            />
            <p className="text-white/80 text-pretty text-sm md:text-base xl:text-lg leading-5 mt-4 xl:mt-0 xl:mb-2 max-w-sm md:max-w-lg xl:max-w-xl">
              <span className="font-bold text-mint">Unimos el mundo OFF con el ON</span>{' '}
              generando activaciones y experiencias para usuarios y partners en
              más de 30 países.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
