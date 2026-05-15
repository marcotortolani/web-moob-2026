import type { ThemeContent } from './types'

export const cocinaContent: ThemeContent = {
  hero: {
    title: 'Cocina',
    description:
      'Recetas exclusivas, técnicas de chefs profesionales y secretos culinarios para transformar tus ingredientes cotidianos en platos extraordinarios.',
    banner: {
      video: 'https://vimeo.com/1163620608',
      videoFrame: '/images/contenido/cocina/somos-cocina-horizontal02.webp',
      imageH: [
        '/images/contenido/cocina/somos-cocina-horizontal01.webp',
        '/images/contenido/cocina/somos-cocina-horizontal02.webp',
      ],
      imageV: [
        '/images/contenido/cocina/somos-cocina-vertical01.webp',
        '/images/contenido/cocina/somos-cocina-vertical02.webp',
      ],
    },
    videoPosition: 'bottom-right',
  },
  stats: {
    value: 1200,
    unit: 'HS',
    label: 'Contenido exclusivo',
    caption: 'Contenido de corta, mediana y larga duración',
    ctaText: 'Conocé nuestros productos de contenido exclusivo de cocina',
  },
  products: [
    {
      id: 'locoporlacocina',
      logo: '/images/contenido/cocina/locoporlacocina-logo.webp',
      mockup: '/images/contenido/cocina/mockup-locoporlacocina.webp',
      demoUrl: 'https://loco-por-la-cocina-demo.vercel.app/',
      alt: 'Loco por la Cocina',
    },
  ],
}
