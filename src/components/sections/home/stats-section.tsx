'use client'

import { motion, useInView, useMotionValue, useSpring } from 'motion/react'
import { useRef, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { type StatKey, getStatValue, getTickInterval } from '@/lib/stats'

// Static config — values come from useStatValue hook at render time
const STATS_CONFIG = [
  {
    statKey: 'contentHours' as const,
    unit: ' HS',
    labelKey: 'exclusive content' as const,
    icon: '/images/stats-contenido-exclusivo-icon.webp',
  },
  {
    statKey: 'subscribers' as const,
    unit: 'SUBS',
    labelKey: 'subscribers' as const,
    icon: '/images/stats-suscriptores-icon.webp',
  },
  {
    statKey: 'yearsExperience' as const,
    unitKey: 'years' as const,
    labelKey: 'experience' as const,
    icon: '/images/stats-experiencia-icon.webp',
  },
] as const

/** Returns the current value for a stat, ticking live if the rate is fast enough. */
function useStatValue(key: StatKey): number {
  const [value, setValue] = useState(() => getStatValue(key))

  useEffect(() => {
    const interval = getTickInterval(key)
    if (!interval) return
    const id = setInterval(() => setValue(getStatValue(key)), interval)
    return () => clearInterval(id)
  }, [key])

  return value
}

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

type StatConfig = (typeof STATS_CONFIG)[number]

function StatItem({ config, index }: { config: StatConfig; index: number }) {
  const t = useTranslations('Stats')
  const value = useStatValue(config.statKey)
  const label = t(config.labelKey)
  const unit = 'unit' in config ? config.unit : t(config.unitKey)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex items-center gap-3 min-[375px]:gap-4 xl:gap-6 xl:flex-col xl:items-center xl:text-center w-fit xl:translate-x-0"
    >
      <Image
        src={config.icon}
        alt={label}
        width={100}
        height={100}
        className="w-12 h-12 min-[375px]:w-16 min-[375px]:h-16 lg:w-20 lg:h-20 object-contain shrink-0"
      />
      <div className="flex flex-col gap-1 xl:items-center xl:gap-2">
        <AnimatedNumber value={value} unit={unit} />
        <p className="text-balance text-white font-light text-[10px] min-[375px]:text-xs lg:text-sm uppercase tracking-widest max-w-28 min-[375px]:max-w-40 lg:max-w-72 xl:text-center leading-snug">
          {label}
        </p>
      </div>
    </motion.div>
  )
}

export function StatsSection() {
  return (
    <section className="py-20 px-5 md:px-10 xl:px-16 2xl:px-24">
      <div className="mx-auto w-fit flex flex-col items-left gap-8 md:gap-14 px-4 xl:px-0 xl:flex-row xl:justify-center xl:items-start lg:gap-16 xl:gap-24">
        {STATS_CONFIG.map((config, i) => (
          <StatItem key={config.statKey} config={config} index={i} />
        ))}
      </div>
    </section>
  )
}
