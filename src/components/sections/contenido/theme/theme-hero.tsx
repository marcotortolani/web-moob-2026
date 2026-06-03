'use client'

import { motion } from 'motion/react'
import { SectionHeading } from '@/components/ui/section-heading'
import { BannerGridVideo } from '@/components/BannerGridVideo'
import type { ThemeHeroData } from '@/lib/data/contenido/types'

export function ThemeHero({
  title,
  description,
  banner,
  videoPosition = 'bottom-right',
  label = 'SOMOS',
}: ThemeHeroData & { label?: string }) {
  return (
    <section className="w-full max-w-[1728px] mx-auto bg-black py-8 lg:py-20 mt-10">
      <div className="relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 w-full py-4 z-50 -translate-y-14 bg-linear-to-b from-black via-black to-transparent"
        >
          <SectionHeading
            label={label}
            title={title}
            align="center"
            className="flex-col justify-center gap-0 lg:min-w-75"
            titleClassName="text-5xl lg:text-6xl xl:text-7xl"
          />
        </motion.div>

        <BannerGridVideo items={banner} videoPosition={videoPosition} />

        <div className="z-50 absolute -bottom-5 translate-y-4 w-full mx-auto px-5 lg:px-16 xl:px-24 bg-linear-to-t from-black via-black to-transparent">
          <p className="text-white/80 text-center text-pretty text-sm lg:text-base leading-relaxed mt-3 lg:mt-6 max-w-xl mx-auto">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
