"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { contentCategories } from "@/lib/data/content";

const categoryImages: Record<string, string> = {
  cocina: "/images/categories/cocina.jpg",
  musica: "/images/categories/musica.jpg",
  lifestyle: "/images/categories/lifestyle.jpg",
  fitness: "/images/categories/fitness.jpg",
  viajes: "/images/categories/viajes.jpg",
  gaming: "/images/categories/gaming.jpg",
};

export function ContentSection() {
  return (
    <section className="bg-black py-12 lg:py-20 px-5 lg:px-16 xl:px-24" id="contenido">
      <div className="max-w-[1728px] mx-auto">
        {/* Desktop: heading left + description right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-6 lg:mb-10"
        >
          <div className="lg:flex lg:items-start lg:justify-between lg:gap-12">
            <SectionHeading
              label="SOMOS"
              title="Contenido"
              className="lg:min-w-[300px]"
              titleClassName="lg:text-6xl xl:text-7xl"
            />
            <p className="text-white/80 text-sm lg:text-base leading-relaxed mt-3 lg:mt-6 max-w-xl">
              <span className="font-bold text-mint">
                Creamos contenido en todos los formatos, desde experiencias en vivo hasta producciones de larga, mediana y corta duración.
              </span>
              {" "}Incluyendo películas y documentales.
            </p>
          </div>
        </motion.div>

        {/* Categories Grid: 3 cols mobile → 6 cols desktop */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 lg:gap-3">
          {contentCategories.map(({ label, id }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                href={`/somos-${id}`}
                className="block relative aspect-[3/4] lg:aspect-[4/5] rounded-lg overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-surface-light">
                  <Image
                    src={categoryImages[id]}
                    alt={label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 33vw, 16vw"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                {/* Colored bottom bar on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-mint scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="absolute bottom-3 lg:bottom-4 left-0 right-0 text-center text-white text-[11px] lg:text-sm font-semibold tracking-wide uppercase px-1 group-hover:text-mint transition-colors">
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
