'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'motion/react'
import { Play, X } from 'lucide-react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { LazyDottedGlobe } from '@/components/ui/dotted-globe-lazy'
import Link from 'next/link'

type Locale = 'es' | 'en' | 'pt'

// Posición (startOffset sobre el path circular) de cada frase del anillo de texto
// que orbita el globo. Afinado a mano POR IDIOMA porque el largo del texto cambia
// y los segmentos se pisarían con un valor único. `es` = referencia (no tocar).
type OrbitOffsets = {
  compact: { countries: string; arriveWith: string; operations: string }
  full: { weAreIn: string; countries: string; arriveWith: string; operations: string }
}

const ORBIT_OFFSETS: Record<Locale, OrbitOffsets> = {
  es: {
    compact: { countries: '4.67%', arriveWith: '48.33%', operations: '58.5%' },
    full: { weAreIn: '0.5%', countries: '10%', arriveWith: '68%', operations: '82%' },
  },
  en: {
    compact: { countries: '2%', arriveWith: '46.5%', operations: '58.5%' },
    full: { weAreIn: '96.5%', countries: '5.5%', arriveWith: '67%', operations: '83%' },
  },
  pt: {
    // = es, con "operations" empujado un poco más tarde para separar "nossas" de "com".
    compact: { countries: '4.67%', arriveWith: '48.33%', operations: '60%' },
    full: { weAreIn: '0.5%', countries: '10%', arriveWith: '68%', operations: '85%' },
  },
}

const REEL_BY_LOCALE: Record<Locale, string> = {
  es: 'https://dkbzmqzjgfwxoqoe.public.blob.vercel-storage.com/videos/reel-es-argentino.mp4',
  en: 'https://dkbzmqzjgfwxoqoe.public.blob.vercel-storage.com/videos/reel-en.mp4',
  pt: 'https://dkbzmqzjgfwxoqoe.public.blob.vercel-storage.com/videos/reel-pt.mp4',
}

const heroLines = [
  { wordKey: 'CREATIVE', highlight: false },
  { wordKey: 'CURIOUS', highlight: false },
  { word: 'MEDIA MOOB', highlight: true },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.5,
    },
  },
}

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function HeroSection({ locale = 'es' }: { locale?: Locale }) {
  const t = useTranslations('Hero')
  const [videoReady, setVideoReady] = useState(false)
  const [reelOpen, setReelOpen] = useState(false)
  // El video de fondo pesa ~9.5MB. Lo montamos recién cuando el navegador está
  // idle (post-hidratación) para que su descarga no compita con el LCP: la
  // imagen `priority` de fondo se pinta primero y el video hace fade-in después.
  const [showVideo, setShowVideo] = useState(false)
  useEffect(() => {
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number
      cancelIdleCallback?: (id: number) => void
    }
    const schedule =
      w.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200))
    const id = schedule(() => setShowVideo(true))
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id)
      else window.clearTimeout(id)
    }
  }, [])

  return (
    <>
      <section className="relative min-h-screen 3xl:h-screen overflow-hidden bg-black xl:pb-40 ">
        {/* Background image & video */}
        <div className="absolute inset-0 h-1/2 md:h-full xl:h-screen">
          {/* Fallback image — always mounted, acts as placeholder and error fallback */}
          <Image
            src="/images/hero-bg.webp"
            alt="Media Moob hero"
            fill
            className="h-full object-cover object-left md:object-center pb-0.5"
            priority
            sizes="100vw"
          />
          {/* Background video — montado en idle y con fade-in una vez listo */}
          {showVideo && (
            <video
              src="/videos/home-hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              onCanPlay={() => setVideoReady(true)}
              className={`absolute inset-0 h-full w-full object-cover object-left md:object-center transition-opacity duration-500 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-black" />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent" />
        </div>

        {/* Content — mobile: column, desktop: flex row */}
        <div className="relative z-50 flex flex-col xl:flex-row xl:items-center xl:justify-between min-h-screen xl:h-full px-4 md:px-8 pt-28 pb-0 xl:pt-20 xl:px-10 2xl:px-20 max-w-[1728px] mx-auto ">
          {/* Left side: text + CTA + categories */}
          <div className="flex flex-col mt-auto md:mt-10 xl:mt-32 lg:flex-1 xl:max-w-[65%] ">
            {/* Hero text */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {heroLines.map((line) => {
                const word = 'word' in line ? line.word : t(line.wordKey)
                return (
                  <motion.div
                    key={word}
                    variants={lineVariants}
                    className="leading-none"
                  >
                    <span className="text-white/80 text-3xl lg:text-4xl xl:text-5xl font-light block">
                      {t('we are')}
                    </span>
                    <span
                      className={
                        line.highlight
                          ? 'text-mint text-[2.6rem] md:text-6xl lg:text-7xl 2xl:text-8xl font-black italic block leading-none'
                          : 'text-white text-[2.6rem] md:text-6xl lg:text-7xl 2xl:text-8xl font-black italic block leading-none'
                      }
                    >
                      {word}
                    </span>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* CTA "mira nuestro reel" */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setReelOpen(true)}
              className="flex items-center gap-3 mt-10 self-start group"
              aria-label={t('Watch our reel')}
            >
              <span className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white/60 flex items-center justify-center group-hover:border-mint group-hover:bg-mint/10 transition-all">
                <Play size={14} className="text-white ml-0.5" fill="white" />
              </span>
              <span className="font-display text-white text-lg lg:text-xl tracking-widest uppercase group-hover:text-mint transition-colors">
                {t('Watch our reel')}
              </span>
            </motion.button>

            {/* Category icons row */}
            <NavCategories />
          </div>

          {/* Globe — mobile below text, desktop right side */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="z-50 flex items-center justify-center -translate-y-14 md:translate-y-0 xl:translate-y-60 xl:translate-x-10 2xl:translate-y-48 2xl:translate-x-36"
          >
            <GlobeDecoration />
          </motion.div>
        </div>
        <ReelModal
          open={reelOpen}
          onClose={() => setReelOpen(false)}
          locale={locale}
        />

        {/* Background image Earth Space — mobile/tablet overlay only */}
        <div className="3xl:hidden absolute bottom-0 inset-x-0 h-1/4 xl:h-[300px] ">
          <Image
            src="/images/earth-space-bg.webp"
            alt="Earth Space Background"
            fill
            className="object-cover object-center py-1"
            priority
            sizes="25vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black via-black/20 to-black" />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/60" />
        </div>
      </section>
      {/* <EarthSpaceBand /> */}
    </>
  )
}

function ReelModal({
  open,
  onClose,
  locale,
}: {
  open: boolean
  onClose: () => void
  locale: Locale
}) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Reel Media Moob"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              aria-label="Cerrar"
            >
              <X size={28} />
            </button>
            <video
              key={locale}
              src={REEL_BY_LOCALE[locale]}
              controls
              autoPlay
              playsInline
              className="w-full h-auto max-h-[85vh] rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function NavCategories() {
  const t = useTranslations('Hero')
  const items = [
    {
      label: t('exclusive content'),
      image: '/images/contenido-exclusivo-icon.webp',
      link: '#contenido',
    },
    {
      label: t('technology'),
      image: '/images/tecnologia-icon.webp',
      link: '#tecnologia',
    },
    {
      label: t('events and experiences'),
      image: '/images/eventos-experiencias-icon.webp',
      link: '#eventos',
    },
    {
      label: t('own productions'),
      image: '/images/producciones-propias-icon.webp',
      link: '#activaciones',
    },
    {
      label: t('artists and influencers'),
      image: '/images/artistas-influencers-icon.webp',
      link: '#artistas',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="w-full md:max-w-none flex justify-between md:justify-evenly mx-auto gap-1 min-[375px]:gap-2 md:gap-6 lg:gap-8 mt-8 md:mt-24 md:-mb-20 overflow-x-hidden pb-1 scrollbar-none"
    >
      {items.map(({ label, image, link }, i) => (
        <Link
          key={label}
          href={link}
          className={`
          ${i === 0 && 'mt-20 md:mt-32'}
          ${i === 1 && 'mt-8 md:mt-14'}
          ${i === 2 && 'mx-2 md:mx-2'}
          ${i === 3 && 'mt-8 md:mt-14'}
          ${i === 4 && 'mt-20 md:mt-32'}
          flex flex-col items-center gap-1 min-w-10 xl:mt-20 2xl:mt-40 shrink-0 group`}
        >
          <span className="relative w-10 h-10 min-[375px]:w-12 min-[375px]:h-12 lg:w-14 lg:h-14 rounded-full lg:bg-white/10 lg:border lg:border-white/20 flex items-center justify-center group-hover:border-mint group-hover:bg-mint/10 transition-all">
            <Image
              src={image}
              alt=""
              fill
              className="w-full h-full lg:p-2 object-center"
              priority
              sizes="25vw"
            />
          </span>
          <span className="text-[9px] min-[375px]:text-[12px] lg:text-[14px] text-mint font-display font-medium1 uppercase text-center leading-tight max-w-12 min-[375px]:max-w-16 lg:max-w-20 group-hover:text-white transition-colors">
            {label}
          </span>
        </Link>
      ))}
    </motion.div>
  )
}

// Flags that orbit the globe alongside the text ring — full set (sm+)
// Each entry references an SVG in /public/flags/{iso}.svg (from lipis/flag-icons)
const ORBIT_FLAGS_FULL = [
  { iso: 'pe', name: 'Perú' },
  { iso: 'bo', name: 'Bolivia' },
  { iso: 'py', name: 'Paraguay' },
  { iso: 'cl', name: 'Chile' },
  { iso: 'zm', name: 'Zambia' },
  { iso: 'ke', name: 'Kenia' },
  { iso: 'gh', name: 'Ghana' },
  { iso: 'br', name: 'Brasil' },
  { iso: 'ar', name: 'Argentina' },
  { iso: 'co', name: 'Colombia' },
  { iso: 've', name: 'Venezuela' },
  { iso: 'es', name: 'España' },
  { iso: 'mz', name: 'Mozambique' },
  { iso: 'ec', name: 'Ecuador' },
]
// Compact set shown on small screens (< sm / iPhone SE) — 9 most representative
const ORBIT_FLAGS_COMPACT = [
  { iso: 'mx', name: 'México' },
  { iso: 'co', name: 'Colombia' },
  { iso: 'pe', name: 'Perú' },
  { iso: 'br', name: 'Brasil' },
  { iso: 'ar', name: 'Argentina' },
  { iso: 'cl', name: 'Chile' },
  { iso: 'es', name: 'España' },
  { iso: 've', name: 'Venezuela' },
  { iso: 'mz', name: 'Mozambique' },
]

// Positions as fraction (0-1) along the circle path (0 = 9 o'clock, clockwise)
// Distributed in the gap between text segments (~0.27–0.69)
// 14 flags, step 0.03 (igual al original) — el arco termina antes (0.66) para
// dejar más espacio al texto que sigue
const FLAG_POSITIONS_FULL = [
  0.27, 0.3, 0.33, 0.36, 0.39, 0.42, 0.45, 0.48, 0.51, 0.54, 0.57, 0.6, 0.63,
  0.66,
]
// 9 flags evenly spaced across the same arc (step = 0.05)
const FLAG_POSITIONS_COMPACT = [
  0.27, 0.32, 0.37, 0.42, 0.47, 0.52, 0.57, 0.62, 0.67,
]

// Convert a position t (0-1 along SVG circle path starting at left, clockwise) to x/y %
// `radius` matches the SVG circle path radius (170 for sm+, 185 for compact <sm)
function orbitPosition(t: number, radius = 170): { x: number; y: number } {
  const angle = 2 * Math.PI * t
  return {
    x: ((200 - radius * Math.cos(angle)) / 400) * 100,
    y: ((200 - radius * Math.sin(angle)) / 400) * 100,
  }
}

function GlobeDecoration() {
  const t = useTranslations('Hero')
  const locale = useLocale()
  const off = ORBIT_OFFSETS[locale as Locale] ?? ORBIT_OFFSETS.es
  return (
    <div className="z-50 relative w-56 h-56 min-[320px]:w-64 min-[320px]:h-64 min-[375px]:w-72 min-[375px]:h-72 min-[400px]:w-88 min-[400px]:h-88 sm:w-92 sm:h-92 md:w-[650px] md:h-[650px] lg:w-[850px] lg:h-[850px] xl:w-150 xl:h-150 2xl:w-200 2xl:h-200 mt-4">
      <div className="hidden md:block absolute w-full h-full rounded-full bg-radial from-white/5 to-transparent backdrop-blur-xl " />
      {/* Three.js dotted globe — fills the container */}
      <LazyDottedGlobe />

      {/* Spinning orbit layer — text ring + flag circles rotate together */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 animate-spin-slow pointer-events-none"
        style={{ animationDuration: '30s' }}
      >
        {/* SVG text ring — compact (<sm): radius 185, sin "estamos en" */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full sm:hidden"
          aria-hidden="true"
        >
          <defs>
            {/* Path = 1.5 vueltas (540°). El tercer arco se superpone al primero
                visualmente, pero duplica el largo de path disponible para que el
                texto pueda extenderse sin cortarse. Offsets = original / 1.5. */}
            <path
              id="outerCircleCompact"
              d="M 200,200 m -185,0 a 185,185 0 1,1 370,0 a 185,185 0 1,1 -370,0 a 185,185 0 1,1 370,0"
            />
          </defs>
          <text
            fill="#fff"
            fontSize="14"
            fontFamily="poppins"
            letterSpacing="2"
            opacity="0.9"
          >
            <textPath
              href="#outerCircleCompact"
              startOffset={off.compact.countries}
              className="uppercase font-bold"
            >
              {' '}
              • {t('more than 30 countries')} •{' '}
            </textPath>
          </text>
          <text
            fill="white"
            fontSize="13"
            fontFamily="poppins"
            letterSpacing="2"
            opacity="0.95"
          >
            <textPath
              href="#outerCircleCompact"
              startOffset={off.compact.arriveWith}
              className="uppercase"
            >
              {t('here we arrive with')}
            </textPath>
          </text>
          <text
            fill="#40b09d"
            fontSize="13"
            fontFamily="poppins"
            letterSpacing="2"
            opacity="0.95"
          >
            <textPath
              href="#outerCircleCompact"
              startOffset={off.compact.operations}
              className="uppercase font-bold"
            >
              {t('our operations')}
            </textPath>
          </text>
        </svg>

        {/* SVG text ring — full (sm+): radius 170, los 4 textos */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full hidden sm:block 2xl:scale-[1]"
          aria-hidden="true"
        >
          <defs>
            <path
              id="outerCircle"
              d="M 200,200 m -170,0 a 170,170 0 1,1 340,0 a 170,170 0 1,1 -340,0"
            />
          </defs>
          <text
            fill="white"
            fontSize="11"
            fontFamily="poppins"
            letterSpacing="3"
            opacity="0.8"
          >
            <textPath
              href="#outerCircle"
              className="uppercase"
              startOffset={off.full.weAreIn}
            >
              {t('we are in')}
            </textPath>
          </text>
          <text
            fill="#40b09d"
            fontSize="11"
            fontFamily="poppins"
            letterSpacing="3"
            opacity="0.8"
          >
            <textPath
              href="#outerCircle"
              startOffset={off.full.countries}
              className="uppercase font-bold"
            >
              {t('more than 30 countries')} •{' '}
            </textPath>
          </text>
          <text
            fill="white"
            fontSize="11"
            fontFamily="poppins"
            letterSpacing="2"
            opacity="0.95"
          >
            <textPath
              href="#outerCircle"
              startOffset={off.full.arriveWith}
              className="uppercase"
            >
              {t('here we arrive with')}
            </textPath>
          </text>
          <text
            fill="#40b09d"
            fontSize="11"
            fontFamily="poppins"
            letterSpacing="2"
            opacity="0.95"
          >
            <textPath
              href="#outerCircle"
              startOffset={off.full.operations}
              className="uppercase font-bold"
            >
              {t('our operations')} •{' '}
            </textPath>
          </text>
        </svg>

        {/* Compact flags — visible only on small screens (< sm), orbit radius 185 */}
        {ORBIT_FLAGS_COMPACT.map(({ iso, name }, i) => {
          const { x, y } = orbitPosition(FLAG_POSITIONS_COMPACT[i], 185)
          return (
            <div
              key={`flag-compact-${iso}`}
              className="sm:hidden absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden border-2 border-white/60 bg-black shadow-md"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animation: 'spin-slow 30s linear infinite reverse',
              }}
            >
              <Image
                src={`/flags/${iso}.svg`}
                alt={name}
                fill
                unoptimized
                className="object-cover"
                sizes="28px"
              />
            </div>
          )
        })}

        {/* Full flags — visible on sm+ screens */}
        {ORBIT_FLAGS_FULL.map(({ iso, name }, i) => {
          const { x, y } = orbitPosition(FLAG_POSITIONS_FULL[i])
          return (
            <div
              key={`flag-full-${iso}`}
              className="hidden sm:block absolute w-8 h-8 sm:w-6 sm:h-6 lg:w-8 lg:h-8 -translate-x-1/2 -translate-y-1/2 xl:-translate-x-1/4 xl:-translate-y-3/5 2xl:translate-x-[20%] 2xl:translate-y-[-80%] rounded-full overflow-hidden border-2 border-white/60 bg-black shadow-md"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animation: 'spin-slow 30s linear infinite reverse',
              }}
            >
              <Image
                src={`/flags/${iso}.svg`}
                alt={name}
                fill
                unoptimized
                className="object-cover"
                sizes="(min-width: 1280px) 56px, (min-width: 1024px) 48px, 32px"
              />
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

// function EarthSpaceBand() {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       viewport={{ once: true, margin: '-80px' }}
//       transition={{ duration: 0.8 }}
//       className="hidden 3xl:block z-0 relative w-full h-64 xl:h-80 overflow-hidden bg-black"
//     >
//       <Image
//         src="/images/earth-space-bg.webp"
//         alt="Earth Space Background"
//         fill
//         className="object-cover object-center"
//         sizes="100vw"
//       />
//       <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />
//     </motion.div>
//   )
// }
