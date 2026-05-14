'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Keyboard, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { DemoButton } from '@/components/ui/demo-button'
import type { ThemeProduct } from '@/lib/data/contenido/types'

interface Props {
  products: ThemeProduct[]
}

export function ThemeProductsSlider({ products }: Props) {
  const single = products.length <= 1
  return (
    <section className="bg-black px-4 lg:px-6 pt-16 pb-16 lg:pb-24">
      <Swiper
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
              className={`flex flex-col items-center gap-8 lg:gap-10 pt-4 ${single ? 'pb-4 lg:pb-8' : 'pb-20 lg:pb-24'}`}
            >
              {/* Product logo — double size */}
              <div className="relative h-24 lg:h-32 w-96 lg:w-[32rem]">
                <Image
                  src={product.logo}
                  alt={product.alt ?? product.id}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 384px, 512px"
                />
              </div>

              {/* Product mockup */}
              <div className="relative w-full max-w-4xl aspect-video">
                <Image
                  src={product.mockup}
                  alt={`Mockup ${product.alt ?? product.id}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 95vw, 896px"
                />
              </div>

              {/* CTA */}
              <DemoButton
                href={product.demoUrl}
                target="_blank"
                className="text-white py-1"
              >
                VER DEMO
              </DemoButton>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
