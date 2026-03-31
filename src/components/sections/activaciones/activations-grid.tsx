"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { activations, ACTIVATIONS_PER_PAGE } from "@/lib/data/activations";

export function ActivationsGrid() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(activations.length / ACTIVATIONS_PER_PAGE);
  const start = page * ACTIVATIONS_PER_PAGE;
  const current = activations.slice(start, start + ACTIVATIONS_PER_PAGE);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section className="bg-black px-5 lg:px-16 xl:px-24 pb-16 lg:pb-24">
      <div className="max-w-[1728px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4"
          >
            {current.map(({ slug, shortTitle, coverImage }, i) => (
              <motion.div
                key={slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <Link
                  href={`/somos-activaciones/${slug}`}
                  className="block relative aspect-square rounded-2xl overflow-hidden group border border-white/10"
                >
                  <Image
                    src={coverImage}
                    alt={shortTitle}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/80" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                    <p className="font-display text-[11px] md:text-xs lg:text-sm text-white leading-tight tracking-wide uppercase">
                      {shortTitle}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prev}
            disabled={page === 0}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-mint hover:text-mint transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Página anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="font-display text-xl text-white tracking-widest">
            {page + 1}/{totalPages}
          </span>

          <button
            onClick={next}
            disabled={page === totalPages - 1}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-mint hover:text-mint transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Página siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
