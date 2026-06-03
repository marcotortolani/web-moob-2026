'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('Tech')
  const tc = useTranslations('Common')
  const ts = useTranslations('TechServices')
  return (
    <section
      className="w-full max-w-[1728px] mx-auto bg-black py-8 lg:py-20"
      id="tecnologia"
    >
      <div className=" relative w-full xl:max-w-6xl xl:mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="z-50 absolute top-0 xl:top-[unset] xl:bottom-0 xl:flex xl:items-end xl:justify-around xl:px-0 w-full py-4 2xl:py-10 -translate-y-14 bg-linear-to-b from-black via-black to-transparent xl:bg-linear-to-t xl:translate-y-10"
        >
          <SectionHeading
            label={tc('We are')}
            title={t('title')}
            align="center"
            className="flex-col justify-center gap-0 lg:min-w-75 xl:items-start "
            titleClassName="text-5xl md:text-6xl xl:text-5xl 2xl:text-6xl"
          />
          <p className=" hidden xl:block text-white/80 text-left text-pretty xl:text-lg leading-4 xl:leading-5 max-w-2xl ">
            {t.rich('description', {
              b: (chunks) => (
                <span className="font-bold text-mint">{chunks}</span>
              ),
            })}
          </p>
        </motion.div>

        <BannerGridVideo items={GRID_ITEMS} videoPosition="bottom-left" />

        <div className="xl:hidden z-50 absolute -bottom-5 translate-y-4 w-full mx-auto px-5 lg:px-16 xl:px-24 bg-linear-to-t from-black via-black to-transparent">
          <p className="text-white/80 text-pretty text-xs md:text-base lg:text-lg leading-4 mt-3 lg:mt-6 max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto">
            {t.rich('description', {
              b: (chunks) => (
                <span className="font-bold text-mint">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </div>

      <div className="relative mt-20 px-5 lg:px-16 xl:px-24">
        <div className="w-full xl:max-w-6xl xl:mx-auto flex justify-between gap-2 md:gap-4 lg:gap-6">
          {services.map(({ id, icon }, i) => {
            const label = ts(`${id}.label`)
            return (
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
                className="relative w-10 h-10 min-[375px]:w-14 min-[375px]:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 p-2 min-[375px]:p-3 lg:p-4 rounded-full bg-mint overflow-hidden cursor-pointer shrink-0"
              >
                <Image
                  src={icon}
                  alt={label}
                  className="w-full h-full"
                  width={80}
                  height={80}
                />
              </motion.div>
              <span className="text-white text-[9px] min-[375px]:text-sm md:text-base lg:text-lg text-center font-display font-medium uppercase tracking-wide leading-tight">
                {label}
              </span>
            </motion.div>
            )
          })}
        </div>

        <div className="mt-8 lg:mt-14 xl:mt-20 flex justify-center">
          <DemoButton
            href="/somos-tecnologia"
            className="text-white tracking-tight"
          >
            {t('cta')}
          </DemoButton>
        </div>
      </div>
    </section>
  )
}
