"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Bell, MessageSquare, BarChart2, Package, Gift, ArrowRight } from "lucide-react";

const services = [
  { id: "sat-push", label: "Sat Push", Icon: Bell },
  { id: "sms", label: "SMS", Icon: MessageSquare },
  { id: "publicidad", label: "Publicidad", Icon: BarChart2 },
  { id: "bundle", label: "Bundle", Icon: Package },
  { id: "data-rewards", label: "Data Rewards", Icon: Gift },
];

export function TechSection() {
  return (
    <section className="bg-black py-12 lg:py-20 px-5 lg:px-16 xl:px-24" id="tecnologia">
      <div className="max-w-[1728px] mx-auto">
        {/* Desktop: heading left + description right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-2 lg:mb-10"
        >
          <div className="lg:flex lg:items-start lg:justify-between lg:gap-12">
            <div className="lg:min-w-[300px]">
              <SectionHeading
                label="SOMOS"
                title="Tecnología"
                titleClassName="lg:text-6xl xl:text-7xl"
              />
            </div>
            <div className="flex flex-col gap-3 mt-3 lg:mt-6 max-w-xl">
              <p className="text-white/80 text-sm lg:text-base leading-relaxed">
                <span className="font-bold text-mint">
                  Aplicamos tecnología propia para amplificar su alcance e impacto.
                </span>
                {" "}Contamos con herramientas como MCP, Publicidad Sat y Push, que optimizan la distribución y monetización de los contenidos.
              </p>
              <Link
                href="/somos-tecnologia"
                className="hidden lg:inline-flex text-mint text-sm items-center gap-1 hover:gap-2 transition-all self-start"
              >
                ver más <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Tech image — desktop only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block relative w-full aspect-[3/1] rounded-xl overflow-hidden mb-10 bg-surface-light"
        >
          <Image
            src="/images/hero-bg.jpg"
            alt="Tecnología Media Moob"
            fill
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        </motion.div>

        {/* Services row */}
        <div className="flex justify-between mt-8 lg:mt-0 gap-2 lg:gap-6">
          {services.map(({ id, label, Icon }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center gap-2 lg:gap-3 flex-1"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-mint/30 bg-mint/5 flex items-center justify-center hover:border-mint hover:bg-mint/15 transition-all cursor-pointer"
              >
                <Icon className="text-mint w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              </motion.div>
              <span className="text-white/70 text-[9px] md:text-xs lg:text-sm text-center font-medium uppercase tracking-wide leading-tight">
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mobile: ver más link */}
        <div className="lg:hidden flex justify-center mt-6">
          <Link
            href="/somos-tecnologia"
            className="text-mint text-sm flex items-center gap-1"
          >
            Conocé nuestros servicios <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
