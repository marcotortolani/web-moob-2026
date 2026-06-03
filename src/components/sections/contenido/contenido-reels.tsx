'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Keyboard } from 'swiper/modules'
import 'swiper/css'
import { contenidoSlides } from '@/lib/data/contenido'
import { ContenidoSlideItem } from './contenido-slide'
import { cn } from '@/lib/utils'

export function ContenidoReels() {
  const t = useTranslations('ContentHub')
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Prefetch react-player bundle so it's ready when the first slide mounts
    void import('react-player')
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <div
      className="relative h-dvh w-full overflow-hidden"
      aria-roledescription="carousel"
      aria-label={t('ariaLabel')}
    >
      {/* Header Gradient overlay */}
      <div className="absolute inset-0 z-40 pointer-events-none flex items-start">
        <div className="h-1/4 w-full bg-linear-to-t from-transparent via-black/60 to-black"></div>
      </div>
      {/* Vertical dot indicators */}
      <div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5"
        aria-hidden
      >
        {contenidoSlides.map((slide, i) => (
          <div
            key={slide.slug}
            className={cn(
              'rounded-full transition-all duration-300 origin-center',
              i === activeIndex
                ? 'w-1.5 h-5 bg-mint'
                : 'w-1.5 h-1.5 bg-white/30',
            )}
          />
        ))}
      </div>

      <Swiper
        direction="vertical"
        slidesPerView={1}
        loop
        mousewheel={{ sensitivity: 1 }}
        keyboard={{ enabled: true }}
        speed={550}
        modules={[Mousewheel, Keyboard]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        style={{ height: '100dvh', width: '100%' } as React.CSSProperties}
      >
        {contenidoSlides.map((slide, i) => {
          const total = contenidoSlides.length
          const dist = Math.min(
            Math.abs(i - activeIndex),
            Math.abs(i - activeIndex + total),
            Math.abs(i - activeIndex - total),
          )
          return (
            <SwiperSlide key={slide.slug}>
              <ContenidoSlideItem
                data={slide}
                isActive={activeIndex === i}
                isFirst={i === 0}
                isNear={dist === 1}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
