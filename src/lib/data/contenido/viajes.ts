import type { ThemeContent } from './types'

export const viajesContent: ThemeContent = {
  hero: {
    title: 'Viajes',
    description:
      'Acompañá a nuestra comunidad de viajeros globales en una travesía sin filtros. Descubrí la esencia de cada cultura, paisajes que quitan el aliento y los secretos mejor guardados de cada rincón del planeta, contados por quienes los viven en primera persona.',
    banner: {
      video: 'https://vimeo.com/1163397256',
      videoFrame: '/images/contenido/viajes/somos-viajes-horizontal02.webp',
      imageH: [
        '/images/contenido/viajes/somos-viajes-horizontal01.webp',
        '/images/contenido/viajes/somos-viajes-horizontal02.webp',
      ],
      imageV: [
        '/images/contenido/viajes/somos-viajes-vertical01.webp',
        '/images/contenido/viajes/somos-viajes-vertical02.webp',
      ],
    },
    videoPosition: 'bottom-right',
  },
  stats: {
    value: 1200,
    unit: 'HS',
    label: 'Contenido exclusivo',
    caption: 'Contenido de corta, mediana y larga duración',
    ctaText: 'Conocé nuestros productos de contenido exclusivo de viajes',
  },
  products: [
    {
      id: 'queguayviajes',
      logo: '/images/contenido/viajes/queguayviajes-logo.webp',
      mockup: '/images/contenido/viajes/mockup-queguayviajes.webp',
      demoUrl: 'https://que-guay-viajes-test.vercel.app/',
      alt: 'Que Guay Viajes',
    },
    {
      id: 'travelvlog',
      logo: '/images/contenido/viajes/travelvlog-logo.webp',
      mockup: '/images/contenido/viajes/mockup-travelvlog.webp',
      demoUrl: 'https://travel-vlog-demo.vercel.app/',
      alt: 'TravelVlog',
    },
  ],
}
