'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { HelpCircle, Grid2X2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { games } from '@/lib/data/games'
import { DemoButton } from '@/components/ui/demo-button'

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  HelpCircle,
  Grid2X2,
}

function GamePhoneMockup({
  mockupImage,
  gameTitle,
  isActive,
}: {
  mockupImage: string
  gameTitle: string
  isActive: boolean
}) {
  return (
    <div
      className="relative w-[160px] min-[375px]:w-[200px] lg:w-[260px] xl:w-[300px] aspect-[9/19] mx-auto transition-all duration-350"
      style={{
        opacity: isActive ? 1 : 0.3,
        transform: isActive ? 'scale(1)' : 'scale(0.9)',
      }}
    >
      <div className="absolute inset-0 rounded-[2.5rem] border-[3px] border-white/20 bg-surface overflow-hidden shadow-2xl flex flex-col">
        {/* Notch */}
        <div className="h-8 bg-black/40 flex items-center justify-center shrink-0">
          <div className="w-16 h-1.5 bg-white/20 rounded-full" />
        </div>
        {/* Screen image */}
        <div className="relative flex-1">
          <Image
            src={mockupImage}
            alt={gameTitle}
            fill
            sizes="(max-width: 1024px) 200px, (max-width: 1280px) 260px, 300px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export function GameShowcase() {
  const t = useTranslations('GamesPage')
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const goTo = (index: number) => {
    setActiveIndex(index)
    swiperRef.current?.slideTo(index)
  }

  const prev = () => goTo((activeIndex - 1 + games.length) % games.length)
  const next = () => goTo((activeIndex + 1) % games.length)

  const game = games[activeIndex]
  const Icon = iconMap[game.icon]

  return (
    <section className="bg-black pb-16 lg:pb-24 px-5 md:px-10 lg:px-16 xl:px-24 overflow-hidden">
      <div className="max-w-[1528px] mx-auto">
        {/* Title + icon above slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={game.id + '-title'}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-3 mb-6 lg:mb-8"
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-mint bg-mint/10 flex items-center justify-center">
              {Icon && <Icon size={22} className="text-mint" />}
            </div>
            <p className="font-display text-4xl lg:text-5xl xl:text-6xl text-white tracking-wide">
              {t(`items.${game.id}.title`)}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Phone slider + overlapping description card */}
        <div className="relative pb-56 lg:pb-48">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            centeredSlides
            slidesPerView="auto"
            spaceBetween={24}
            allowTouchMove
            grabCursor
            className="overflow-visible! cursor-grab active:cursor-grabbing"
          >
            {games.map((g, i) => (
              <SwiperSlide
                key={g.id}
                className="w-auto!"
                onClick={() => goTo(i)}
              >
                <GamePhoneMockup
                  mockupImage={g.mockupImage}
                  gameTitle={t(`items.${g.id}.title`)}
                  isActive={i === activeIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Description card — overlaid on bottom of active mockup */}
          <AnimatePresence mode="wait">
            <motion.div
              key={game.id + '-desc'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(340px,90vw)] lg:w-[360px] xl:w-[400px] z-10"
            >
              <div className="bg-white/95 rounded-xl p-5 lg:p-6 shadow-xl flex flex-col items-center gap-4">
                <p className="text-black text-xs lg:text-sm leading-relaxed text-center">
                  {t(`items.${game.id}.description`)}
                </p>
                {game.demoUrl && game.demoUrl.length > 0 && (
                  <DemoButton
                    href={game.demoUrl}
                    target="_blank"
                    className="bg-mint hover:bg-mint/90 text-black px-6 py-1"
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrows + dots */}
        <div className="flex items-center justify-center gap-4 mt-8 lg:mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-mint hover:text-mint transition-colors"
            aria-label={t('nav.prev')}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-1.5">
            {games.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={t('nav.goTo', { n: i + 1 })}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-5 h-2 bg-mint'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-mint hover:text-mint transition-colors"
            aria-label={t('nav.next')}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
