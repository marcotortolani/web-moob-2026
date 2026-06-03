'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'motion/react'
import { SectionHeading } from '@/components/ui/section-heading'
import { BannerGridVideo } from '@/components/BannerGridVideo'
import { DemoButton } from '@/components/ui/demo-button'
import { EventsSlider, type EventSlide } from '@/components/ui/events-slider'

const GRID_ITEMS = {
  video: 'https://vimeo.com/1164059473',
  videoFrame:
    '/images/grid/experiencias/home-somosexperiencias-grilla-horizontal02.webp',
  imageH: [
    '/images/grid/experiencias/home-somosexperiencias-grilla-horizontal01.webp',
    '/images/grid/experiencias/home-somosexperiencias-grilla-horizontal02.webp',
  ],
  imageV: [
    '/images/grid/experiencias/home-somosexperiencias-grilla-vertical01.webp',
    '/images/grid/experiencias/home-somosexperiencias-grilla-vertical02.webp',
  ],
}

const SLIDE_META = [
  {
    id: 'vm-mov-ven',
    videoUrl: 'https://vimeo.com/1167461946',
    posterSrc: '/images/home/slider-activaciones/lxc-activacion-clinica.webp',
    logoSrc: '/images/logos-activaciones/locoporlacocina-logo.webp',
  },
  {
    id: 'tg-mov-ven',
    videoUrl: 'https://vimeo.com/1167444864',
    posterSrc: '/images/home/slider-activaciones/tg-activacion.webp',
    logoSrc: '/images/logos-activaciones/teamgamers-logo.webp',
  },
  {
    id: 'spe-vod-mz',
    videoUrl: 'https://vimeo.com/1167432366',
    posterSrc: '/images/home/slider-activaciones/sopraelas-activacion.webp',
    logoSrc: '/images/logos-activaciones/so-pra-elas.webp',
  },
  {
    id: 'qgv-mov-ven',
    videoUrl: 'https://vimeo.com/1167391488',
    posterSrc: '/images/home/slider-activaciones/qgv-activacion.webp',
    logoSrc: '/images/logos-activaciones/queguayviajes-logo.webp',
  },
  {
    id: 'mm-per-py',
    videoUrl: 'https://vimeo.com/1167378582',
    posterSrc:
      '/images/home/slider-activaciones/personalmusica-activacion.webp',
    logoSrc: '/images/logos-activaciones/mundomusica-logo.webp',
  },
  {
    id: 'bt-per-py',
    videoUrl: 'https://vimeo.com/1167401530',
    posterSrc: '/images/home/slider-activaciones/benjatorres-activacion.webp',
    logoSrc: '/images/logos-activaciones/benja-torres.webp',
  },
] as const

export function ActivationsSection() {
  const t = useTranslations('Activations')
  const tc = useTranslations('Common')
  const ts = useTranslations('HomeActivationSlides')

  const slides: EventSlide[] = SLIDE_META.map((m) => {
    const description = ts(`${m.id}.description`)
    return {
      id: m.id,
      eventName: ts(`${m.id}.eventName`),
      videoUrl: m.videoUrl,
      posterSrc: m.posterSrc,
      logoSrc: m.logoSrc,
      ...(description ? { description } : {}),
    }
  })

  const [activeSlide, setActiveSlide] = useState<EventSlide>(slides[0])

  return (
    <section
      className="w-full max-w-[1528px] mx-auto bg-black py-8 lg:py-20 mt-32 pb-20"
      id="activaciones"
    >
      {/* Heading centrado + grid + párrafo encimado */}
      <div className="relative w-full  xl:max-w-6xl xl:mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 xl:top-[unset] xl:bottom-0 xl:flex xl:items-end xl:justify-around xl:px-0 w-full py-4 z-50 -translate-y-30 bg-linear-to-b from-black via-black to-transparent xl:bg-linear-to-t xl:translate-y-10"
        >
          <SectionHeading
            label={tc('We are')}
            title={t('title')}
            align="center"
            className="justify-center gap-0 lg:min-w-75 xl:items-start"
            titleClassName="text-[2.5rem] xl:text-left leading-10 md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-6xl md:leading-12 lg:leading-14 xl:leading-12 2xl:leading-14"
          />

          <p className=" hidden xl:block w-fit text-white/80 text-balance text-left xl:text-lg leading-4 xl:leading-5 max-w-lg 2xl:max-w-xl ">
            {t.rich('description', {
              b: (chunks) => (
                <span className="font-bold text-mint">{chunks}</span>
              ),
            })}
          </p>
        </motion.div>

        <BannerGridVideo items={GRID_ITEMS} videoPosition="bottom-right" />

        <div className="xl:hidden z-50 absolute -bottom-5 translate-y-4 w-full mx-auto px-5 lg:px-16 xl:px-24 bg-linear-to-t from-black via-black to-transparent">
          <p className="text-white/80 text-center text-pretty text-sm md:text-base lg:text-lg leading-4 xl:leading-5 mt-3 lg:mt-6 max-w-xl mx-auto">
            {t.rich('description', {
              b: (chunks) => (
                <span className="font-bold text-mint">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </div>

      {/* Slider de activaciones */}
      <div className="relative mt-20 overflow-hidden bg-black">
        {/* Background image for current slide — full width, cross-fade on change */}
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-0 pointer-events-none"
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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative z-10 pb-4 pt-0 md:pt-14 mx-auto"
        >
          <EventsSlider events={slides} onActiveSlideChange={setActiveSlide} />
        </motion.div>

        {/* Overlay Left Side */}
        <div className="hidden lg:block z-50 w-1/3 h-full absolute top-0 left-0 bg-linear-to-r from-black via-black/30 to-black/0 pointer-events-none" />
        {/* Overlay Right Side */}
        <div className="hidden lg:block z-50 w-1/3 h-full absolute top-0 right-0 bg-linear-to-l from-black via-black/30 to-black/0 pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 lg:mt-12 flex justify-center"
      >
        <DemoButton
          href="/somos-experiencias"
          className="text-white tracking-tight"
        >
          {t('cta')}
        </DemoButton>
      </motion.div>
    </section>
  )
}
