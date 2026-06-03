'use client'

import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { BannerGridVideo } from '@/components/BannerGridVideo'
import { SectionHeading } from '@/components/ui/section-heading'
import { ActiveVideoPlayer } from '@/components/ui/events-slider'
import type { Event } from '@/lib/data/events'

interface DetailGalleryProps {
  event: Event
}

export function DetailGallery({ event }: DetailGalleryProps) {
  const t = useTranslations('EventsPage')
  const ti = useTranslations('EventItems')
  const title = ti(`${event.slug}.title`)
  const description = ti(`${event.slug}.description`)
  const hasImages = event.images.length >= 4

  return (
    <>
      {/* ── Banner grid + heading overlay ── */}
      <section className="relative bg-black pt-14 lg:pt-20">
        <div className="relative max-w-[1528px] mx-auto">
          <BannerGridVideo
            items={{
              video: event.videoUrl,
              videoFrame: hasImages ? event.images[1] : '',
              imageH: hasImages ? [event.images[0], event.images[1]] : [],
              imageV: hasImages ? [event.images[2], event.images[3]] : [],
            }}
            videoPosition="bottom-right"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Bottom — title legibility */}
            <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-linear-to-t from-black via-black/80 to-transparent z-10" />
            {/* Left */}
            <div className="absolute top-0 left-0 bottom-0 w-[15%] bg-linear-to-r from-black/60 via-black/20 to-transparent z-10" />
            {/* Right */}
            <div className="absolute top-0 right-0 bottom-0 w-[15%] bg-linear-to-l from-black/60 via-black/20 to-transparent z-10" />
          </div>

          {/* Title + description — z-20, siempre delante de los overlays */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-5 md:px-10 lg:px-16 xl:px-24 pb-6 lg:pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col xl:flex-row xl:items-end xl:gap-12"
            >
              <SectionHeading
                label={t('detail.label')}
                title={title}
                align="left"
                className="flex-col justify-start gap-0 xl:min-w-64"
                titleClassName="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl xl:leading-14 2xl:leading-16"
              />
              {description && (
                <p className="text-white/80 text-pretty text-sm md:text-base xl:text-lg leading-5 mt-3 xl:mt-0 xl:mb-2 max-w-sm md:max-w-lg xl:max-w-xl">
                  {description}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Video ── */}
      <section className="bg-black px-5 md:px-10 lg:px-16 xl:px-24 pt-10 pb-20 lg:pb-28">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
              <ActiveVideoPlayer
                url={event.detailVideoUrl}
                controls
                muted={false}
                loop={false}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
