'use client'

import { motion } from 'motion/react'

const brands = [
  'Movistar',
  'Vodacom',
  'Personal',
  'Claro',
  'Entel',
  'Tigo',
  'Orange',
  'Digitel',
  'WOM',
  'Antel',
  'Telecom',
  'Flow',
  'Millicom',
  'MTN',
  'Safaricom',
]

export function BrandsBar() {
  return (
    <section className="bg-mint py-6 lg:py-8 overflow-hidden border-y border-white/5">
      {/* <p className="text-center text-white/40 text-[10px] lg:text-xs uppercase tracking-widest mb-4 lg:mb-6 px-5">
        Marcas que confían en nosotros
      </p> */}
      <div className="relative flex">
        <motion.div
          className="flex gap-10 lg:gap-16 items-center whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="text-white text-sm lg:text-base font-semibold tracking-wider uppercase hover:text-mint transition-colors shrink-0"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
