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
    <section className="py-10 lg:py-14 px-4 lg:px-16 xl:px-24">
      <div className="w-fit max-w-sm md:max-w-2xl mx-auto flex flex-col items-start gap-8 lg:gap-10 pl-2 [@media(min-width:380px)]:pl-4 [@media(min-width:768px)]:pl-0">
        {statsData.map(({ value, unit, label, icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex items-center gap-4 lg:gap-8"
          >
            <Image
              src={icon}
              alt={label}
              width={100}
              height={100}
              className="w-16 h-16 lg:w-20 lg:h-20 object-contain shrink-0"
            />
            <div className="flex items-center justify-between gap-4">
              <AnimatedNumber value={value} unit={unit} />
              <p className=" text-balance text-white font-light text-xs lg:text-sm uppercase tracking-widest max-w-40 leading-snug">
                {label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
