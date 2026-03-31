"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Bell, MessageSquare, BarChart2, Package, Gift, ChevronLeft, ChevronRight } from "lucide-react";
import { techServices } from "@/lib/data/services";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Bell,
  MessageSquare,
  BarChart2,
  Package,
  Gift,
};

function PhoneMockup({ label }: { label: string }) {
  return (
    <div className="relative w-[180px] lg:w-[220px] xl:w-[260px] aspect-[9/19] mx-auto">
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[2.5rem] border-[3px] border-white/20 bg-surface overflow-hidden shadow-2xl">
        {/* Status bar */}
        <div className="h-8 bg-black/40 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-white/20 rounded-full" />
        </div>
        {/* Screen content */}
        <div className="flex-1 bg-[#0a0a0a] p-3 flex flex-col gap-2 h-full">
          <div className="bg-mint/10 border border-mint/20 rounded-xl p-3 text-center mt-4">
            <p className="text-mint text-[10px] font-bold uppercase tracking-wide">
              {label}
            </p>
            <p className="text-white/60 text-[9px] mt-1 leading-tight">
              Notificación activa
            </p>
          </div>
          <div className="mt-2 space-y-2">
            <div className="h-2 bg-white/10 rounded-full w-3/4 mx-auto" />
            <div className="h-2 bg-white/10 rounded-full w-1/2 mx-auto" />
          </div>
          <div className="mt-auto flex gap-2 pb-2">
            <div className="flex-1 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-white/50 text-[9px] uppercase">Cancelar</span>
            </div>
            <div className="flex-1 h-8 rounded-lg bg-mint flex items-center justify-center">
              <span className="text-black text-[9px] font-bold uppercase">Continuar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServiceDetail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const prev = () => goTo((activeIndex - 1 + techServices.length) % techServices.length);
  const next = () => goTo((activeIndex + 1) % techServices.length);

  const service = techServices[activeIndex];

  return (
    <section className="bg-black pb-16 lg:pb-24 px-5 lg:px-16 xl:px-24">
      <div className="max-w-[1728px] mx-auto">
        {/* Services nav */}
        <div className="mb-8 lg:mb-12">
          <p className="text-center text-white/40 text-[10px] lg:text-xs uppercase tracking-widest mb-6">
            Recorre y conoce nuestros servicios de tecnología
          </p>
          <div className="flex items-center justify-center gap-4 lg:gap-8">
            {techServices.map((s, i) => {
              const Icon = iconMap[s.icon];
              return (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div
                    className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      i === activeIndex
                        ? "border-mint bg-mint/10"
                        : "border-white/20 group-hover:border-white/50"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`transition-colors ${
                        i === activeIndex ? "text-mint" : "text-white/50 group-hover:text-white/80"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-display text-[11px] lg:text-xs tracking-wider transition-colors ${
                      i === activeIndex ? "text-mint" : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={service.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-24"
          >
            {/* Phone mockup */}
            <div className="lg:flex-1 flex items-center justify-center lg:justify-end">
              <PhoneMockup label={service.mockupLabel} />
            </div>

            {/* Text + nav */}
            <div className="lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
              <p className="font-display text-5xl lg:text-6xl xl:text-7xl text-white tracking-wide">
                {service.title}
              </p>
              <div className="bg-white/95 rounded-2xl p-5 lg:p-6 max-w-sm">
                <p className="text-black text-xs lg:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Arrows + dots */}
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-mint hover:text-mint transition-colors"
                  aria-label="Servicio anterior"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-1.5">
                  {techServices.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Servicio ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "w-5 h-2 bg-mint"
                          : "w-2 h-2 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-mint hover:text-mint transition-colors"
                  aria-label="Siguiente servicio"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
