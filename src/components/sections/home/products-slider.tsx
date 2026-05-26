'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/autoplay'

const products = [
  { src: '/images/logos-productos/allforher.webp', alt: 'All for Her' },
  { src: '/images/logos-productos/cdc.webp', alt: 'CDC' },
  {
    src: '/images/logos-productos/club-de-energia.webp',
    alt: 'Club de Energía',
  },
  { src: '/images/logos-productos/cmf.webp', alt: 'CMF' },
  {
    src: '/images/logos-productos/elreinoinfantil.webp',
    alt: 'El Reino Infantil',
  },
  { src: '/images/logos-productos/epamujer.webp', alt: 'EPA Mujer' },
  { src: '/images/logos-productos/esport-space.webp', alt: 'Esport Space' },
  { src: '/images/logos-productos/flexflix.webp', alt: 'FlexFlix' },
  { src: '/images/logos-productos/haute.webp', alt: 'Haute' },
  { src: '/images/logos-productos/lxc.webp', alt: 'LXC' },
  { src: '/images/logos-productos/mundo-musica.webp', alt: 'Mundo Música' },
  { src: '/images/logos-productos/mundo-rock.webp', alt: 'Mundo Rock' },
  { src: '/images/logos-productos/mundokids.webp', alt: 'Mundo Kids' },
  { src: '/images/logos-productos/qgv.webp', alt: 'QGV' },
  { src: '/images/logos-productos/so-pra-elas.webp', alt: 'Só Pra Elas' },
  { src: '/images/logos-productos/teamgamers.webp', alt: 'Team Gamers' },
  { src: '/images/logos-productos/totalfitness.webp', alt: 'Total Fitness' },
]

export function ProductsSlider() {
  return (
    <section className="bg-mint py-6 md:py-7 lg:py-8 overflow-hidden border-y border-white/10">
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={40}
        loop
        loopAdditionalSlides={products.length * 2}
        freeMode={{ enabled: true, momentum: true }}
        speed={8000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          620: { spaceBetween: 80 },
          1024: { spaceBetween: 100 },
          1250: { spaceBetween: 120 },
        }}
        allowTouchMove
        grabCursor
        onTouchEnd={(swiper) => swiper.autoplay?.start()}
        className="!overflow-visible [&_.swiper-wrapper]:!ease-linear cursor-grab active:cursor-grabbing"
      >
        {[...products, ...products, ...products].map((product, i) => (
          <SwiperSlide key={i} className="w-auto!">
            <Image
              src={product.src}
              alt={product.alt}
              width={120}
              height={60}
              draggable={false}
              className="h-8 scale-125 md:h-9 md:scale-150 lg:h-10 lg:scale-[130%] xl:h-12 xl:max-w-[150px] w-auto object-contain select-none"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
