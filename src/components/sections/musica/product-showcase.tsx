"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DemoButton } from "@/components/ui/demo-button";

const products = [
  {
    id: "mundo-musica",
    logoTop: "MUNDO",
    logoBottom: "Música",
    description:
      "Nuestra plataforma de streaming musical te lleva más cerca de los artistas que amás. Contenido exclusivo, recitales en vivo, backstage y mucho más.",
    mockupLaptop: "/images/musica/mockup-laptop.jpg",
    mockupPhone: "/images/musica/mockup-phone.jpg",
  },
  {
    id: "musica-al-dia",
    logoTop: "MÚSICA",
    logoBottom: "Al Día",
    description:
      "El portal de noticias musicales más completo de Latinoamérica. Enterate de todo lo que pasa en la industria de la música.",
    mockupLaptop: "/images/musica/mockup-laptop.jpg",
    mockupPhone: "/images/musica/mockup-phone.jpg",
  },
  {
    id: "hits-fm",
    logoTop: "HITS",
    logoBottom: "FM",
    description:
      "Radio digital con los mejores hits del momento. Escuchá en vivo o cuando quieras con nuestro servicio on-demand.",
    mockupLaptop: "/images/musica/mockup-laptop.jpg",
    mockupPhone: "/images/musica/mockup-phone.jpg",
  },
];

export function ProductShowcase() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => goTo((current - 1 + products.length) % products.length);
  const next = () => goTo((current + 1) % products.length);

  const product = products[current];

  return (
    <section className="bg-black py-12 lg:py-20 px-5 lg:px-16 xl:px-24 overflow-hidden">
      <div className="max-w-[1728px] mx-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={product.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-24"
          >
            {/* Mockups */}
            <div className="relative w-full lg:w-auto lg:flex-1 flex items-center justify-center">
              {/* Laptop mockup */}
              <div className="relative w-full max-w-sm lg:max-w-lg xl:max-w-xl aspect-video bg-surface-light rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={product.mockupLaptop}
                  alt={`${product.logoTop} ${product.logoBottom} laptop`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-4xl text-white/20">PREVIEW</span>
                </div>
              </div>
              {/* Phone mockup — overlapping bottom right */}
              <div className="hidden lg:block absolute -bottom-6 -right-6 xl:-right-10 w-28 xl:w-36 aspect-[9/19] bg-surface rounded-2xl border border-white/10 shadow-xl overflow-hidden">
                <Image
                  src={product.mockupPhone}
                  alt={`${product.logoTop} ${product.logoBottom} mobile`}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-xs text-white/20 rotate-90">MOBILE</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:max-w-sm xl:max-w-md gap-4">
              {/* Product logo */}
              <div className="mb-2">
                <p className="font-display text-4xl lg:text-5xl xl:text-6xl text-white leading-none tracking-wide">
                  {product.logoTop}
                </p>
                <p className="font-extrabold italic text-4xl lg:text-5xl xl:text-6xl text-mint leading-none">
                  {product.logoBottom}
                </p>
              </div>

              <p className="text-white/60 text-sm lg:text-base leading-relaxed">
                {product.description}
              </p>

              <DemoButton className="mt-2" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-10 lg:mt-14">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-mint hover:text-mint transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Producto ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2.5 bg-mint"
                    : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-mint hover:text-mint transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
