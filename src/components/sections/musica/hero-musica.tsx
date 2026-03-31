"use client";

import { motion } from "motion/react";
import Image from "next/image";

const artistImages = [
  { src: "/images/musica/artist-1.jpg", alt: "Artista 1" },
  { src: "/images/musica/artist-2.jpg", alt: "Artista 2" },
  { src: "/images/musica/artist-3.jpg", alt: "Artista 3" },
  { src: "/images/musica/artist-4.jpg", alt: "Artista 4" },
  { src: "/images/musica/artist-5.jpg", alt: "Artista 5" },
  { src: "/images/musica/artist-6.jpg", alt: "Artista 6" },
];

export function HeroMusica() {
  return (
    <section className="bg-black pt-24 pb-0 px-5 lg:px-16 xl:px-24 overflow-hidden">
      <div className="max-w-[1728px] mx-auto">
        {/* Mobile: 2x3 grid | Desktop: asymmetric mosaic */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-2 lg:gap-3 lg:h-[600px] xl:h-[680px]">
          {/* Left column — desktop only, 3 stacked images */}
          {artistImages.slice(0, 3).map((img, i) => (
            <motion.div
              key={img.src + "-left"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-xl ${
                i === 0 ? "col-span-1 lg:col-span-3 lg:row-span-1 aspect-video lg:aspect-auto" : ""
              } ${i === 1 ? "col-span-1 lg:col-span-3 lg:row-span-1 aspect-video lg:aspect-auto" : ""} ${
                i === 2 ? "hidden lg:block lg:col-span-3 lg:row-span-1" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          ))}

          {/* Center — large featured image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-2 lg:col-span-6 lg:row-span-3 relative overflow-hidden rounded-xl aspect-square lg:aspect-auto"
          >
            <Image
              src={artistImages[3].src}
              alt={artistImages[3].alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/40" />
          </motion.div>

          {/* Right column — desktop only, 2 images */}
          {artistImages.slice(4).map((img, i) => (
            <motion.div
              key={img.src + "-right"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="hidden lg:block lg:col-span-3 lg:row-span-1 relative overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
