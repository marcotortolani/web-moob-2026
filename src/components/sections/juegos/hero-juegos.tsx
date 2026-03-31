"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";

const heroImages = [
  "/images/juegos/gamer-1.jpg",
  "/images/juegos/gamer-2.jpg",
  "/images/juegos/gamer-3.jpg",
  "/images/juegos/gamer-4.jpg",
];

export function HeroJuegos() {
  return (
    <section className="bg-black">
      {/* Mosaic grid */}
      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-1.5 h-[360px] md:h-[440px] lg:h-[520px] overflow-hidden">
        {heroImages.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative overflow-hidden"
          >
            <Image
              src={src}
              alt={`Gamers ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        ))}
        {/* Gradients */}
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Heading */}
      <div className="px-5 lg:px-16 xl:px-24 -mt-20 lg:-mt-28 relative z-10 pb-10 lg:pb-14">
        <div className="max-w-[1728px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SectionHeading
              label="SOMOS"
              title={<>Juegos &<br />Gamificación</>}
              titleClassName="lg:text-6xl xl:text-7xl"
            />
            <p className="text-white/70 text-sm lg:text-base leading-relaxed mt-3 max-w-md">
              Desarrollamos juegos en base a nuestros productos con premios exclusivos para nuestros usuarios.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
