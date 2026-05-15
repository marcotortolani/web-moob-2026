'use client'

import { motion } from 'motion/react'
import { BannerGridVideo } from '@/components/BannerGridVideo'
import { SectionHeading } from '@/components/ui/section-heading'
import { ActiveVideoPlayer } from '@/components/ui/events-slider'
import type { Activation } from '@/lib/data/activations'

interface DetailGalleryProps {
  activation: Activation
}

export function DetailGallery({ activation }: DetailGalleryProps) {
  const hasImages = activation.images.length >= 4

  return (
    <>
      {/* BannerGrid — solo si hay imágenes; para Mundo Música usa imageH/imageV vacíos → placeholder gris */}
      <section className="z-10 relative bg-black px-5 lg:px-16 xl:px-24 pt-24 lg:pt-32 pb-4">
        <BannerGridVideo
          items={{
            video: activation.videoUrl,
            videoFrame: hasImages ? activation.images[1] : '',
            imageH: hasImages
              ? [activation.images[0], activation.images[1]]
              : [],
            imageV: hasImages
              ? [activation.images[2], activation.images[3]]
              : [],
          }}
          videoPosition="bottom-right"
        />
      </section>

      {/* Heading */}
      <section className="z-50 relative bg-linear-to-t from-black via-black to-transparent px-5 lg:px-16 xl:px-24 pt-0 -translate-y-20 lg:pb-6 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <SectionHeading
            label="ACTIVACIONES"
            title={activation.title}
            align="left"
            className="justify-center gap-0"
            titleClassName="text-3xl lg:text-5xl xl:text-6xl leading-8"
          />
        </motion.div>
      </section>

      {/* Video player + description */}
      <section className="bg-black px-5 lg:px-16 xl:px-24 pb-20 lg:pb-28">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <ActiveVideoPlayer
                url={activation.videoUrl}
                controllable
                muted={true}
                loop={false}
              />
            </div>
          </motion.div>

          {activation.description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white/75 text-sm lg:text-base leading-tight text-center mt-8 max-w-2xl mx-auto"
            >
              {activation.description}
            </motion.p>
          )}
        </div>
      </section>
    </>
  )
}
