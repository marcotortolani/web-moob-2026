'use client'

import { type ComponentProps } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/autoplay'
import { SectionHeading } from '@/components/ui/section-heading'
import { contentCategories } from '@/lib/data/content'
import { BannerGridVideo } from '@/components/BannerGridVideo'
import { DemoButton } from '@/components/ui/demo-button'

const categoryImages: Record<string, string> = {
  cocina: '/images/home/slider-contenido/carrousel-cat-cocina.webp',
  musica: '/images/home/slider-contenido/carrousel-cat-musica.webp',
  lifestyle: '/images/home/slider-contenido/carrousel-cat-lifestyle.webp',
  fitness: '/images/home/slider-contenido/carrousel-cat-fitness.webp',
  viajes: '/images/home/slider-contenido/carrousel-cat-viajes.webp',
  gaming: '/images/home/slider-contenido/carrousel-cat-gaming.webp',
}

const GRID_ITEMS = {
  video: 'https://vimeo.com/1164796788',
  videoFrame:
    '/images/grid/contenido/home-somoscontenido-grilla-horizontal02.webp',
  imageH: [
    '/images/grid/contenido/home-somoscontenido-grilla-horizontal01.webp',
    '/images/grid/contenido/home-somoscontenido-grilla-horizontal02.webp',
  ],
  imageV: [
    '/images/grid/contenido/home-somoscontenido-grilla-vertical01.webp',
    '/images/grid/contenido/home-somoscontenido-grilla-vertical02.webp',
  ],
}

type LinkHref = ComponentProps<typeof Link>['href']

export function ContentSection() {
  const t = useTranslations('Content')
  const tc = useTranslations('Common')
  const tCats = useTranslations('ContentCats')
  return (
    <section
      className="w-full max-w-[1930px] mx-auto bg-black py-8 md:py-12 lg:py-20 mt-10"
      id="contenido"
    >
      {/* Desktop: heading left + description right */}
      <div className=" relative w-full xl:max-w-6xl xl:mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className=" absolute top-0 xl:top-[unset] xl:bottom-0 xl:flex xl:items-end xl:justify-around xl:px-0 w-full py-4 2xl:py-10 z-50 -translate-y-14 bg-linear-to-b from-black via-black to-transparent xl:bg-linear-to-t xl:translate-y-10"
        >
          <SectionHeading
            label={tc('We are')}
            title={t('title')}
            align="center"
            className="flex-col justify-center gap-0 lg:min-w-75 xl:items-start "
            titleClassName="text-[28px] min-[375px]:text-5xl md:text-6xl xl:text-5xl 2xl:text-6xl"
          />
          <p className=" hidden xl:block text-white/80 text-left text-pretty text-sm md:text-base xl:text-lg leading-4 xl:leading-5 max-w-2xl ">
            {t.rich('description', {
              b: (chunks) => (
                <span className="font-bold text-mint">{chunks}</span>
              ),
            })}
          </p>
        </motion.div>
        <BannerGridVideo items={GRID_ITEMS} videoPosition="bottom-right" priority />

        <div className="z-50 xl:hidden absolute -bottom-5 translate-y-4 w-full mx-auto px-5 md:px-10 lg:px-0 xl:px-24 bg-linear-to-t from-black via-black to-transparent">
          <p className="mx-auto text-white/80 text-center text-pretty text-sm md:text-base xl:text-lg leading-4 xl:leading-5 mt-3 lg:mt-6 max-w-xl md:max-w-2xl xl:max-w-3xl">
            {t.rich('description', {
              b: (chunks) => (
                <span className="font-bold text-mint">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </div>

      <div className="relative mt-20 ">
        <div className=" absolute w-full h-1/4 z-50 bg-linear-to-b from-black via-black/60 to-transparent"></div>
        <Swiper
          modules={[Autoplay, FreeMode]}
          speed={8000}
          autoplay={{
            delay: 100,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          onReachEnd={(swiper) => {
            if (typeof swiper.params.autoplay === 'object') {
              swiper.params.autoplay.reverseDirection = true
            }
            swiper.autoplay.start()
          }}
          onReachBeginning={(swiper) => {
            if (typeof swiper.params.autoplay === 'object') {
              swiper.params.autoplay.reverseDirection = false
            }
            swiper.autoplay.start()
          }}
          allowTouchMove={true}
          freeMode={{ enabled: true, momentum: true }}
          slidesPerView={4.2}
          spaceBetween={4}
          breakpoints={{
            768: { slidesPerView: 3.2, spaceBetween: 10 },
            1024: { slidesPerView: 4.5, spaceBetween: 12 },
            1280: { slidesPerView: 5.2, spaceBetween: 12 },
          }}
          className="[&_.swiper-wrapper]:ease-linear! px-1 md:px-2 lg:px-4 xl:px-6"
        >
          {contentCategories.map(({ id }) => (
            <SwiperSlide key={id}>
              <Link
                href={`/somos-contenido/${id}` as LinkHref}
                className="block relative aspect-square rounded-xs overflow-hidden group cursor-pointer"
              >
                <Image
                  src={categoryImages[id]}
                  alt={tCats(id)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 1024px) 31vw, 20vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-mint scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="absolute bottom-0 left-0 right-0 text-white text-lg lg:text-xl font-display text-center tracking-wide uppercase group-hover:text-mint transition-colors">
                  {tCats(id)}
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 lg:mt-10 flex justify-center">
          <DemoButton
            href="/somos-contenido"
            className=" tracking-tight"
          >
            {t('cta')}
          </DemoButton>
        </div>
      </div>
    </section>
  )
}
