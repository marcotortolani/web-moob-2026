"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { Bell, MessageSquare, BarChart2, Package, Gift, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { techServices } from "@/lib/data/services";
import type { MockupContent } from "@/lib/data/services";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Bell,
  MessageSquare,
  BarChart2,
  Package,
  Gift,
};

function MockupScreen({ mockup }: { mockup: MockupContent }) {
  if (mockup.kind === "sat-push") {
    return (
      <div className="flex-1 bg-[#111] flex items-center justify-center p-3">
        <div className="bg-white rounded-2xl p-3 w-full shadow-lg">
          <p className="text-black text-[9px] text-center leading-snug">
            {mockup.body}
          </p>
          <div className="flex gap-1.5 mt-3">
            <div className="flex-1 h-7 rounded-lg bg-[#e0e0e0] flex items-center justify-center">
              <span className="text-black/70 text-[8px] font-bold uppercase">{mockup.cancelLabel}</span>
            </div>
            <div className="flex-1 h-7 rounded-lg bg-mint flex items-center justify-center">
              <span className="text-black text-[8px] font-bold uppercase">{mockup.confirmLabel}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mockup.kind === "chat") {
    const parts = mockup.message.split(/(bit\.ly\/\S+)/g);
    return (
      <div className="flex-1 bg-[#111] flex items-start justify-start p-3 pt-6">
        <div className="relative bg-white rounded-2xl rounded-bl-none p-2.5 max-w-[80%] shadow-lg">
          <p className="text-black text-[9px] leading-snug">
            {parts.map((p, i) =>
              p.startsWith("bit.ly") ? (
                <span key={i} className="text-mint underline font-medium">{p}</span>
              ) : (
                <span key={i}>{p}</span>
              )
            )}
          </p>
          {/* tail */}
          <div className="absolute -bottom-0 left-0 w-0 h-0 border-t-[8px] border-t-white border-r-[8px] border-r-transparent" />
        </div>
      </div>
    );
  }

  if (mockup.kind === "play") {
    return (
      <div className="flex-1 bg-[#111] flex flex-col items-center justify-center gap-2">
        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
          <Play size={20} className="text-white fill-white ml-0.5" />
        </div>
        <span className="text-white text-[9px] font-bold tracking-widest uppercase">{mockup.label}</span>
      </div>
    );
  }

  if (mockup.kind === "bundles") {
    return (
      <div className="flex-1 bg-[#111] flex flex-col items-stretch justify-start gap-2 p-2.5 pt-3">
        {mockup.items.map((item) => (
          <div key={item.title} className="bg-white rounded-xl p-2.5 shadow">
            <p className="text-black text-[9px] font-bold uppercase tracking-wide mb-1">{item.title}</p>
            {item.lines.map((line) => (
              <p key={line} className="text-black/60 text-[8px] leading-snug">{line}</p>
            ))}
            <p className="text-black text-[11px] font-bold mt-1.5">{item.price}</p>
            <button className="mt-1.5 w-full h-6 rounded-lg bg-mint flex items-center justify-center">
              <span className="text-black text-[8px] font-bold uppercase">{item.cta}</span>
            </button>
          </div>
        ))}
      </div>
    );
  }

  if (mockup.kind === "data-rewards") {
    return (
      <div className="flex-1 bg-[#111] flex items-center justify-center p-3">
        <div className="bg-white rounded-2xl p-3 w-full shadow-lg">
          <p className="text-black text-[9px] text-center font-semibold mb-1">¡HAS ACABADO TU PAQUETE DE DATOS!</p>
          <p className="text-black/60 text-[8px] text-center leading-snug">{mockup.body}</p>
          <div className="flex gap-1.5 mt-3">
            <div className="flex-1 h-7 rounded-lg bg-[#e0e0e0] flex items-center justify-center">
              <span className="text-black/70 text-[8px] font-bold uppercase">{mockup.cancelLabel}</span>
            </div>
            <div className="flex-1 h-7 rounded-lg bg-mint flex items-center justify-center">
              <span className="text-black text-[8px] font-bold uppercase">{mockup.confirmLabel}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function PhoneMockup({ mockup, isActive }: { mockup: MockupContent; isActive: boolean }) {
  return (
    <div
      className="relative w-[160px] min-[375px]:w-[200px] lg:w-[260px] xl:w-[300px] aspect-[9/19] mx-auto transition-all duration-350"
      style={{
        opacity: isActive ? 1 : 0.3,
        transform: isActive ? "scale(1)" : "scale(0.9)",
      }}
    >
      <div className="absolute inset-0 rounded-[2.5rem] border-[3px] border-white/20 bg-surface overflow-hidden shadow-2xl flex flex-col">
        {/* Status bar */}
        <div className="h-8 bg-black/40 flex items-center justify-center shrink-0">
          <div className="w-16 h-1.5 bg-white/20 rounded-full" />
        </div>
        {/* Screen */}
        <MockupScreen mockup={mockup} />
      </div>
    </div>
  );
}

export function ServiceDetail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const goTo = (index: number) => {
    setActiveIndex(index);
    swiperRef.current?.slideTo(index);
  };

  const prev = () => goTo((activeIndex - 1 + techServices.length) % techServices.length);
  const next = () => goTo((activeIndex + 1) % techServices.length);

  const service = techServices[activeIndex];
  const Icon = iconMap[service.icon];

  return (
    <section className="bg-black pb-16 lg:pb-24 px-5 md:px-10 lg:px-16 xl:px-24 overflow-hidden">
      <div className="max-w-[1528px] mx-auto">

        {/* Services nav */}
        <div className="mb-8 lg:mb-12">
          <p className="text-center text-white text-[10px] lg:text-xs uppercase tracking-widest mb-6 opacity-90">
            Recorre y conoce nuestros servicios de tecnología
          </p>
          <div className="flex items-center justify-center gap-2 min-[375px]:gap-4 lg:gap-8">
            {techServices.map((s, i) => {
              const NavIcon = iconMap[s.icon];
              return (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  className="flex flex-col items-center gap-1 min-[375px]:gap-2 group"
                >
                  <div
                    className={`w-9 h-9 min-[375px]:w-12 min-[375px]:h-12 lg:w-14 lg:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      i === activeIndex
                        ? "border-mint bg-mint/10"
                        : "border-white/20 group-hover:border-white/50"
                    }`}
                  >
                    <NavIcon
                      size={14}
                      className={`transition-colors ${
                        i === activeIndex ? "text-mint" : "text-white/50 group-hover:text-white/80"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-display font-bold text-[9px] min-[375px]:text-[11px] lg:text-xs tracking-wider transition-colors ${
                      i === activeIndex ? "text-mint" : "text-white/85 group-hover:text-white"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title + icon above slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={service.id + "-title"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-3 mb-6 lg:mb-8"
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-mint bg-mint/10 flex items-center justify-center">
              <Icon size={22} className="text-mint" />
            </div>
            <p className="font-display text-4xl lg:text-5xl xl:text-6xl text-white tracking-wide">
              {service.title}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Phone slider + overlapping description card */}
        <div className="relative pb-32 lg:pb-40">
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            centeredSlides
            slidesPerView="auto"
            spaceBetween={24}
            allowTouchMove
            grabCursor
            className="overflow-visible! cursor-grab active:cursor-grabbing"
          >
            {techServices.map((s, i) => (
              <SwiperSlide key={s.id} className="w-auto!" onClick={() => goTo(i)}>
                <PhoneMockup mockup={s.mockup} isActive={i === activeIndex} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Description card — overlaid on bottom of active mockup */}
          <AnimatePresence mode="wait">
            <motion.div
              key={service.id + "-desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute bottom-10 lg:bottom-0 left-1/2 -translate-x-1/2 w-[min(340px,90vw)] lg:w-[360px] xl:w-[400px] z-10"
            >
              <div className="bg-white/95 rounded-xl p-5 lg:p-6 shadow-xl">
                <p className="text-black text-xs lg:text-sm leading-relaxed text-center">
                  {service.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrows + dots */}
        <div className="flex items-center justify-center gap-4 mt-8 lg:mt-10">
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
    </section>
  );
}
