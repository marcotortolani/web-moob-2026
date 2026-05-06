'use client'

import { motion } from 'motion/react'
import { SectionHeading } from '@/components/ui/section-heading'
import { BannerGridVideo } from '@/components/BannerGridVideo'
import { DemoButton } from '@/components/ui/demo-button'
import { EventsSlider, type EventSlide } from '@/components/ui/events-slider'

const GRID_ITEMS = {
  video: 'https://vimeo.com/1164059473',
  videoFrame:
    '/images/grid/experiencias/home-somosexperiencias-grilla-horizontal02.webp',
  imageH:
    '/images/grid/experiencias/home-somosexperiencias-grilla-horizontal01.webp',
  imageV:
    '/images/grid/experiencias/home-somosexperiencias-grilla-vertical02.webp',
}

const POSTER = '/images/home/slider-contenido/carrousel-cat-musica.webp'

const slides: EventSlide[] = [
  {
    id: 'vm-mov-ven',
    eventName: 'Victor Moreno - Movistar Venezuela',
    videoUrl: 'https://vimeo.com/1167461946',
    description:
      'Usuarios del servicio que participaron de una trivia exclusiva para sumar puntos y ganar su lugar en una clínica de cocina exclusiva a cargo de Victor Moreno.',
    posterSrc: '/images/home/slider-activaciones/lxc-activacion-clinica.webp',
    logoSrc: '/images/logos-activaciones/locoporlacocina-logo.webp',
  },
  {
    id: 'tg-mov-ven',
    eventName: 'Team Gamers - Movistar Venezuela',
    videoUrl: 'https://vimeo.com/1167444864',
    description:
      'Se realizó la instalación de un stand en el cual se promocionó el producto de Team Gamers. Las dos acciones principales fue la creación de un totem que contenía una trivia para que los participantes ganen premios y la proyección de una clínica',
    posterSrc: '/images/home/slider-activaciones/tg-activacion.webp',
    logoSrc: '/images/logos-activaciones/teamgamers-logo.webp',
  },
  {
    id: 'spe-vod-mz',
    eventName: 'So Pra Elas - VOD MZ',
    videoUrl: 'https://vimeo.com/1167432366',
    posterSrc: '/images/home/slider-activaciones/sopraelas-activacion.webp',
    logoSrc: '/images/logos-activaciones/so-pra-elas.webp',
  },
  {
    id: 'qgv-mov-ven',
    eventName: 'Que Guay Viajes - Movistar Venezuela',
    videoUrl: 'https://vimeo.com/1167391488',
    posterSrc: '/images/home/slider-activaciones/qgv-activacion.webp',
    logoSrc: '/images/logos-activaciones/queguayviajes-logo.webp',
  },
  {
    id: 'mm-per-py',
    eventName: 'Mundo Música - Personal Paraguay',
    videoUrl: 'https://vimeo.com/1167378582',
    posterSrc:
      '/images/home/slider-activaciones/personalmusica-activacion.webp',
    logoSrc: '/images/logos-activaciones/mundomusica-logo.webp',
  },
  {
    id: 'bt-per-py',
    eventName: 'Benja Torres - Personal Paraguay',
    videoUrl: 'https://vimeo.com/1167401530',
    description:
      'Una intervención artística inesperada y disruptiva, en la que Benja Torres se convierte en el epicentro de una experiencia emocional dentro del centro comercial. A través de sus letras y su arte, el evento humanizo las marcas asociadas, generando un vínculo cercano con el público.',
    posterSrc: '/images/home/slider-activaciones/benjatorres-activacion.webp',
    logoSrc: '/images/logos-activaciones/benja-torres.webp',
  },
]

export function ActivationsSection() {
  return (
    <section
      className="w-full max-w-[1728px] mx-auto bg-black py-8 lg:py-20 mt-24"
      id="activaciones"
    >
      {/* Heading centrado + grid + párrafo encimado */}
      <div className="relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 w-full py-4 z-50 -translate-y-20 bg-linear-to-b from-black via-black to-transparent"
        >
          <SectionHeading
            label="SOMOS"
            title={'Activaciones y experiencias'}
            align="center"
            className="justify-center gap-0 lg:min-w-75"
            titleClassName="text-[2.5rem] leading-10 md:text-5xl lg:text-6xl xl:text-7xl"
          />
        </motion.div>

        <BannerGridVideo items={GRID_ITEMS} videoPosition="bottom-right" />

        <div className="z-50 absolute -bottom-5 translate-y-4 w-full mx-auto px-5 lg:px-16 xl:px-24 bg-linear-to-t from-black via-black to-transparent">
          <p className="text-white/80 text-center text-pretty text-sm lg:text-base leading-4 mt-3 lg:mt-6 max-w-xl mx-auto">
            Unimos el mundo OFF con el ON generando{' '}
            <span className="font-bold text-mint">
              activaciones y experiencias
            </span>{' '}
            para usuarios y partners.
          </p>
        </div>
      </div>

      {/* Slider de activaciones */}
      <div className="relative mt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="z-0 max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto"
        >
          <EventsSlider events={slides} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 lg:mt-12 flex justify-center"
        >
          <DemoButton
            href="/somos-activaciones"
            className="text-white tracking-tight"
          >
            MÁS ACTIVACIONES Y EXPERIENCIAS
          </DemoButton>
        </motion.div>
      </div>
    </section>
  )
}
