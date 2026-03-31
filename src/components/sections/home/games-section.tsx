"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRight } from "lucide-react";

const games = [
  { id: "trivia", label: "TRIVIAS", src: "/images/games/trivia.png" },
  { id: "memotest", label: "MEMOTEST", src: "/images/games/memotest.png" },
  { id: "puzzle", label: "PUZZLE", src: "/images/games/puzzle.png" },
  { id: "paint", label: "PAINT", src: "/images/games/paint.png" },
];

export function GamesSection() {
  return (
    <section className="bg-black py-12 lg:py-20 px-5 lg:px-16 xl:px-24" id="juegos">
      <div className="max-w-[1728px] mx-auto">
        {/* Desktop: layout flex with description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="lg:flex lg:items-start lg:justify-between lg:gap-16"
        >
          {/* Left: heading + games */}
          <div className="flex-1">
            <div className="flex items-end justify-between mb-6 lg:mb-10">
              <SectionHeading
                label="SOMOS"
                title={<>Juegos &amp;<br />Gamificación</>}
                titleClassName="lg:text-6xl xl:text-7xl"
              />
              <Link
                href="/somos-juegos"
                className="text-mint text-sm flex items-center gap-1 hover:gap-2 transition-all ml-4 shrink-0"
              >
                ver más <ArrowRight size={14} />
              </Link>
            </div>

            {/* Games icons row */}
            <div className="flex justify-start gap-6 lg:gap-10">
              {games.map(({ id, label, src }, i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-2xl bg-surface-light border border-white/10 overflow-hidden relative hover:border-mint/50 transition-all cursor-pointer"
                  >
                    <Image src={src} alt={label} fill className="object-cover" sizes="112px" />
                  </motion.div>
                  <span className="text-white/60 text-[9px] md:text-xs lg:text-sm font-bold tracking-widest uppercase">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: description — desktop only */}
          <div className="hidden lg:flex flex-col justify-center max-w-xs xl:max-w-sm mt-0 pt-2">
            <p className="text-white/70 text-base leading-relaxed">
              Desarrollamos diferentes juegos en base a nuestros productos, adaptados a diferentes temáticas con premios exclusivos para nuestros usuarios.
            </p>
            <Link
              href="/somos-juegos"
              className="mt-4 text-mint text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              Conocé nuestros juegos <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
