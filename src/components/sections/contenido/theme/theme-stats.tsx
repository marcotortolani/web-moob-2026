'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, useMotionValue, useSpring } from 'motion/react'
import type { ThemeStatsData } from '@/lib/data/contenido/types'

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

export function ThemeStats({
  value,
  unit,
  label,
  caption,
  ctaText,
}: ThemeStatsData) {
  return (
    <section className="bg-black pt-12 lg:pt-20">
      <div className="max-w-[1728px] mx-auto px-5 lg:px-16 xl:px-24 py-6 border-y border-white/10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 lg:gap-8 "
        >
          <Image
            src="/images/stats-contenido-exclusivo-icon.webp"
            alt={label}
            width={100}
            height={100}
            className="w-16 h-16 lg:w-20 lg:h-20 object-contain shrink-0"
          />
          <div className="flex items-center gap-4">
            <AnimatedNumber value={value} unit={unit} />
            <div className="max-w-40">
              <p className="w-24 lg:w-40 text-balance text-white font-light text-xs lg:text-sm uppercase tracking-widest leading-snug">
                {label}
              </p>
            </div>
          </div>
        </motion.div>
        <p className="text-mint/70 text-sm lg:text-base italic text-center mt-4 leading-snug">
          {caption}
        </p>
      </div>

      {/* Mint CTA banner — full-bleed */}
      <div className="relative mt-10 lg:mt-12 bg-mint">
        <div className="max-w-3xl mx-auto px-6 py-6 lg:py-8 text-center">
          <p className="text-black tracking-wide font-normal text-balance text-sm lg:text-base xl:text-lg leading-snug">
            {ctaText}
          </p>
        </div>
        {/* Downward triangle notch */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 -translate-y-px w-0 h-0"
          style={{
            borderLeft: '16px solid transparent',
            borderRight: '16px solid transparent',
            borderTop: '16px solid var(--color-mint)',
          }}
        />
      </div>
    </section>
  )
}
