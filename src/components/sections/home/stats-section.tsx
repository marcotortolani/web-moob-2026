'use client'

import { motion, useInView, useMotionValue, useSpring } from 'motion/react'
import { useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const statsData = [
  {
    value: 1200,
    unit: ' HS',
    labelKey: 'exclusive content',
    icon: '/images/stats-contenido-exclusivo-icon.webp',
  },
  {
    value: 550,
    unit: 'K',
    labelKey: 'subscribers',
    icon: '/images/stats-suscriptores-icon.webp',
  },
  {
    value: 15,
    unitKey: 'years',
    labelKey: 'experience',
    icon: '/images/stats-experiencia-icon.webp',
  },
] as const

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
    <span className="flex items-baseline gap-0.5 font-display text-4xl min-[375px]:text-5xl md:text-6xl lg:text-8xl font-medium leading-none">
      <span ref={ref} className="text-white">
        0
      </span>
      <span className="text-mint">{unit}</span>
    </span>
  )
}

export function StatsSection() {
  const t = useTranslations('Stats')
  return (
    <section className="py-10 md:py-14 lg:py-20 px-5 md:px-10 lg:px-16 xl:px-24">
      <div className="mx-auto flex flex-col items-left gap-8 md:gap-10 px-4 lg:px-0 lg:flex-row lg:justify-center lg:items-start lg:gap-16 xl:gap-24">
        {statsData.map((stat, i) => {
          const label = t(stat.labelKey)
          const unit = 'unit' in stat ? stat.unit : t(stat.unitKey)
          return (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex items-center gap-3 min-[375px]:gap-4 lg:gap-6 lg:flex-col lg:items-center lg:text-center md:w-fit md:translate-x-40 lg:translate-x-0"
            >
              <Image
                src={stat.icon}
                alt={label}
                width={100}
                height={100}
                className="w-12 h-12 min-[375px]:w-16 min-[375px]:h-16 lg:w-20 lg:h-20 object-contain shrink-0"
              />
              <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-center lg:gap-2">
                <AnimatedNumber value={stat.value} unit={unit} />
                <p className="text-balance text-white font-light text-[10px] min-[375px]:text-xs lg:text-sm uppercase tracking-widest max-w-28 min-[375px]:max-w-40 lg:text-center leading-snug">
                  {label}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
