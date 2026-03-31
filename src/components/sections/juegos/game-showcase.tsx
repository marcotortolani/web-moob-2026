"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { HelpCircle, Grid2X2, RotateCcw, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { games } from "@/lib/data/games";
import { DemoButton } from "@/components/ui/demo-button";

// Puzzle icon since it may not be in lucide
function PuzzleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  HelpCircle,
  Grid2X2,
  Puzzle: ({ size, className }) => <PuzzleIcon size={size} />,
  RotateCcw,
  TrendingUp,
};

// Trivia wheel mockup SVG
function TriviaWheel() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
      <circle cx="100" cy="100" r="90" fill="none" stroke="#40b09d" strokeWidth="2" opacity="0.3" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * 360;
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + 90 * Math.cos(rad);
        const y1 = 100 + 90 * Math.sin(rad);
        return <line key={i} x1="100" y1="100" x2={x1} y2={y1} stroke="#40b09d" strokeWidth="1.5" opacity="0.4" />;
      })}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = ((i + 0.5) / 6) * 360 - 90;
        const rad = (angle * Math.PI) / 180;
        const r = 55;
        return (
          <circle
            key={i}
            cx={100 + r * Math.cos(rad)}
            cy={100 + r * Math.sin(rad)}
            r="22"
            fill={i % 2 === 0 ? "#40b09d" : "#1a1a1a"}
            stroke={i % 2 === 0 ? "#40b09d" : "#40b09d"}
            strokeWidth="1"
            opacity="0.9"
          />
        );
      })}
      <circle cx="100" cy="100" r="16" fill="#40b09d" />
      <circle cx="100" cy="100" r="10" fill="white" />
    </svg>
  );
}

function GamePhoneMockup({ gameTitle }: { gameTitle: string }) {
  return (
    <div className="relative mx-auto" style={{ width: "160px", aspectRatio: "9/19" }}>
      <div className="absolute inset-0 rounded-[2rem] border-[3px] border-white/20 bg-surface overflow-hidden shadow-2xl">
        <div className="h-6 bg-black flex items-center justify-center">
          <div className="w-12 h-1 bg-white/20 rounded-full" />
        </div>
        <div className="flex-1 bg-mint/10 flex flex-col items-center justify-center p-3 h-full gap-2">
          <div className="w-28 h-28">
            <TriviaWheel />
          </div>
        </div>
      </div>
    </div>
  );
}

export function GameShowcase() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };
  const prev = () => goTo((current - 1 + games.length) % games.length);
  const next = () => goTo((current + 1) % games.length);

  const game = games[current];
  const Icon = iconMap[game.icon];

  return (
    <section className="bg-black pb-16 lg:pb-24 px-5 lg:px-16 xl:px-24">
      <div className="max-w-[1728px] mx-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={game.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-24"
          >
            {/* Phones — 3 in perspective (center + two sides) */}
            <div className="lg:flex-1 flex items-center justify-center gap-3 lg:gap-4">
              {/* Side phone left */}
              <div className="hidden lg:block opacity-40 scale-90 -mr-4 z-0">
                <GamePhoneMockup gameTitle={game.title} />
              </div>
              {/* Main phone */}
              <div className="relative z-10 scale-100">
                <GamePhoneMockup gameTitle={game.title} />
              </div>
              {/* Side phone right */}
              <div className="hidden lg:block opacity-40 scale-90 -ml-4 z-0">
                <GamePhoneMockup gameTitle={game.title} />
              </div>
            </div>

            {/* Text */}
            <div className="lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
              {/* Card */}
              <div className="bg-white/95 rounded-2xl p-5 lg:p-6 w-full max-w-sm">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  {Icon && <Icon size={20} className="text-black" />}
                  <p className="font-extrabold text-xl lg:text-2xl text-black tracking-wide">
                    {game.title}
                  </p>
                </div>
                <p className="text-black/70 text-xs lg:text-sm leading-relaxed">
                  {game.description}
                </p>
              </div>

              <DemoButton />

              {/* Arrows + dots */}
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-mint hover:text-mint transition-colors"
                  aria-label="Juego anterior"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-1.5">
                  {games.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Juego ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        i === current
                          ? "w-5 h-2 bg-mint"
                          : "w-2 h-2 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-mint hover:text-mint transition-colors"
                  aria-label="Siguiente juego"
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
