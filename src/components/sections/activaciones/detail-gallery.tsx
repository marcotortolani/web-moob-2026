"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Activation } from "@/lib/data/activations";

interface DetailGalleryProps {
  activation: Activation;
}

export function DetailGallery({ activation }: DetailGalleryProps) {
  return (
    <>
      {/* Photo mosaic */}
      <section className="bg-black pt-24 px-5 lg:px-16 xl:px-24 pb-6">
        <div className="max-w-[1728px] mx-auto">
          <div className="grid grid-cols-3 lg:grid-cols-12 gap-2 lg:gap-3">
            {/* Left column — 3 stacked */}
            <div className="col-span-1 lg:col-span-3 grid grid-rows-3 gap-2 lg:gap-3">
              {activation.images.slice(0, 3).map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative aspect-square rounded-xl overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${activation.title} - foto ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 33vw, 25vw"
                  />
                </motion.div>
              ))}
            </div>

            {/* Right area — 2 top + 1 large bottom */}
            <div className="col-span-2 lg:col-span-9 grid grid-rows-3 gap-2 lg:gap-3">
              <div className="grid grid-cols-2 gap-2 lg:gap-3 row-span-1">
                {activation.images.slice(0, 2).map((img, i) => (
                  <motion.div
                    key={`right-top-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    className="relative aspect-video rounded-xl overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`${activation.title} - foto ${i + 4}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 37vw"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Large featured */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="row-span-2 relative rounded-xl overflow-hidden"
              >
                <Image
                  src={activation.images[2] ?? activation.coverImage}
                  alt={`${activation.title} - foto principal`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 67vw, 75vw"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/30" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Title + video */}
      <section className="bg-black px-5 lg:px-16 xl:px-24 py-8 lg:py-14">
        <div className="max-w-[1728px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row lg:items-start lg:gap-16"
          >
            {/* Text */}
            <div className="lg:flex-1 mb-8 lg:mb-0">
              <p className="text-white/40 text-xs lg:text-sm uppercase tracking-widest mb-2">
                Activaciones
              </p>
              <h1 className="text-mint font-extrabold italic text-3xl lg:text-5xl xl:text-6xl leading-tight max-w-lg">
                {activation.title}
              </h1>
              {activation.description && (
                <p className="text-white/60 text-sm lg:text-base leading-relaxed mt-4 max-w-md">
                  {activation.description}
                </p>
              )}
            </div>

            {/* Video player */}
            {activation.videoThumbnail && (
              <div className="lg:flex-1">
                <div className="relative rounded-2xl overflow-hidden aspect-video border-2 border-white/20 cursor-pointer group">
                  <Image
                    src={activation.videoThumbnail}
                    alt={`Video: ${activation.title}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/40 group-hover:scale-110 transition-transform shadow-xl">
                      <Play size={28} className="text-white ml-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
