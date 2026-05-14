'use client'

import { useState } from 'react'
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
  muted?: boolean
  loop?: boolean
}

export function ActiveVideoPlayer({
  url,
  controllable = false,
  muted = true,
  loop = true,
}: ActiveVideoPlayerProps) {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const [playing, setPlaying] = useState(true)

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${
        ready && !error ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={controllable ? () => setPlaying((p) => !p) : undefined}
      style={controllable ? { cursor: 'pointer' } : undefined}
    >
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        playing={controllable ? playing : true}
        muted={muted}
        loop={loop}
        playsinline
        controls={false}
        onReady={() => setReady(true)}
        onError={() => setError(true)}
      />
      {controllable && (
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
      <div className="absolute top-0 w-full h-2/3 -mt-1 bg-linear-to-b from-black via-black/50 to-black/0 pointer-events-none" />
      <div className="absolute bottom-0 w-full h-2/3 -mb-1 bg-linear-to-t from-black via-black/60 to-black/0 pointer-events-none" />

      <div className="z-50 relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-white border-2">
        {isActive && event.videoUrl && (
          <ActiveVideoPlayer url={event.videoUrl} />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20 bg-white/10 pointer-events-none" />
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
      spaceBetween={10}
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
          <EventSlideContent
            event={event}
            isActive={activeIndex === i}
            index={i}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
