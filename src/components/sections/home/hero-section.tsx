'use client'

import { motion, type Variants } from 'motion/react'
import { Play } from 'lucide-react'
import Image from 'next/image'
import { LazyDottedGlobe } from '@/components/ui/dotted-globe-lazy'

const heroLines = [
  { prefix: 'somos', word: 'CREATIVOS', highlight: false },
  { prefix: 'somos', word: 'CURIOSOS', highlight: false },
  { prefix: 'somos', word: 'MEDIA MOOB', highlight: true },
]

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

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0 scale-[25%]">
        <Image
          src="/images/hero-bg.jpg"
          alt="Media Moob hero"
          fill
          className="object-cover object-center"
          priority
          sizes="25vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-transparent to-transparent" />
      </div>

      {/* Content — mobile: column, desktop: flex row */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between min-h-screen px-6 pt-28 pb-16 lg:px-16 xl:px-24 max-w-[1728px] mx-auto">
        {/* Left side: text + CTA + categories */}
        <div className="flex flex-col mt-auto lg:mt-0 lg:flex-1 lg:max-w-[55%]">
          {/* Hero text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {heroLines.map(({ prefix, word, highlight }) => (
              <motion.div
                key={word}
                variants={lineVariants}
                className="leading-none"
              >
                <span className="text-white/80 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light block">
                  {prefix}
                </span>
                <span
                  className={
                    highlight
                      ? 'text-mint text-[2.6rem] md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black italic block leading-none'
                      : 'text-white text-[2.6rem] md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black italic block leading-none'
                  }
                >
                  {word}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA "mira nuestro reel" */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 mt-10 self-start group"
            aria-label="Mira nuestro reel"
          >
            <span className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white/60 flex items-center justify-center group-hover:border-mint group-hover:bg-mint/10 transition-all">
              <Play size={14} className="text-white ml-0.5" fill="white" />
            </span>
            <span className="font-display text-white text-lg lg:text-xl tracking-widest uppercase group-hover:text-mint transition-colors">
              mira nuestro reel
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
          className="flex items-center justify-center mt-10 lg:mt-0 lg:flex-1"
        >
          <GlobeDecoration />
        </motion.div>
      </div>
    </section>
  )
}

function NavCategories() {
  const items = [
    { label: 'contenido exclusivo' },
    { label: 'tecnología' },
    { label: 'eventos y experiencias' },
    { label: 'artistas e influencers' },
    { label: 'producciones propias' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="flex gap-5 lg:gap-8 mt-8 overflow-x-auto pb-1 scrollbar-none"
    >
      {items.map(({ label }) => (
        <button
          key={label}
          className="flex flex-col items-center gap-1.5 min-w-16 shrink-0 group"
        >
          <span className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:border-mint group-hover:bg-mint/10 transition-all">
            <CategoryIcon label={label} />
          </span>
          <span className="text-[9px] lg:text-[10px] text-white/60 text-center leading-tight max-w-16 lg:max-w-20 group-hover:text-mint transition-colors">
            {label}
          </span>
        </button>
      ))}
    </motion.div>
  )
}

function CategoryIcon({ label }: { label: string }) {
  const cls = 'text-white/70 group-hover:text-mint'
  if (label.includes('contenido')) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={cls}
      >
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    )
  }
  if (label.includes('tecnología')) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={cls}
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  }
  if (label.includes('eventos')) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={cls}
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  }
  if (label.includes('artistas')) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={cls}
      >
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    )
  }
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={cls}
    >
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  )
}

// Flags that orbit the globe alongside the text ring
const ORBIT_FLAGS = [
  '🇵🇪',
  '🇧🇴',
  '🇵🇾',
  '🇨🇱',
  '🇳🇬',
  '🇿🇲',
  '🇰🇪',
  '🇦🇪',
  '🇧🇷',
  '🇦🇷',
  '🇨🇴',
  '🇻🇪',
  '🇪🇸',
  '🇲🇿',
  '🇪🇨',
]

// Positions as fraction (0-1) along the circle path (0 = 9 o'clock, clockwise)
// Distributed in the gaps between text segments:
//   Text occupies ~0-0.07, 0.10-0.26, 0.705-0.79, 0.83-0.97
const FLAG_POSITIONS = [
  // 0.685, // gap 1
  0.27,
  0.3,
  0.33,
  0.36,
  0.39,
  0.42,
  0.45,
  0.48, // gap 2
  0.51,
  0.54,
  0.57,
  0.6,
  0.63,
  0.66,
  0.69,
  // 0.69, // gap 2 cont
  // 0.805, // gap 3
  // 0.975, // gap 4
]

// Convert a position t (0-1 along SVG circle path starting at left, clockwise) to x/y %
function orbitPosition(t: number): { x: number; y: number } {
  const angle = 2 * Math.PI * t
  return {
    x: ((200 - 170 * Math.cos(angle)) / 400) * 100,
    y: ((200 - 170 * Math.sin(angle)) / 400) * 100,
  }
}

function GlobeDecoration() {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-125 lg:h-125 xl:w-150 xl:h-150">
      {/* Three.js dotted globe — fills the container */}
      <LazyDottedGlobe />

      {/* Spinning orbit layer — text ring + flag circles rotate together */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 animate-spin-slow pointer-events-none"
        style={{ animationDuration: '30s' }}
      >
        {/* SVG text ring */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full"
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
            <textPath href="#outerCircle" className="uppercase">
              estamos en
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
              startOffset="10%"
              className="uppercase font-bold"
            >
              más de 30 países •{' '}
            </textPath>
          </text>
          <text
            fill="white"
            fontSize="9"
            fontFamily="poppins"
            letterSpacing="2"
            opacity="0.95"
          >
            <textPath
              href="#outerCircle"
              startOffset="70.5%"
              className="uppercase"
            >
              aquí llegamos con
            </textPath>
          </text>
          <text
            fill="#40b09d"
            fontSize="9"
            fontFamily="poppins"
            letterSpacing="2"
            opacity="0.95"
          >
            <textPath
              href="#outerCircle"
              startOffset="83%"
              className="uppercase font-bold"
            >
              nuestras operaciones •{' '}
            </textPath>
          </text>
        </svg>

        {/* Flag circles — counter-rotate to stay upright */}
        {ORBIT_FLAGS.map((flag, i) => {
          const { x, y } = orbitPosition(FLAG_POSITIONS[i])
          return (
            <div
              key={`flag-${i}`}
              className="absolute flex items-center justify-center w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 border border-white/20 backdrop-blur-sm"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animation: 'spin-slow 30s linear infinite reverse',
              }}
            >
              <span className="text-[10px] md:text-xs lg:text-sm leading-none">
                {flag}
              </span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
