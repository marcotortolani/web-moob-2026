'use client'

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Keyboard } from 'swiper/modules'
import 'swiper/css'
import { contenidoSlides } from '@/lib/data/contenido'
import { ContenidoSlideItem } from './contenido-slide'
import { cn } from '@/lib/utils'

export function ContenidoReels() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <div
      className="relative h-dvh w-full overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Somos Contenido"
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
        {contenidoSlides.map((slide, i) => (
          <SwiperSlide key={slide.slug}>
            <ContenidoSlideItem
              data={slide}
              isActive={activeIndex === i}
              isFirst={i === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
