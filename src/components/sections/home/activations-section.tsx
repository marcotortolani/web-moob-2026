"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRight } from "lucide-react";

const activationImages = [
  {
    src: "/images/activations/activation-1.jpg",
    title: "ACTIVACIÓN EN CENTRO COMERCIAL CON BENJA TORRES. PERSONAL PARAGUAY",
    slug: "benja-torres-personal-paraguay",
  },
  {
    src: "/images/activations/activation-2.jpg",
    title: "ACCIÓN EL DÍA DE LA MUJER VODACOM MOZAMBIQUE",
    slug: "dia-mujer-vodacom-mozambique",
  },
  {
    src: "/images/activations/activation-3.jpg",
    title: "STAND Y ACTIVACIÓN FITELVEN TEAM GAMERS",
    slug: "fitelven-team-gamers",
  },
  {
    src: "/images/activations/activation-4.jpg",
    title: "CLÍNICA DE COCINA CON VICTOR MORENO",
    slug: "clinica-cocina-victor-moreno",
  },
];

export function ActivationsSection() {
  return (
    <section className="bg-black py-12 lg:py-20 px-5 lg:px-16 xl:px-24" id="activaciones">
      <div className="max-w-[1728px] mx-auto">
        {/* Desktop: heading left + description right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-6 lg:mb-10"
        >
          <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
            <SectionHeading
              label="SOMOS"
              title={<>Experiencias y<br />Activaciones</>}
              titleClassName="lg:text-6xl xl:text-7xl"
            />
            <div className="flex flex-col gap-2 mt-3 lg:mt-0">
              <p className="text-white/80 text-sm lg:text-base leading-relaxed max-w-md">
                Unimos el mundo OFF con el ON generando activaciones y experiencias para usuarios y partners.
              </p>
              <Link
                href="/somos-activaciones"
                className="text-mint text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                ver todos <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Grid: 2 cols mobile → 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {activationImages.map(({ src, title, slug }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={`/somos-activaciones/${slug}`}
                className="block relative aspect-square rounded-xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-surface-light">
                  <Image
                    src={src}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                  <p className="text-white text-[9px] md:text-[10px] lg:text-xs font-bold leading-tight uppercase tracking-wide">
                    {title}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
