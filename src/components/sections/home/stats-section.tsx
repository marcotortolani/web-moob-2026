'use client'

import { motion, useInView, useMotionValue, useSpring } from 'motion/react'
import { useRef, useEffect } from 'react'
import Image from 'next/image'

const statsData = [
  {
    value: 1200,
    unit: ' HS',
    label: 'CONTENIDO EXCLUSIVO',
    icon: '/images/stats-contenido-exclusivo-icon.webp',
  },
  {
    value: 550,
    unit: 'K',
    label: 'SUSCRIPTORES EN NUESTROS PORTALES',
    icon: '/images/stats-suscriptores-icon.webp',
  },
  {
    value: 15,
    unit: ' AÑOS',
    label: 'EXPERIENCIA',
    icon: '/images/stats-experiencia-icon.webp',
  },
]

function AnimatedNumber({ value, unit }: { value: number; unit: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 200 })
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, motionValue, value])

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString()
      }
    })
  }, [springValue])

  return (
    <span className="flex items-baseline gap-0.5 font-display text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
      <span ref={ref} className="text-white">
        0
      </span>
      <span className="text-mint">{unit}</span>
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-10 md:py-14 lg:py-20 px-5 md:px-10 lg:px-16 xl:px-24">
      <div className="mx-auto flex flex-col items-left gap-8 md:gap-10 px-4 lg:px-0 lg:flex-row lg:justify-center lg:items-start lg:gap-16 xl:gap-24">
        {statsData.map(({ value, unit, label, icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex items-center gap-4 lg:gap-6 lg:flex-col lg:items-center lg:text-center md:w-fit md:translate-x-40 lg:translate-0 "
          >
            <Image
              src={icon}
              alt={label}
              width={100}
              height={100}
              className="w-16 h-16 lg:w-20 lg:h-20 object-contain shrink-0"
            />
            <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-center lg:gap-2">
              <AnimatedNumber value={value} unit={unit} />
              <p className="text-balance text-white font-light text-xs lg:text-sm uppercase tracking-widest max-w-40 lg:text-center leading-snug">
                {label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
