"use client";

import { motion } from "motion/react";

export function MapSection() {
  return (
    <section className="bg-surface py-14 lg:py-24 px-5 lg:px-16 xl:px-24 overflow-hidden">
      <div className="max-w-[1728px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-20"
        >
          {/* Globe */}
          <div className="relative w-72 h-72 md:w-105 md:h-105 lg:w-136 lg:h-136 shrink-0">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              aria-hidden="true"
              style={{ animation: "spin 40s linear infinite" }}
            >
              <defs>
                <path
                  id="mapTextPath"
                  d="M 200,200 m -160,0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
                />
                <path
                  id="mapTextPath2"
                  d="M 200,200 m -130,0 a 130,130 0 1,0 260,0 a 130,130 0 1,0 -260,0"
                />
              </defs>
              <circle cx="200" cy="200" r="160" fill="none" stroke="#40b09d" strokeWidth="0.5" opacity="0.3" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="#40b09d" strokeWidth="0.3" opacity="0.2" />
              <circle cx="200" cy="200" r="120" fill="none" stroke="#40b09d" strokeWidth="0.3" opacity="0.15" />
              <text fill="white" fontSize="12" letterSpacing="4" opacity="0.8" fontFamily="var(--font-poppins), sans-serif">
                <textPath href="#mapTextPath">
                  estamos en más de 30 países • estamos en más de 30 países •
                </textPath>
              </text>
              <text fill="#40b09d" fontSize="9" letterSpacing="2" opacity="0.6" fontFamily="var(--font-poppins), sans-serif">
                <textPath href="#mapTextPath2" startOffset="30%">
                  aquí llegamos con nuestras operaciones •
                </textPath>
              </text>
              <circle cx="200" cy="200" r="8" fill="#40b09d" opacity="0.8" />
              <circle cx="200" cy="200" r="4" fill="white" />
            </svg>
          </div>

          {/* Text */}
          <div className="text-center lg:text-left max-w-sm">
            <h3 className="text-white text-3xl lg:text-5xl xl:text-6xl font-extrabold italic leading-tight">
              estamos en más de{" "}
              <span className="text-mint block">30 países</span>
            </h3>
            <p className="text-white/40 text-base lg:text-lg mt-4">
              aquí llegamos con nuestras operaciones
            </p>
            {/* Country grid teaser */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
              {["🇦🇷", "🇧🇷", "🇲🇽", "🇨🇴", "🇵🇾", "🇵🇪", "🇿🇦", "🇲🇿", "🇰🇪", "🇺🇾"].map((flag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="text-2xl"
                >
                  {flag}
                </motion.span>
              ))}
              <span className="text-white/40 text-sm self-center">+20 más</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
