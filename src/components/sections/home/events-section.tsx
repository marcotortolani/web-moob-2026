"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRight } from "lucide-react";

const eventImages = [
  { src: "/images/events/event-1.jpg", alt: "Evento Media Moob" },
  { src: "/images/events/event-2.jpg", alt: "Concierto" },
  { src: "/images/events/event-3.jpg", alt: "Activación" },
  { src: "/images/events/event-4.jpg", alt: "Festival" },
  { src: "/images/events/event-5.jpg", alt: "Show en vivo" },
  { src: "/images/events/event-6.jpg", alt: "Evento especial" },
];

export function EventsSection() {
  return (
    <section className="bg-black py-12 lg:py-20 px-5 lg:px-16 xl:px-24" id="eventos">
      <div className="max-w-[1728px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-6 lg:mb-10"
        >
          <SectionHeading
            label="SOMOS"
            title="Eventos"
            titleClassName="lg:text-6xl xl:text-7xl"
          />
          <Link
            href="/somos-activaciones"
            className="text-mint text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            ver todos <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-5 px-5 lg:hidden">
          {eventImages.map(({ src, alt }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="relative shrink-0 w-64 aspect-video rounded-lg overflow-hidden bg-surface-light"
            >
              <Image src={src} alt={alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="256px" />
            </motion.div>
          ))}
        </div>

        {/* Desktop: asymmetric grid matching Figma */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-3 xl:gap-4">
          {/* Left column: 3 stacked (3 cols) */}
          <div className="col-span-3 flex flex-col gap-3 xl:gap-4">
            {eventImages.slice(0, 3).map(({ src, alt }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-video rounded-lg overflow-hidden bg-surface-light group"
              >
                <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
              </motion.div>
            ))}
          </div>

          {/* Center: large (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-6 relative rounded-lg overflow-hidden bg-surface-light group"
          >
            <Image src={eventImages[3].src} alt={eventImages[3].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="50vw" />
          </motion.div>

          {/* Right column: 3 stacked (3 cols) */}
          <div className="col-span-3 flex flex-col gap-3 xl:gap-4">
            {eventImages.slice(4).map(({ src, alt }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="relative aspect-video rounded-lg overflow-hidden bg-surface-light group"
              >
                <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
              </motion.div>
            ))}
            {/* Fill third slot if only 2 images */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="relative aspect-video rounded-lg overflow-hidden bg-surface-light group"
            >
              <Image src={eventImages[0].src} alt={eventImages[0].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
