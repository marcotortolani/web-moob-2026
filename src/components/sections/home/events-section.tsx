'use client'

import { motion } from 'motion/react'
import { SectionHeading } from '@/components/ui/section-heading'
import { DemoButton } from '@/components/ui/demo-button'
import { EventsSlider, type EventSlide } from '@/components/ui/events-slider'

const events: EventSlide[] = [
  {
    id: 'cmf',
    eventName: 'Club Media Fest',
    videoUrl: 'https://vimeo.com/1163393158',
    description:
      'Primer festival internacional que presenta a los youtubers/influencers. Más de 30 artistas en escena. 2 escenarios. Sets de música, dj set, desafios, paneles, meet & greet, desfiles, humor, belleza.',
    posterSrc: '/images/home/slider-eventos/cmf-evento.webp',
    logoSrc: '/images/logos-eventos/evento-cmf.webp',
  },
  {
    id: 'cdc',
    eventName: 'Cruce de Campeones',
    videoUrl: 'https://vimeo.com/1166471021',
    description:
      'Cruce de campeones reúne a los máximos exponenetes de el Freestyle en Español, en un evento donde los artistas compiten para llegar a una gran final donde puede coronarse.',
    posterSrc: '/images/home/slider-eventos/cdc-evento.webp',
    logoSrc: '/images/logos-eventos/evento-cdc.webp',
  },
  {
    id: 'pf',
    eventName: 'Personal Fest',
    videoUrl: 'https://vimeo.com/1166471396',
    description:
      'El Personal Fest fue uno de los festivales de música más importantes de Argentina, realizado principalmente en Buenos Aires desde 2004 hasta aproximadamente 2018. Organizado por la empresa de telefonía Personal, se destacó por reunir artistas internacionales de primera línea (rock, pop, electrónica) con bandas locales en múltiples escenarios.',
    posterSrc: '/images/home/slider-eventos/personal-fest-evento.webp',
    logoSrc: '/images/logos-eventos/evento-personal-fest.webp',
  },
  {
    id: 'cg',
    eventName: 'Copa Goals',
    videoUrl: 'https://vimeo.com/1167369709',
    description:
      '"Goals" es un evento vinculado al gaming amateur, y en la cual miles de chicos tuvieron la oportunidad de jugar por cumplir un sueño: el de jugar junto a sus ídolos el día del evento.',
    posterSrc: '/images/home/slider-eventos/copa-goals-evento.webp',
    logoSrc: '/images/logos-eventos/evento-copa-goals.webp',
  },
  {
    id: 'cc',
    eventName: 'Comic Con',
    videoUrl: 'https://vimeo.com/1167497056',
    description:
      'Comic Con es la principal convención de cultura pop, que reúne a fans de cómics, anime, cine, videojuegos y cosplay en un espacio único.',
    posterSrc: '/images/home/slider-eventos/comiccon-evento.webp',
    logoSrc: '/images/logos-eventos/evento-comicon.webp',
  },
  {
    id: 'uc',
    eventName: 'Unkla Cup',
    videoUrl: 'https://vimeo.com/1167462693',
    description:
      'Copa UNKLA / Team Gamers. Planificación, Desarrollo y Ejecución de Torneo de Gaming.',
    posterSrc: '/images/home/slider-eventos/unklacup-evento.webp',
    logoSrc: '/images/logos-eventos/evento-copa-unkla.webp',
  },
]

export function EventsSection() {
  return (
    <section className="bg-black mt-10 py-12 lg:py-20 " id="eventos">
      <div className="relative max-w-[1728px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, zIndex: 50 }}
          whileInView={{ opacity: 1, y: 0, zIndex: 50 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="z-40 absolute top-0 -translate-y-20 flex flex-col items-center text-center px-4 lg:px-10"
        >
          <SectionHeading
            label="SOMOS"
            title="Eventos"
            align="center"
            className="flex-row justify-center"
            titleClassName="text-5xl lg:text-6xl xl:text-7xl"
          />
          <div className=" w-full mx-auto px-2 lg:px-8">
            <p className="text-white/80 text-center text-balance text-xs lg:text-sm leading-4 mt-3 lg:mt-6 max-w-xl">
              <span className="font-bold text-mint">Creamos contenido</span> en
              todos los formatos, desde experiencias en vivo hasta producciones
              de larga, mediana y corta duración. Incluyendo películas y
              documentales.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, zIndex: 0 }}
          whileInView={{ opacity: 1, y: 0, zIndex: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="z-0 max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto"
        >
          <EventsSlider events={events} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 lg:mt-12 flex justify-center"
        >
          <DemoButton
            href="/somos-experiencias"
            className="text-white tracking-tight"
          >
            MÁS DE NUESTROS EVENTOS
          </DemoButton>
        </motion.div>
      </div>
    </section>
  )
}
