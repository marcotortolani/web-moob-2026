'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { events, EVENTS_PER_PAGE } from '@/lib/data/events'

export function EventsGrid() {
  const t = useTranslations('EventsPage')
  const ti = useTranslations('EventItems')
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE)
  const start = page * EVENTS_PER_PAGE
  const current = events.slice(start, start + EVENTS_PER_PAGE)

  const prev = () => setPage((p) => Math.max(0, p - 1))
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1))

  return (
    <section className="bg-black px-5 md:px-10 lg:px-16 xl:px-24 pb-16 lg:pb-24">
      <div className="max-w-[1528px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5"
          >
            {current.map(({ slug, coverImage }, i) => {
              const shortTitle = ti(`${slug}.shortTitle`)
              return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <Link
                  href={
                    `/somos-eventos/${slug}` as React.ComponentProps<
                      typeof Link
                    >['href']
                  }
                  className="block relative aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] rounded-xl overflow-hidden group"
                >
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={shortTitle}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-mint/30 via-neutral-900 to-neutral-800" />
                  )}
                  {/* Bottom gradient — strong enough for text legibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  {/* Mint bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-mint scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 md:px-5 md:pb-5">
                    <p className="font-display text-sm md:text-base lg:text-lg xl:text-xl text-white text-center leading-tight tracking-wide uppercase whitespace-pre-line">
                      {shortTitle}
                    </p>
                  </div>
                </Link>
              </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-10 md:mt-12">
            <button
              onClick={prev}
              disabled={page === 0}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-mint hover:text-mint transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label={t('grid.prevPage')}
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-display text-xl md:text-2xl text-white tracking-widest">
              {page + 1}/{totalPages}
            </span>
            <button
              onClick={next}
              disabled={page === totalPages - 1}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-mint hover:text-mint transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label={t('grid.nextPage')}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
