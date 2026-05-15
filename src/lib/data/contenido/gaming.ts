import type { ThemeContent } from './types'

export const gamingContent: ThemeContent = {
  hero: {
    title: 'Gaming',
    description:
      'Videos exclusivos de referentes especializados y las últimas tendencias del mundo digital antes que nadie.',
    banner: {
      video: 'https://vimeo.com/1164096962',
      videoFrame: '/images/contenido/gaming/somos-gaming-horizontal02.webp',
      imageH: [
        '/images/contenido/gaming/somos-gaming-horizontal01.webp',
        '/images/contenido/gaming/somos-gaming-horizontal02.webp',
      ],
      imageV: [
        '/images/contenido/gaming/somos-gaming-vertical01.webp',
        '/images/contenido/gaming/somos-gaming-vertical02.webp',
      ],
    },
    videoPosition: 'bottom-right',
  },
  stats: {
    value: 1200,
    unit: 'HS',
    label: 'Contenido exclusivo',
    caption: 'Contenido de corta, mediana y larga duración',
    ctaText: 'Conocé nuestros productos de contenido exclusivo de gaming',
  },
  products: [
    {
      id: 'teamgamers',
      logo: '/images/contenido/gaming/teamgamers-logo.webp',
      mockup: '/images/contenido/gaming/mockup-teamgamers.webp',
      demoUrl: 'https://team-gamers-demo.vercel.app/',
      alt: 'Team Gamers',
    },
    {
      id: 'esportspace',
      logo: '/images/contenido/gaming/esportspace-logo.webp',
      mockup: '/images/contenido/gaming/mockup-esportspace.webp',
      demoUrl: 'https://esports-space-demo.vercel.app/',
      alt: 'eSportSpace',
    },
  ],
}
