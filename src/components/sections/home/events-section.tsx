'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { SectionHeading } from '@/components/ui/section-heading'
import { DemoButton } from '@/components/ui/demo-button'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

type EventSlide = {
  id: string
  eventName: string
  videoUrl?: string
  description?: string
  posterSrc: string
  logoSrc: string
}

const POSTER = '/images/home/slider-contenido/carrousel-cat-musica.webp'

const events: EventSlide[] = [
  {
    id: 'cmf',
    eventName: 'Club Media Fest',
    videoUrl: 'https://vimeo.com/1163393158',
    description:
      'Primer festival internacional que presenta a los youtubers/influencers. Más de 30 artistas en escena. 2 escenarios. Sets de música, dj set, desafios, paneles, meet & greet, desfiles, humor, belleza.',
    posterSrc: '/images/home/slider-contenido/carrousel-cat-musica.webp',
    logoSrc: '/images/logos-eventos/evento-cmf.webp',
  },
  {
    id: 'cdc',
    eventName: 'Cruce de Campeones',
    videoUrl: 'https://vimeo.com/1166471021',
    description:
      'Cruce de campeones reúne a los máximos exponenetes de el Freestyle en Español, en un evento donde los artistas compiten para llegar a una gran final donde puede coronarse.',
    posterSrc: POSTER,
    logoSrc: '/images/logos-eventos/evento-cdc.webp',
  },
  {
    id: 'pf',
    eventName: 'Personal Fest',
    videoUrl: 'https://vimeo.com/1166471396',
    description:
      'El Personal Fest fue uno de los festivales de música más importantes de Argentina, realizado principalmente en Buenos Aires desde 2004 hasta aproximadamente 2018. Organizado por la empresa de telefonía Personal, se destacó por reunir artistas internacionales de primera línea (rock, pop, electrónica) con bandas locales en múltiples escenarios.',
    posterSrc: POSTER,
    logoSrc: '/images/logos-eventos/evento-personal-fest.webp',
  },
  {
    id: 'cg',
    eventName: 'Copa Goals',
    videoUrl: 'https://vimeo.com/1167369709',
    description:
      '“Goals” es un evento vinculado al gaming amateur, y en la cual miles de chicos tuvieron la oportunidad de jugar por cumplir un sueño: el de jugar junto a sus ídolos el día del evento.',
    posterSrc: POSTER,
    logoSrc: '/images/logos-eventos/evento-copa-goals.webp',
  },
  {
    id: 'cc',
    eventName: 'Comic Con',
    videoUrl: 'https://vimeo.com/1167497056',
    description:
      'Comic Con es la principal convención de cultura pop, que reúne a fans de cómics, anime, cine, videojuegos y cosplay en un espacio único.',
    posterSrc: POSTER,
    logoSrc: '/images/logos-eventos/evento-comicon.webp',
  },
  {
    id: 'uc',
    eventName: 'Unkla Cup',
    videoUrl: 'https://vimeo.com/1167462693',
    description:
      'Copa UNKLA / Team Gamers. Planificación, Desarrollo y Ejecución de Torneo de Gaming.',
    posterSrc: POSTER,
    logoSrc: '/images/logos-eventos/evento-copa-unkla.webp',
  },
]

// Mounts only when the slide is active — state resets naturally on unmount
function ActiveVideoPlayer({ url }: { url: string }) {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${
        ready && !error ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        playing
        muted
        loop
        playsinline
        controls={false}
        onReady={() => setReady(true)}
        onError={() => setError(true)}
      />
    </div>
  )
}

function EventSlideContent({
  event,
  isActive,
  index,
}: {
  event: EventSlide
  isActive: boolean
  index: number
}) {
  return (
    <div className="relative flex flex-col items-center gap-5 px-4 lg:px-10 pt-16 pb-28">
      {/* Background poster always visible */}
      <Image
        src={event.posterSrc}
        alt={event.eventName}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 90vw, 60vw"
        priority={index === 0}
      />
      <div className="absolute top-0 w-full h-full -mt-1 bg-linear-to-b from-black via-black/30 to-black/0 pointer-events-none" />
      <div className="absolute bottom-0 w-full h-full -mb-1 bg-linear-to-t from-black via-black/50 to-black/0 pointer-events-none" />

      {/* Video card */}
      <div className="z-50 relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-white border-2 ">
        {/* Video player — only mounted on active slide with video */}
        {isActive && event.videoUrl && (
          <ActiveVideoPlayer url={event.videoUrl} />
        )}
        {/* Edge gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Event logo */}
      <div className="absolute bottom-0 h-28 w-60 lg:h-44 lg:w-72">
        <Image
          src={event.logoSrc}
          alt={event.eventName}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 224px, 288px"
          priority={index === 0}
        />
      </div>
    </div>
  )
}

const SWIPER_CLS = [
  '[&_.swiper-pagination]:!static',
  '[&_.swiper-pagination]:!mt-8',
  'lg:[&_.swiper-pagination]:!mt-10',
  '[&_.swiper-pagination]:!flex',
  '[&_.swiper-pagination]:!gap-0',
  '[&_.swiper-pagination]:!items-center',
  '[&_.swiper-pagination]:!justify-center',
  '[&_.swiper-pagination-bullet]:!bg-white/70',
  '[&_.swiper-pagination-bullet]:!opacity-100',
  '[&_.swiper-pagination-bullet]:!w-3',
  '[&_.swiper-pagination-bullet]:!h-3',
  '[&_.swiper-pagination-bullet]:!rounded-full',
  '[&_.swiper-pagination-bullet]:!transition-all',
  '[&_.swiper-pagination-bullet]:!duration-300',
  '[&_.swiper-pagination-bullet-active]:!bg-mint',
  '[&_.swiper-pagination-bullet-active]:!w-6',
].join(' ')

export function EventsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="bg-black mt-10 py-12 lg:py-20 " id="eventos">
      <div className="relative max-w-[1728px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, zIndex: 50 }}
          whileInView={{ opacity: 1, y: 0, zIndex: 50 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="z-40 absolute top-0 -translate-y-20 flex flex-col items-center text-center px-4 lg:px-10"
        >
          <SectionHeading
            label="SOMOS"
            title="Eventos"
            align="center"
            className="flex-row justify-center"
            titleClassName="text-5xl lg:text-6xl xl:text-7xl"
          />
          <div className=" w-full mx-auto px-2 lg:px-8">
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
          className="z-0 max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto"
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={0}
            speed={1200}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            onActiveIndexChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className={SWIPER_CLS}
          >
            {events.map((event, i) => (
              <SwiperSlide key={event.id}>
                <EventSlideContent
                  event={event}
                  isActive={activeIndex === i}
                  index={i}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 lg:mt-12 flex justify-center"
        >
          <DemoButton
            href="/somos-activaciones"
            className="text-white tracking-tight"
          >
            MÁS DE NUESTROS EVENTOS
          </DemoButton>
        </motion.div>
      </div>
    </section>
  )
}
