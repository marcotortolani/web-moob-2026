import type { ThemeContent } from './types'

export const educacionContent: ThemeContent = {
  hero: {
    title: 'Educación',
    description:
      'Enseñamos a dominar nuevas habilidades y potenciar tu crecimiento personal o profesional.',
    banner: {
      video: 'https://vimeo.com/1164767378',
      videoFrame:
        '/images/contenido/educacion/somos-educacion-horizontal02.webp',
      imageH: [
        '/images/contenido/educacion/somos-educacion-horizontal01.webp',
        '/images/contenido/educacion/somos-educacion-horizontal02.webp',
      ],
      imageV: [
        '/images/contenido/educacion/somos-educacion-vertical01.webp',
        '/images/contenido/educacion/somos-educacion-vertical02.webp',
      ],
    },
    videoPosition: 'bottom-right',
  },
  stats: {
    value: 1200,
    unit: 'HS',
    label: 'Contenido exclusivo',
    caption: 'Contenido de corta, mediana y larga duración',
    ctaText: 'Conocé nuestros productos de contenido exclusivo educativo',
  },
  products: [
    {
      id: 'flexflix',
      logo: '/images/contenido/educacion/flexflix-logo.webp',
      mockup: '/images/contenido/educacion/mockup-flexflix.webp',
      demoUrl: 'http://es.test.flexflix.moob.club/',
      alt: 'Flexflix',
    },
  ],
}
