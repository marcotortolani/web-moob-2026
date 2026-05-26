'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { SectionHeading } from '@/components/ui/section-heading'
import { DemoButton } from '@/components/ui/demo-button'
import { EventsSlider, type EventSlide } from '@/components/ui/events-slider'
import { events } from '@/lib/data/events'

const eventSlides: EventSlide[] = events.map((e, i) => ({
  id: ['cmf', 'cdc', 'pf', 'cg', 'cc', 'uc'][i] ?? e.slug,
  eventName: e.title,
  videoUrl: e.videoUrl,
  description: e.description,
  posterSrc: e.coverImage ?? '',
  logoSrc: e.logoSrc ?? '',
}))

export function EventsSection() {
  const [activeSlide, setActiveSlide] = useState<EventSlide>(eventSlides[0])

  return (
    <section className="bg-black mt-10 py-12 lg:py-20 " id="eventos">
      <div className="relative max-w-[1728px] mx-auto bg-red-500/0">
        <motion.div
          initial={{ opacity: 0, y: 30, zIndex: 50 }}
          whileInView={{ opacity: 1, y: 0, zIndex: 50 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="z-40 absolute top-0 left-0 right-0 -translate-y-20 flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-10 "
        >
          <SectionHeading
            label="SOMOS"
            title="Eventos"
            align="center"
            className="flex-row justify-center"
            titleClassName="text-5xl lg:text-6xl xl:text-7xl"
          />
          <div className=" w-fit mx-auto px-2 lg:px-8">
            <p className="text-white/80 text-center text-balance text-xs lg:text-sm leading-4 mt-3 lg:mt-6 max-w-xl">
              <span className="font-bold text-mint">Creamos contenido</span> en
              todos los formatos, desde experiencias en vivo hasta producciones
              de larga, mediana y corta duración. Incluyendo películas y
              documentales.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, zIndex: 0 }}
          whileInView={{ opacity: 1, y: 0, zIndex: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="z-0 pb-4 mx-auto overflow-hidden"
        >
          {/* Background image for current slide — full width, cross-fade on change */}
          <AnimatePresence mode="sync">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-0 pointer-events-none pt-20"
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

              <div className="absolute inset-0 bg-linear-to-b from-black via-black/20 to-black/0" />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-black/0" />
            </motion.div>
          </AnimatePresence>
          <EventsSlider
            events={eventSlides}
            onActiveSlideChange={setActiveSlide}
          />
          {/* Overlay Left Side */}
          <div className="z-50 w-1/2 h-full absolute top-0 left-0 bg-linear-to-r from-black via-black/30 to-black/0 pointer-events-none" />
          {/* Overlay Right Side */}
          <div className="z-50 w-1/2 h-full absolute top-0 right-0 bg-linear-to-l from-black via-black/30 to-black/0 pointer-events-none" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="z-60 mt-10 lg:mt-12 flex justify-center"
        >
          <DemoButton
            href="/somos-eventos"
            className="text-white tracking-tight"
          >
            MÁS DE NUESTROS EVENTOS
          </DemoButton>
        </motion.div>
      </div>
    </section>
  )
}
