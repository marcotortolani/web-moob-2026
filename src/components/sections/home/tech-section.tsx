'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/section-heading'
import { BannerGridVideo } from '@/components/BannerGridVideo'
import { DemoButton } from '@/components/ui/demo-button'

const GRID_ITEMS = {
  video: 'https://vimeo.com/1162197714',
  videoFrame:
    '/images/grid/tecnologia/home-somostecnologia-grilla-horizontal02.webp',
  imageH: [
    '/images/grid/tecnologia/home-somostecnologia-grilla-horizontal01.webp',
    '/images/grid/tecnologia/home-somostecnologia-grilla-horizontal02.webp',
  ],
  imageV: [
    '/images/grid/tecnologia/home-somostecnologia-grilla-vertical01.webp',
    '/images/grid/tecnologia/home-somostecnologia-grilla-vertical02.webp',
  ],
}

const services = [
  {
    id: 'sat-push',
    label: 'SAT PUSH',
    icon: '/images/tech-sat-push-icon.webp',
  },
  { id: 'sms', label: 'SMS', icon: '/images/tech-sms-icon.webp' },
  {
    id: 'publicidad',
    label: 'PUBLICIDAD',
    icon: '/images/tech-publicidad-icon.webp',
  },
  { id: 'bundle', label: 'BUNDLE', icon: '/images/tech-bundle-icon.webp' },
  {
    id: 'data-rewards',
    label: 'DATA REWARDS',
    icon: '/images/tech-data-rewards-icon.webp',
  },
]

export function TechSection() {
  return (
    <section
      className="w-full max-w-[1728px] mx-auto bg-black py-8 lg:py-20"
      id="tecnologia"
    >
      <div className="relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 w-full py-4 z-50 -translate-y-10 bg-linear-to-b from-black via-black to-transparent"
        >
          <SectionHeading
            label="SOMOS"
            title="Tecnología"
            align="center"
            className="justify-center gap-0 lg:min-w-75"
            titleClassName="text-5xl lg:text-6xl xl:text-7xl"
          />
        </motion.div>

        <BannerGridVideo items={GRID_ITEMS} videoPosition="bottom-left" />

        <div className="z-50 absolute -bottom-5 translate-y-4 w-full mx-auto px-5 lg:px-16 xl:px-24 bg-linear-to-t from-black via-black to-transparent">
          <p className="text-white/80 text-pretty text-xs lg:text-sm leading-4 mt-3 lg:mt-6 max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto">
            <span className="font-bold text-mint">
              Aplicamos tecnología propia para amplificar su alcance e impacto.
            </span>{' '}
            Contamos con herramientas como MCP, Publicidad Sat y Push, que
            optimizan la distribución y monetización de los contenidos.
          </p>
        </div>
      </div>

      <div className="relative mt-20 px-5 lg:px-16 xl:px-24">
        <div className="flex justify-between gap-2 md:gap-4 lg:gap-6">
          {services.map(({ id, label, icon }, i) => (
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
                className="relative w-14 h-14 p-3 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-mint overflow-hidden cursor-pointer shrink-0"
              >
                <Image
                  src={icon}
                  alt={label}
                  className="w-full h-full"
                  width={80}
                  height={80}
                />
              </motion.div>
              <span className="text-white text-sm md:text-base lg:text-lg text-center font-display font-medium uppercase tracking-wide leading-tight">
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 lg:mt-10 flex justify-center">
          <DemoButton
            href="/somos-tecnologia"
            className="text-white tracking-tight"
          >
            VER TODAS LAS SOLUCIONES DE TECNOLOGÍA
          </DemoButton>
        </div>
      </div>
    </section>
  )
}
