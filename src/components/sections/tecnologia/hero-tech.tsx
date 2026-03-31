"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Play } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

export function HeroTech() {
  return (
    <section className="bg-black">
      {/* Hero image */}
      <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden">
        <Image
          src="/images/tecnologia/hero-tech.jpg"
          alt="SOMOS Tecnología"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Left gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

        {/* Heading overlaid on image */}
        <div className="absolute inset-0 flex flex-col justify-center px-5 lg:px-16 xl:px-24">
          <div className="max-w-[1728px] mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <SectionHeading
                label="SOMOS"
                title="Tecnología"
                titleClassName="lg:text-7xl xl:text-8xl"
              />
              <p className="text-white/80 text-sm lg:text-base leading-relaxed mt-3 max-w-md">
                <strong className="text-mint font-semibold">Aplicamos tecnología propia para amplificar su alcance e impacto.</strong>
                {" "}Contamos con herramientas como MCP, Publicidad Sat y Push, que optimizan la distribución y monetización de los contenidos.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video CTA */}
      <div className="px-5 lg:px-16 xl:px-24 pb-8 lg:pb-12 -mt-2">
        <div className="max-w-[1728px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden aspect-video max-w-xl bg-surface-light border border-white/10 cursor-pointer group"
          >
            <Image
              src="/images/tecnologia/video-thumbnail.jpg"
              alt="Ver video de tecnología"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 640px"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/40 group-hover:scale-110 transition-transform">
                <Play size={24} className="text-white ml-1" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
