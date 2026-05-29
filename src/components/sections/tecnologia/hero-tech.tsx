'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/section-heading'
import { ActiveVideoPlayer } from '@/components/ui/events-slider'

export function HeroTech() {
  return (
    <section className="bg-black">
      {/* Hero image — max-width constrained, heading overlaid */}
      <div className="relative max-w-[1528px] mx-auto">
        <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden">
          <Image
            src="/images/grid/tecnologia/home-somostecnologia-grilla-vertical02.webp"
            alt="SOMOS Tecnología"
            fill
            className="object-cover object-right scale-150"
            sizes="(max-width: 1528px) 100vw, 1528px"
            priority
          />
          {/* Top — header legibility */}
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-linear-to-b from-black via-black/70 to-transparent" />
          {/* Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-linear-to-t from-black via-black/70 to-transparent" />
          {/* Left — primary text area */}
          <div className="absolute top-0 left-0 bottom-0 w-[55%] bg-linear-to-r from-black via-black/60 to-transparent" />
          {/* Right — subtle edge softening */}
          <div className="absolute top-0 right-0 bottom-0 w-[15%] bg-linear-to-l from-black/50 via-black/10 to-transparent" />
        </div>

        {/* Heading + paragraph — z-20, siempre delante de los overlays */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-5 md:px-10 lg:px-16 xl:px-24 pb-8 lg:pb-10">
          <div className="max-w-[1528px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col xl:flex-row xl:items-end xl:gap-12"
            >
              <SectionHeading
                label="SOMOS"
                title="Tecnología"
                align="left"
                className="flex-col justify-start gap-0 xl:min-w-64"
                titleClassName="text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight xl:leading-none"
              />
              <p className="text-white/80 text-pretty text-sm md:text-base xl:text-lg leading-5 mt-4 xl:mt-0 xl:mb-2 max-w-sm md:max-w-lg xl:max-w-xl">
                <span className="font-bold text-mint">
                  Aplicamos tecnología propia para amplificar su alcance e impacto.
                </span>{' '}
                Contamos con herramientas como MCP, Publicidad Sat y Push, que
                optimizan la distribución y monetización de los contenidos.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video CTA */}
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 pt-8 pb-8 lg:pb-12">
        <div className="max-w-[1528px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-xl overflow-hidden aspect-video max-w-xl mx-auto bg-neutral-900"
          >
            <ActiveVideoPlayer url="https://vimeo.com/1162197714" controllable />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
