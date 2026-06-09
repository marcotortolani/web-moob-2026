'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'motion/react'
import { SectionHeading } from '@/components/ui/section-heading'
import { DemoButton } from '@/components/ui/demo-button'
import { EventsSlider, type EventSlide } from '@/components/ui/events-slider'
import { events } from '@/lib/data/events'

export function EventsSection() {
  const t = useTranslations('Events')
  const tc = useTranslations('Common')
  const ti = useTranslations('EventItems')

  const eventSlides: EventSlide[] = events.map((e, i) => ({
    id: ['cmf', 'cdc', 'pf', 'cg', 'cc', 'uc'][i] ?? e.slug,
    eventName: ti(`${e.slug}.title`),
    videoUrl: e.videoUrl,
    description: ti(`${e.slug}.description`),
    posterSrc: e.coverImage ?? '',
    logoSrc: e.logoSrc ?? '',
  }))

  const [activeSlide, setActiveSlide] = useState<EventSlide>(eventSlides[0])

  return (
    <section className="bg-black mt-10 py-12 lg:py-20 " id="eventos">
      <div className="relative max-w-[1528px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, zIndex: 50 }}
          whileInView={{ opacity: 1, y: 0, zIndex: 50 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="z-40 absolute top-0 left-0 right-0 -translate-y-4 md:-translate-y-14 w-full xl:max-w-6xl xl:mx-auto flex flex-col items-center justify-center xl:gap-4 text-center px-4 md:px-8 lg:px-10 "
        >
          <SectionHeading
            label={tc('We are')}
            title={t('title')}
            align="center"
            className="flex-col min-[375px]:flex-row items-center justify-center gap-1 min-[375px]:gap-3"
            titleClassName="text-[28px] min-[375px]:text-5xl lg:text-6xl xl:text-7xl"
          />
          <div className=" w-fit max-w-lg lg:max-w-xl px-2 lg:px-0">
            <p className="text-white/80 text-center text-balance text-xs md:text-base lg:text-lg leading-4 xl:leading-5 mt-3 lg:mt-6 xl:mt-0 max-w-xl">
              {t.rich('description', {
                b: (chunks) => (
                  <span className="font-bold text-mint">{chunks}</span>
                ),
              })}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, zIndex: 0 }}
          whileInView={{ opacity: 1, y: 0, zIndex: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative z-0 pb-4 pt-20 md:pt-14 mx-auto overflow-hidden bg-black"
        >
          {/* Background image for current slide — full width, cross-fade on change */}
          <AnimatePresence mode="sync">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-0 pointer-events-auto"
            >
              {activeSlide.posterSrc && (
                <Image
                  src={activeSlide.posterSrc}
                  alt={activeSlide.eventName}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-0 inset-x-0 h-1/2 bg-linear-to-b from-black via-black/20 to-black/0" />
              <div className="absolute bottom-0 inset-x-0 h-1/2 bg-linear-to-t from-black via-black/20 to-black/0" />
            </motion.div>
          </AnimatePresence>
          <EventsSlider
            events={eventSlides}
            onActiveSlideChange={setActiveSlide}
          />
          {/* Overlay Left Side */}
          <div className="hidden lg:block z-50 w-1/3 h-full absolute top-0 left-0 bg-linear-to-r from-black via-black/30 to-black/0 pointer-events-none" />
          {/* Overlay Right Side */}
          <div className="hidden lg:block z-50 w-1/3 h-full absolute top-0 right-0 bg-linear-to-l from-black via-black/30 to-black/0 pointer-events-none" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="z-[60] mt-10 lg:mt-12 flex justify-center"
        >
          <DemoButton
            href="/somos-eventos"
            className="tracking-tight"
          >
            {t('cta')}
          </DemoButton>
        </motion.div>
      </div>
    </section>
  )
}
