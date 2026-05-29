'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/section-heading'
import { DemoButton } from '@/components/ui/demo-button'

export function GamesSection() {
  return (
    <section
      id="juegos"
      className="relative w-full bg-mint py-16 lg:py-24 px-5 lg:px-16 xl:px-24 overflow-hidden"
    >
      <div className="z-0 absolute bottom-0 left-0 right-0 w-full h-2/3 bg-linear-to-t from-black via-black/90 to-black/0" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading
          label="SOMOS"
          title={
            <>
              Juegos &amp;
              <br />
              Gamificación
            </>
          }
          align="center"
          className="justify-center gap-0"
          titleClassName="text-black text-[2.5rem] leading-[2.8rem] md:text-5xl md:leading-14 lg:text-6xl lg:leading-16 xl:text-7xl xl:leading-20 "
        />
      </motion.div>
      <div className="relative z-0 max-w-[1728px] mx-auto flex flex-col items-center -mt-10 ">
        {/* Ruleta + phones */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="z-0 relative w-full sm:max-w-sm md:max-w-lg lg:max-w-2xl"
        >
          <Image
            src="/images/roullete-wheel.webp"
            alt="Ruleta"
            width={800}
            height={800}
            className="z-0 w-full mx-auto opacity-100"
          />
          <Image
            src="/images/mockups-trivias-phones.webp"
            alt="Mockups de trivias en teléfonos"
            width={900}
            height={900}
            className="relative z-20 w-full mt-[-45%] object-contain"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-20 text-white/80 text-center text-pretty text-sm lg:text-base leading-tight mt-10 sm:mt-14 md:mt-24 max-w-md mx-auto"
        >
          Desarrollamos diferentes juegos en base a nuestros productos,
          adaptados a diferentes temáticas con premios exclusivos para nuestros
          usuarios.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative z-10 mt-6"
        >
          <DemoButton href="/somos-juegos" className="text-white">
            CONOCÉ NUESTROS JUEGOS
          </DemoButton>
        </motion.div>
      </div>
    </section>
  )
}
