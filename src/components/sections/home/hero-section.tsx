'use client'

import { useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { Play } from 'lucide-react'
import Image from 'next/image'
import { LazyDottedGlobe } from '@/components/ui/dotted-globe-lazy'
import Link from 'next/link'

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
  const [videoReady, setVideoReady] = useState(false)

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background image & video */}
      <div className="absolute inset-0 h-1/2 lg:h-full ">
        {/* Fallback image — always mounted, acts as placeholder and error fallback */}
        <Image
          src="/images/hero-bg.webp"
          alt="Media Moob hero"
          fill
          className="h-full object-cover object-left lg:object-center pb-0.5"
          priority
          sizes="100vw"
        />
        {/* Background video — fades in once ready */}
        <video
          src="/videos/home-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-bg.webp"
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover object-left lg:object-center transition-opacity duration-500 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-black" />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent" />
      </div>

      {/* Content — mobile: column, desktop: flex row */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between min-h-screen px-6 pt-28 pb-0 lg:px-16 xl:px-24 max-w-[1728px] mx-auto">
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
                <span className="text-white/80 text-3xl lg:text-4xl xl:text-5xl font-light block">
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
          className="flex items-center justify-center -translate-y-14 lg:translate-y-20 lg:translate-x-20"
        >
          <GlobeDecoration />
        </motion.div>
      </div>
      {/* Background image Earth Space */}
      <div className="absolute bottom-0 inset-x-0 h-1/4 bg-sky-500 ">
        <Image
          src="/images/earth-space-bg.webp"
          alt="Earth Space Background"
          fill
          className=" object-cover object-center lg:object-center py-1 "
          priority
          sizes="25vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black via-black/20 to-black" />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/60" />
      </div>
    </section>
  )
}

function NavCategories() {
  const items = [
    {
      label: 'contenido exclusivo',
      image: '/images/contenido-exclusivo-icon.webp',
      link: '#contenido',
    },
    {
      label: 'tecnología',
      image: '/images/tecnologia-icon.webp',
      link: '#tecnologia',
    },
    {
      label: 'eventos y experiencias',
      image: '/images/eventos-experiencias-icon.webp',
      link: '#eventos',
    },
    {
      label: 'producciones propias',
      image: '/images/producciones-propias-icon.webp',
      link: '#activaciones',
    },
    {
      label: 'artistas e influencers',
      image: '/images/artistas-influencers-icon.webp',
      link: '#artistas',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="w-full flex justify-between mx-auto lg:gap-8 mt-8 overflow-x-auto pb-1 scrollbar-none bg-sky-800/0"
    >
      {items.map(({ label, image, link }, i) => (
        <Link
          key={label}
          href={link}
          className={`
          ${i === 0 && 'mt-20 lg:mt-0'}
          ${i === 1 && 'mt-8 lg:mt-0'}
          ${i === 2 && 'mx-2 lg:mx-0'}
          ${i === 3 && 'mt-8 lg:mt-0'}
          ${i === 4 && 'mt-20 lg:mt-0'}
          flex flex-col items-center gap-1.5 min-w-16 shrink-0 group`}
        >
          <span className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-full lg:bg-white/10 border lg:border-white/20 flex items-center justify-center group-hover:border-mint group-hover:bg-mint/10 transition-all">
            <Image
              src={image}
              alt=""
              fill
              className="w-full h-full lg:p-1 object-center"
              priority
              sizes="25vw"
            />
          </span>
          <span className="text-[12px] lg:text-[14px] text-mint font-display font-medium1 uppercase text-center leading-tight max-w-16 lg:max-w-20 group-hover:text-white transition-colors">
            {label}
          </span>
        </Link>
      ))}
    </motion.div>
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
    <div className="relative w-96 h-96 lg:w-125 lg:h-125 xl:w-150 xl:h-150">
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
