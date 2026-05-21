'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import type { ContenidoSlide } from '@/lib/data/contenido'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

interface Props {
  data: ContenidoSlide
  isActive: boolean
  isFirst: boolean
  isNear: boolean
}

export function ContenidoSlideItem({ data, isActive, isFirst, isNear }: Props) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const showVideo = (isActive || isNear) && !videoError

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black">
      {/* Blurred letterbox bg — desktop only */}
      <div
        className="absolute inset-0 hidden lg:block scale-110"
        aria-hidden
        style={{ filter: 'blur(24px) brightness(0.2)' }}
      >
        <Image
          src={data.frame}
          alt=""
          fill
          sizes="(max-width: 1023px) 1px, 100vw"
          quality={40}
          className="object-cover"
        />
      </div>

      {/* Phone-column on desktop, full-bleed on mobile */}
      <div className="relative h-full w-full lg:max-w-[420px] lg:mx-auto">
        {/* Frame fallback */}
        <Image
          src={data.frame}
          alt={data.title}
          fill
          className="object-cover"
          priority={isFirst}
          sizes="(max-width: 1024px) 100vw, 420px"
        />

        {/* Vimeo video — only mounted when active */}
        {showVideo && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 0.6s' }}
          >
            {/* Frame overlay */}
            <div className=" absolute inset-0 w-full h-full">
              <Image
                src={data.frame}
                alt={data.title}
                fill
                className="object-cover blur-[2px]"
                priority={isFirst}
                sizes="(max-width: 1024px) 100vw, 420px"
              />
            </div>
            <ReactPlayer
              url={`https://vimeo.com/${data.vimeoId}`}
              playing={isActive}
              loop
              muted
              playsinline
              width="100%"
              height="100%"
              config={{
                vimeo: {
                  playerOptions: {
                    background: true,
                    controls: false,
                    dnt: true,
                  },
                },
              }}
              onReady={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-end">
          <div className="h-1/2 w-full bg-linear-to-b from-transparent via-black/60 to-black"></div>
        </div>

        {/* Text content */}
        <div className="absolute bottom-14 left-5 right-5 lg:bottom-16">
          <div className="flex flex-col gap-0">
            <span className="text-white text-2xl font-normal tracking-widest uppercase leading-4 lg:leading-none">
              SOMOS
            </span>
            <h2 className="text-5xl lg:text-6xl leading-tight font-extrabold text-mint">
              {data.title.charAt(0) + data.title.slice(1).toLowerCase()}
            </h2>
          </div>
          <p className="mt-3 text-sm text-white leading-relaxed font-sans max-w-xs lg:max-w-sm">
            {data.description}
          </p>
          <Link
            href={`/somos-contenido/${data.slug}`}
            className="inline-flex items-center gap-2 mt-6 bg-mint text-white font-display uppercase tracking-wider text-base rounded-full px-6 py-2 hover:bg-mint-dark transition-colors"
          >
            Más {data.title} aquí
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Swipe hint — first slide only */}
        {isFirst && (
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 pointer-events-none"
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            aria-hidden
          >
            <ChevronDown size={28} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
