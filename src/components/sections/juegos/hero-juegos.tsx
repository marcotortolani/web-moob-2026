'use client'

import { motion } from 'motion/react'
import { SectionHeading } from '@/components/ui/section-heading'
import { BannerGridVideo } from '@/components/BannerGridVideo'

const GRID_ITEMS = {
  video: 'https://vimeo.com/1164098411',
  videoFrame: '/images/juegos/gamificacion-horizontal01.webp',
  imageH: [
    '/images/juegos/gamificacion-horizontal01.webp',
    '/images/juegos/gamificacion-horizontal02.webp',
  ],
  imageV: [
    '/images/juegos/gamificacion-vertical01.webp',
    '/images/juegos/gamificacion-vertical02.webp',
  ],
}

export function HeroJuegos() {
  return (
    <section className="relative bg-black pt-14 lg:pt-20">
      <div className="relative max-w-[1528px] mx-auto">
        <BannerGridVideo items={GRID_ITEMS} videoPosition="bottom-right" />

        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-linear-to-t from-black via-black/80 to-transparent z-10" />
          <div className="absolute top-0 left-0 bottom-0 w-[15%] bg-linear-to-r from-black/60 via-black/20 to-transparent z-10" />
          <div className="absolute top-0 right-0 bottom-0 w-[15%] bg-linear-to-l from-black/60 via-black/20 to-transparent z-10" />
        </div>

        {/* Heading + paragraph — z-20, siempre delante de los overlays */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-5 md:px-10 lg:px-16 xl:px-24 pb-6 lg:pb-10">
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
                  Juegos &<br />
                  Gamificación
                </>
              }
              align="left"
              className="flex-col justify-start gap-0 xl:min-w-64"
              titleClassName="text-[28px] min-[375px]:text-5xl md:text-6xl xl:text-6xl 2xl:text-7xl xl:leading-14 2xl:leading-16"
            />
            <p className="text-white/80 text-pretty text-sm md:text-base xl:text-lg leading-5 mt-3 xl:mt-0 xl:mb-2 max-w-sm md:max-w-lg xl:max-w-xl">
              <span className="font-bold text-mint">Desarrollamos juegos</span> en
              base a nuestros productos con premios exclusivos para nuestros
              usuarios en más de 30 países.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
