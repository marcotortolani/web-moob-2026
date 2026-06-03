'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { SectionHeading } from '@/components/ui/section-heading'
import { heroCategories } from '@/lib/data/contenido'
import { ThemeProductsSlider } from '@/components/sections/contenido/theme/theme-products-slider'
import { cocinaContent } from '@/lib/data/contenido/cocina'
import { musicaContent } from '@/lib/data/contenido/musica'
import { lifestyleContent } from '@/lib/data/contenido/lifestyle'
import { fitnessContent } from '@/lib/data/contenido/fitness'
import { viajesContent } from '@/lib/data/contenido/viajes'
import { gamingContent } from '@/lib/data/contenido/gaming'
import type { ThemeProduct } from '@/lib/data/contenido/types'
import { cn } from '@/lib/utils'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const heroProducts: Record<string, ThemeProduct[]> = {
  cocina: cocinaContent.products,
  musica: musicaContent.products,
  lifestyle: lifestyleContent.products,
  fitness: fitnessContent.products,
  viajes: viajesContent.products,
  gaming: gamingContent.products,
}

export function ContenidoHero() {
  const t = useTranslations('ContentHub')
  const tCats = useTranslations('ContentCats')
  const tThemes = useTranslations('ContentThemes')
  const [activeSlug, setActiveSlug] = useState(heroCategories[1].slug) // musica default
  const [videoLoaded, setVideoLoaded] = useState(false)

  const active = heroCategories.find((s) => s.slug === activeSlug)!
  const products = heroProducts[activeSlug] ?? []

  const handleSelect = (slug: string) => {
    if (slug === activeSlug) return
    setVideoLoaded(false)
    setActiveSlug(slug)
  }

  return (
    <div className="bg-black">
      {/* ── Hero viewport ── */}
      <section
        className="relative h-dvh w-full overflow-hidden flex flex-col max-w-[1528px] mx-auto"
        aria-label={t('ariaLabel')}
      >
        {/* Background video / frame */}
        <div className="absolute inset-0">
          <Image
            key={`frame-${activeSlug}`}
            src={active.heroFrame ?? active.frame}
            alt={tCats(active.slug)}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Video — cover container forces 16:9 player to fill any aspect-ratio viewport */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{
              opacity: videoLoaded ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                /* Always at least as wide and as tall as the viewport, 16:9 */
                width: 'max(100vw, calc(100dvh * 16 / 9))',
                height: 'max(100dvh, calc(100vw * 9 / 16))',
              }}
            >
              <ReactPlayer
                key={activeSlug}
                url={`https://vimeo.com/${active.heroVimeoId ?? active.vimeoId}`}
                playing
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
                onError={() => setVideoLoaded(false)}
              />
            </div>
          </div>
        </div>

        {/* ── Overlays ── */}
        {/* Top: darkens header area */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-linear-to-b from-black via-black/80 to-transparent" />
        </div>
        {/* Bottom: darkens title + cards area (up to ~55%) */}
        <div className="absolute bottom-0 left-0 right-0 h-[65%] z-10 pointer-events-none bg-linear-to-t from-black via-black/80 to-transparent" />
        {/* Left edge */}
        <div className="absolute top-0 left-0 bottom-0 w-[25%] z-10 pointer-events-none bg-linear-to-r from-black via-black/40 to-transparent" />
        {/* Right edge */}
        <div className="absolute top-0 right-0 bottom-0 w-[25%] z-10 pointer-events-none bg-linear-to-l from-black via-black/40 to-transparent" />

        {/* ── Content (z-20) ── */}
        <div className="relative z-20 flex flex-col w-full h-full">
          {/* Title — sits in the lower half, above cards */}
          <div className="flex-1 flex items-end px-10 xl:px-16 pb-6">
            <div className="flex flex-col xl:flex-row xl:items-end xl:gap-12">
              <SectionHeading
                label={t('label')}
                title={t('title')}
                align="left"
                className="flex-col justify-start gap-0 lg:min-w-64"
                titleClassName="text-5xl xl:text-6xl 2xl:text-7xl xl:leading-14 2xl:leading-16"
              />
              <p className="hidden lg:block text-white/80 text-pretty text-base xl:text-lg leading-5 max-w-md xl:max-w-xl mb-2">
                {t.rich('paragraph', {
                  b: (chunks) => (
                    <span className="font-bold text-mint">{chunks}</span>
                  ),
                })}
              </p>
            </div>
          </div>

          {/* ── Category cards row ── */}
          <div className="px-6 xl:px-10">
            {/* Cards */}
            <div className="flex gap-2 xl:gap-3">
              {heroCategories.map((slide) => {
                const isActive = slide.slug === activeSlug
                return (
                  <button
                    key={slide.slug}
                    onClick={() => handleSelect(slide.slug)}
                    className={cn(
                      'relative flex-1 aspect-square group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
                      isActive && 'ring-2 ring-mint',
                    )}
                    aria-pressed={isActive}
                    aria-label={tCats(slide.slug)}
                  >
                    {/* Image container — clips the image */}
                    <div className="relative w-full h-full overflow-hidden rounded-xs">
                      <Image
                        src={slide.card!}
                        alt={tCats(slide.slug)}
                        fill
                        className={cn(
                          'object-cover transition-transform duration-500',
                          isActive ? 'scale-105' : 'group-hover:scale-110',
                        )}
                        sizes="(max-width: 1280px) 17vw, 220px"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                    </div>

                    {/* Label — outside overflow-hidden so it can translate below the card */}
                    <span
                      className={cn(
                        'absolute bottom-0 left-0 right-0 py-1.5 text-base xl:text-lg font-display text-center tracking-wide uppercase',
                        'transition-all duration-300 ease-out',
                        isActive
                          ? 'translate-y-full bg-mint outline-2 outline-mint text-white'
                          : 'text-white group-hover:text-mint',
                      )}
                    >
                      {tCats(slide.slug)}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Thick mint rule */}
            <div className="mt-10 h-[4px] bg-mint w-full" />
          </div>

          {/* Tagline */}
          <div className="px-6 xl:px-10 py-4 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {active.tagline ? (
                  <p className="text-white text-lg xl:text-xl leading-relaxed font-sans">
                    {tThemes(`${active.slug}.taglineLead`)}{' '}
                    <span className="font-bold text-mint">
                      {tThemes(`${active.slug}.taglineHighlight`)}
                    </span>
                  </p>
                ) : (
                  <p className="text-white/70 text-base leading-relaxed font-sans">
                    {tThemes(`${active.slug}.heroDescription`)}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Products section ── */}
      {products.length > 0 && (
        <div className="w-full mx-auto">
          {/* Callout connector — mint speech bubble with downward arrow */}
          <div className="flex flex-col items-center pt-12 pb-2 bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={`callout-${activeSlug}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex flex-col items-center"
              >
                <div className="bg-mint px-10 py-6 max-w-sm lg:max-w-md text-center">
                  <p className="text-white font-sans text-base lg:text-lg leading-snug">
                    {active.productsLabel
                      ? t('callout', {
                          label: tThemes(`${active.slug}.productsLabel`),
                        })
                      : t('calloutNoLabel')}
                  </p>
                </div>
                {/* Triangle pointing down */}
                <div className="w-0 h-0 -mt-0.5 border-l-20 border-r-20 border-t-20 border-l-transparent border-r-transparent border-t-mint" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider — fades on category change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`products-${activeSlug}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <ThemeProductsSlider products={products} themeSlug={activeSlug} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
