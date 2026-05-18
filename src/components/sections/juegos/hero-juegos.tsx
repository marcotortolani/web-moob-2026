'use client'

import { motion } from 'motion/react'
import { SectionHeading } from '@/components/ui/section-heading'
import { BannerGridVideo } from '@/components/BannerGridVideo'

const GRID_ITEMS = {
  video: 'https://vimeo.com/1164098411',
  videoFrame: '/images/grid/juegos/home-somosjuegos-grilla-horizontal01.webp',
  imageH: [
    '/images/grid/juegos/home-somosjuegos-grilla-horizontal01.webp',
    '/images/grid/juegos/home-somosjuegos-grilla-horizontal02.webp',
  ],
  imageV: [
    '/images/grid/juegos/home-somosjuegos-grilla-vertical01.webp',
    '/images/grid/juegos/home-somosjuegos-grilla-vertical02.webp',
  ],
}

export function HeroJuegos() {
  return (
    <section className="bg-black">
      <BannerGridVideo items={GRID_ITEMS} videoPosition="bottom-right" />

      <div className="z-20 px-5 lg:px-16 xl:px-24 -mt-16 lg:-mt-24 relative pb-8 lg:pb-12">
        <div className="max-w-[1728px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              label="SOMOS"
              title={
                <>
                  Juegos &<br />
                  Gamificación
                </>
              }
              className="gap-1"
              titleClassName="lg:text-6xl xl:text-7xl leading-9"
            />
            <p className="text-white/90 text-sm lg:text-base leading-tight mt-5 max-w-lg">
              Desarrollamos juegos en base a nuestros productos con premios
              exclusivos para nuestros usuarios.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
