'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Play, Pause } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

export type EventSlide = {
  id: string
  eventName: string
  videoUrl?: string
  description?: string
  posterSrc: string
  logoSrc: string
}

type ActiveVideoPlayerProps = {
  url: string
  controllable?: boolean
  controls?: boolean
  muted?: boolean
  loop?: boolean
}

export function ActiveVideoPlayer({
  url,
  controllable = false,
  controls = false,
  muted = true,
  loop = true,
}: ActiveVideoPlayerProps) {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const [playing, setPlaying] = useState(!controls)

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 z-30 ${
        ready && !error ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={
        controllable && !controls ? () => setPlaying((p) => !p) : undefined
      }
      style={controllable && !controls ? { cursor: 'pointer' } : undefined}
    >
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        playing={controls ? playing : controllable ? playing : true}
        muted={muted}
        loop={loop}
        playsinline
        controls={controls}
        onReady={() => setReady(true)}
        onError={() => setError(true)}
        onPlay={() => controls && setPlaying(true)}
        onPause={() => controls && setPlaying(false)}
      />
      {controls && !playing && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer"
          aria-label="Reproducir video"
        >
          <span className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/40">
            <Play size={24} className="text-white ml-1" />
          </span>
        </button>
      )}
      {controllable && !controls && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            playing ? 'opacity-0 hover:opacity-100' : 'opacity-100'
          }`}
        >
          <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/40">
            {playing ? (
              <Pause size={22} className="text-white" />
            ) : (
              <Play size={24} className="text-white ml-1" />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function EventSlideContent({
  event,
  isActive,
  inView,
  index,
}: {
  event: EventSlide
  isActive: boolean
  inView: boolean
  index: number
}) {
  return (
    <div className="relative flex flex-col items-center gap-5 px-4 lg:px-10 pt-16 pb-28 lg:pb-20">
      <div className="z-50 relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-white border-2">
        {isActive && inView && event.videoUrl && (
          <ActiveVideoPlayer url={event.videoUrl} />
        )}
        <div className="w-full h-full absolute left-0 top-0 z-10 brightness-75 grayscale-50">
          <Image
            src={event.posterSrc}
            alt={event.eventName}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 60vw"
            priority={index === 0}
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20 bg-white/10 pointer-events-none" />
      </div>

      <div className="absolute bottom-0 h-28 w-60 lg:h-44 lg:w-72 lg:relative">
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
  'lg:[&_.swiper-pagination]:!-mt-8',
  'xl:[&_.swiper-pagination]:!-mt-10',
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

export function EventsSlider({
  events,
  className,
  onActiveSlideChange,
}: {
  events: EventSlide[]
  className?: string
  onActiveSlideChange?: (event: EventSlide, index: number) => void
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  // No montamos el player de Vimeo del slide activo hasta que el slider entra al
  // viewport (la sección de eventos está debajo del fold). Hasta entonces se ve
  // el poster de cada slide.
  // Inicial `false` en server y cliente para no romper la hidratación; el
  // observer lo activa post-montaje.
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={containerRef}>
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={1}
      spaceBetween={10}
      centeredSlides={true}
      speed={1200}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        768: {
          slidesPerView: 1.5,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 1.5,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 1.5,
          spaceBetween: 30,
        },
      }}
      pagination={{ clickable: true }}
      onSwiper={(swiper) =>
        onActiveSlideChange?.(events[swiper.activeIndex], swiper.activeIndex)
      }
      onActiveIndexChange={(swiper) => {
        setActiveIndex(swiper.activeIndex)
        onActiveSlideChange?.(events[swiper.activeIndex], swiper.activeIndex)
      }}
      className={`${SWIPER_CLS}${className ? ` ${className}` : ''}`}
    >
      {events.map((event, i) => (
        <SwiperSlide key={event.id}>
          <EventSlideContent
            event={event}
            isActive={activeIndex === i}
            inView={inView}
            index={i}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  )
}
