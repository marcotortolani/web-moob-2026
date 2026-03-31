"use client";

import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useRef, useEffect } from "react";
import { Play, Users, Clock } from "lucide-react";

const statsData = [
  {
    value: 1200,
    unit: "HS",
    label: "CONTENIDO EXCLUSIVO",
    Icon: Play,
  },
  {
    value: 550,
    unit: "K",
    label: "SUSCRIPTORES EN NUESTROS PORTALES",
    Icon: Users,
  },
  {
    value: 15,
    unit: "años",
    label: "EXPERIENCIA",
    Icon: Clock,
  },
];

function AnimatedNumber({ value, unit }: { value: number; unit: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 200 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString();
      }
    });
  }, [springValue]);

  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
      <span ref={ref}>0</span>
      <span className="text-mint">{unit}</span>
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="bg-mint/10 border-y border-mint/20 py-8 lg:py-12 px-5 lg:px-16 xl:px-24">
      <div className="max-w-[1728px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-mint/20">
          {statsData.map(({ value, unit, label, Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-2 py-2 md:px-8 lg:px-16"
            >
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border border-mint/40 flex items-center justify-center">
                  <Icon size={18} className="text-mint lg:w-6 lg:h-6" />
                </span>
                <AnimatedNumber value={value} unit={unit} />
              </div>
              <p className="text-white/50 text-[10px] lg:text-xs uppercase tracking-widest text-center max-w-[180px]">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
