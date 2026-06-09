'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/autoplay'

const brands = [
  { src: '/images/logos-marcas-partners/airtel.webp', alt: 'Airtel' },
  { src: '/images/logos-marcas-partners/america.webp', alt: 'América' },
  { src: '/images/logos-marcas-partners/artear.webp', alt: 'Artear' },
  { src: '/images/logos-marcas-partners/axe.webp', alt: 'AXE' },
  { src: '/images/logos-marcas-partners/claro.webp', alt: 'Claro' },
  { src: '/images/logos-marcas-partners/entel.webp', alt: 'Entel' },
  { src: '/images/logos-marcas-partners/flow.webp', alt: 'Flow' },
  { src: '/images/logos-marcas-partners/gancia.webp', alt: 'Gancia' },
  { src: '/images/logos-marcas-partners/metro.webp', alt: 'Metro' },
  { src: '/images/logos-marcas-partners/mtn.webp', alt: 'MTN' },
  { src: '/images/logos-marcas-partners/orange.webp', alt: 'Orange' },
  {
    src: '/images/logos-marcas-partners/personal-fest.webp',
    alt: 'Personal Fest',
  },
  { src: '/images/logos-marcas-partners/personal.webp', alt: 'Personal' },
  { src: '/images/logos-marcas-partners/phillips.webp', alt: 'Phillips' },
  { src: '/images/logos-marcas-partners/sony.webp', alt: 'Sony' },
  { src: '/images/logos-marcas-partners/telcel.webp', alt: 'Telcel' },
  { src: '/images/logos-marcas-partners/tigo.webp', alt: 'Tigo' },
  { src: '/images/logos-marcas-partners/tim.webp', alt: 'TIM' },
  { src: '/images/logos-marcas-partners/vivo.webp', alt: 'Vivo' },
  { src: '/images/logos-marcas-partners/vodacom.webp', alt: 'Vodacom' },
  { src: '/images/logos-marcas-partners/warner.webp', alt: 'Warner' },
  { src: '/images/logos-marcas-partners/yoigo.webp', alt: 'Yoigo' },
]

export function BrandsSlider() {
  const t = useTranslations('Brands')
  return (
    <section className="bg-mint py-6 md:py-7 lg:py-8 overflow-hidden border-y border-white/5 mt-2.5">
      <p className="font-sans text-center text-black text-xs lg:text-sm uppercase tracking-widest mb-4 lg:mb-6 px-5">
        {t('title')}
      </p>
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={40}
        loop
        loopAdditionalSlides={brands.length * 2}
        freeMode={{ enabled: true, momentum: true }}
        speed={8000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        allowTouchMove
        grabCursor
        onTouchEnd={(swiper) => swiper.autoplay?.start()}
        className="!overflow-visible [&_.swiper-wrapper]:!ease-linear cursor-grab active:cursor-grabbing"
      >
        {[...brands, ...brands, ...brands].map((brand, i) => (
          <SwiperSlide key={i} className="!w-auto">
            <Image
              src={brand.src}
              alt={brand.alt}
              width={0}
              height={0}
              sizes="160px"
              draggable={false}
              className="h-8 md:h-9 lg:h-10 xl:h-12 w-auto object-contain select-none"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
