import type { ThemeContent } from './types'
import { getContentThemeStats } from '@/lib/stats'

export const kidsContent: ThemeContent = {
  hero: {
    title: 'Kids',
    description:
      'Contenido seguro y creativo para los más pequeños, con actividades educativas, juegos interactivos y mucha imaginación.',
    banner: {
      video: 'https://vimeo.com/1167365720',
      videoFrame: '/images/contenido/kids/somos-kids-horizontal02.webp',
      imageH: [
        '/images/contenido/kids/somos-kids-horizontal01.webp',
        '/images/contenido/kids/somos-kids-horizontal02.webp',
      ],
      imageV: [
        '/images/contenido/kids/somos-kids-vertical01.webp',
        '/images/contenido/kids/somos-kids-vertical02.webp',
      ],
    },
    videoPosition: 'bottom-right',
  },
  stats: getContentThemeStats('Conocé nuestros productos de contenido exclusivo para kids'),
  products: [
    {
      id: 'elreinoinfantil',
      logo: '/images/contenido/kids/elreinoinfantil-logo.webp',
      mockup: '/images/contenido/kids/mockup-el-reino-infantil.webp',
      demoUrl: 'http://test.granjazenon.moob.club/',
      alt: 'El Reino Infantil',
    },
  ],
}
