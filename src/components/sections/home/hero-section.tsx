"use client";

import { motion, type Variants } from "motion/react";
import { Play } from "lucide-react";
import Image from "next/image";

const heroLines = [
  { prefix: "somos", word: "CREATIVOS", highlight: false },
  { prefix: "somos", word: "CURIOSOS", highlight: false },
  { prefix: "somos", word: "MEDIA MOOB", highlight: true },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.5,
    },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Media Moob hero"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
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
                      ? "text-mint text-[2.6rem] md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black italic block leading-none"
                      : "text-white text-[2.6rem] md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black italic block leading-none"
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

        {/* Right side: globe — mobile hidden, desktop visible */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="hidden lg:flex items-center justify-center lg:flex-1"
        >
          <GlobeDecoration />
        </motion.div>
      </div>
    </section>
  );
}

function NavCategories() {
  const items = [
    { label: "contenido exclusivo" },
    { label: "tecnología" },
    { label: "eventos y experiencias" },
    { label: "artistas e influencers" },
    { label: "producciones propias" },
  ];

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
  );
}

function CategoryIcon({ label }: { label: string }) {
  const cls = "text-white/70 group-hover:text-mint";
  if (label.includes("contenido")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}>
        <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    );
  }
  if (label.includes("tecnología")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  }
  if (label.includes("eventos")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    );
  }
  if (label.includes("artistas")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}>
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}>
      <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function GlobeDecoration() {
  return (
    <div className="relative w-125 h-125 xl:w-150 xl:h-150">
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full animate-spin-slow"
        style={{ animationDuration: "30s" }}
        aria-hidden="true"
      >
        <defs>
          <path id="outerCircle" d="M 200,200 m -170,0 a 170,170 0 1,1 340,0 a 170,170 0 1,1 -340,0" />
          <path id="innerCircle" d="M 200,200 m -140,0 a 140,140 0 1,0 280,0 a 140,140 0 1,0 -280,0" />
        </defs>
        <text fill="white" fontSize="11" fontFamily="sans-serif" letterSpacing="3" opacity="0.7">
          <textPath href="#outerCircle">
            estamos en más de 30 países • estamos en más de 30 países •
          </textPath>
        </text>
        <text fill="#40b09d" fontSize="9" fontFamily="sans-serif" letterSpacing="2" opacity="0.5">
          <textPath href="#innerCircle" startOffset="50%">
            aquí llegamos con nuestras operaciones • aquí llegamos con nuestras operaciones •
          </textPath>
        </text>
      </svg>
      {/* Center globe placeholder */}
      <div className="absolute inset-15 rounded-full border border-white/10 bg-white/5 overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Mapa global"
          fill
          className="object-cover opacity-30"
          sizes="400px"
        />
      </div>
    </div>
  );
}
