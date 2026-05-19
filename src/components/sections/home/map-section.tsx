'use client'

import { LazyDottedGlobe } from '@/components/ui/dotted-globe-lazy'
import { motion } from 'motion/react'

export function MapSection() {
  return (
    <section className="bg-surface py-14 lg:py-24 px-5 lg:px-16 xl:px-24 overflow-hidden">
      <div className="max-w-[1728px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-20"
        >
          {/* Globe */}
          {/* Three.js dotted globe — fills the container */}
          <div className="relative w-72 h-72 min-[400px]:w-88 min-[400px]:h-88 sm:w-92 sm:h-92 md:w-108 md:h-108 lg:w-125 lg:h-125 xl:w-150 xl:h-150 2xl:w-170 2xl:h-170 mt-4">
            <LazyDottedGlobe />
          </div>

          {/* Text */}
          <div className="text-center lg:text-left max-w-sm">
            <h3 className="text-white text-3xl lg:text-5xl xl:text-6xl font-extrabold italic leading-tight">
              Estamos en más de{' '}
              <span className="text-mint block">30 países</span>
            </h3>
            <p className="text-white/40 text-base lg:text-lg mt-4">
              Aquí llegamos con nuestras operaciones
            </p>
            {/* Country grid teaser */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
              {['🇦🇷', '🇧🇷', '🇲🇽', '🇨🇴', '🇵🇾', '🇵🇪', '🇿🇦', '🇲🇿', '🇰🇪', '🇺🇾'].map(
                (flag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="text-2xl"
                  >
                    {flag}
                  </motion.span>
                ),
              )}
              <span className="text-white/40 text-sm self-center">+20 más</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
