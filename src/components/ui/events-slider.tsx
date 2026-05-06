'use client'

import { useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
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

      <div className="z-50 relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-white border-2">
        {isActive && event.videoUrl && (
          <ActiveVideoPlayer url={event.videoUrl} />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
      </div>

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

export function EventsSlider({
  events,
  className,
}: {
  events: EventSlide[]
  className?: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
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
      className={`${SWIPER_CLS}${className ? ` ${className}` : ''}`}
    >
      {events.map((event, i) => (
        <SwiperSlide key={event.id}>
          <EventSlideContent event={event} isActive={activeIndex === i} index={i} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
