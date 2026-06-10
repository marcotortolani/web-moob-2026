'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Pagination, Keyboard, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import { DemoButton } from '@/components/ui/demo-button'
import type { ThemeProduct } from '@/lib/data/contenido/types'

interface Props {
  products: ThemeProduct[]
  heading?: string
  /** Theme slug used to resolve translated product names + demo label. */
  themeSlug?: string
}

export function ThemeProductsSlider({ products, heading, themeSlug }: Props) {
  const tHub = useTranslations('ContentHub')
  const tThemes = useTranslations('ContentThemes')
  const single = products.length <= 1
  const swiperRef = useRef<SwiperType | null>(null)

  const productName = (product: ThemeProduct) =>
    themeSlug
      ? tThemes(`${themeSlug}.products.${product.id}`)
      : (product.alt ?? product.id)
  return (
    <section className="relative bg-black px-4 lg:px-6 pt-4 pb-16 lg:pb-24 overflow-x-hidden">
      {heading && (
        <h2 className="text-white text-center text-xl lg:text-2xl font-sans mb-10">
          {heading}
        </h2>
      )}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[Pagination, Keyboard, Autoplay]}
        keyboard={{ enabled: true }}
        pagination={single ? false : { clickable: true }}
        slidesPerView={1}
        spaceBetween={0}
        loop={!single}
        speed={1200}
        autoplay={
          single
            ? false
            : {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        style={
          {
            '--swiper-pagination-color': 'var(--color-mint)',
            '--swiper-pagination-bullet-inactive-color': '#ffffff',
            '--swiper-pagination-bullet-inactive-opacity': '0.3',
            '--swiper-pagination-bullet-size': '8px',
            '--swiper-pagination-bullet-horizontal-gap': '6px',
          } as React.CSSProperties
        }
        className={single ? 'pb-0' : 'pb-20'}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div
              className={`w-full flex flex-col items-center gap-6 lg:gap-8 pt-4 ${single ? 'pb-4 lg:pb-8' : 'pb-20 lg:pb-24'}`}
            >
              {/* Product logo */}
              <div className="relative h-24 lg:h-32 w-96 lg:w-[32rem] xl:h-48 z-10">
                <Image
                  src={product.logo}
                  alt={productName(product)}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 384px, 512px"
                />
              </div>

              {/* CTA — above mockup */}
              <DemoButton
                href={product.demoUrl}
                target="_blank"
                className="py-1 z-10"
              >
                {tHub('demoButton')}
              </DemoButton>

              {/* Mockup with mint stripe behind */}
              <div className="relative w-full">
                {/* Mockup */}
                <div className="relative max-w-4xl mx-auto aspect-video z-10">
                  <Image
                    src={product.mockup}
                    alt={`Mockup ${productName(product)}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 95vw, 896px"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lateral nav arrows — hint that slides can be swiped.
          Centered vertically on the mint stripe (47%–72% → 59.5%), above the edge gradients. */}
      {!single && (
        <div className="absolute inset-0 z-50 pointer-events-none px-1">
          <div className="relative h-full max-w-6xl mx-auto">
            <button
              type="button"
              aria-label={tHub('prevSlide')}
              onClick={() => swiperRef.current?.slidePrev()}
              className="pointer-events-auto absolute left-0 top-[59.5%] -translate-y-1/2 flex items-center justify-center p-2 rounded-full border-2 border-transparent text-white/90 hover:text-white hover:border-white/90 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft className="h-10 w-10" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label={tHub('nextSlide')}
              onClick={() => swiperRef.current?.slideNext()}
              className="pointer-events-auto absolute right-0 top-[59.5%] -translate-y-1/2 flex items-center justify-center p-2 rounded-full border-2 border-transparent text-white/90 hover:text-white hover:border-white/90 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <ChevronRight className="h-10 w-10" strokeWidth={2.25} />
            </button>
          </div>
        </div>
      )}

      {/* Mint stripe — full viewport width, behind mockup */}
      <div className="z-0 absolute top-0 left-0 right-0 w-full h-full bg-red-400/0 ">
        <div className="z-0 absolute w-screen left-0 right-0 top-[47%] bottom-[28%] bg-mint" />
      </div>

      <div className="z-40 absolute top-0 left-0 right-0 w-full h-full bg-red-400/0 pointer-events-none ">
        {/* Overlay gradient left side */}
        <div className="z-10 absolute top-0 left-0 bottom-0 w-[20%] xl:w-[25%] bg-linear-to-r from-black via-black/60 to-transparent" />
        {/* Overlay gradient right side */}
        <div className="z-10 absolute top-0 right-0 bottom-0 w-[20%] xl:w-[25%] bg-linear-to-l from-black via-black/60 to-transparent" />
      </div>
    </section>
  )
}
