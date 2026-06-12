import type { ThemeContent } from './types'
import { getContentThemeStats } from '@/lib/stats'

export const lifestyleContent: ThemeContent = {
  hero: {
    title: 'Lifestyle',
    description:
      'Tendencias en diseño, bienestar mental y consejos prácticos para elevar tu día a día y encontrar el equilibrio perfecto.',
    banner: {
      video: 'https://vimeo.com/1164480977',
      videoFrame:
        '/images/contenido/lifestyle/somos-lifestyle-horizontal02.webp',
      imageH: [
        '/images/contenido/lifestyle/somos-lifestyle-horizontal01.webp',
        '/images/contenido/lifestyle/somos-lifestyle-horizontal02.webp',
      ],
      imageV: [
        '/images/contenido/lifestyle/somos-lifestyle-vertical01.webp',
        '/images/contenido/lifestyle/somos-lifestyle-vertical02.webp',
      ],
    },
    videoPosition: 'bottom-right',
  },
  stats: getContentThemeStats('Conocé nuestros productos de contenido exclusivo de lifestyle'),
  products: [
    {
      id: 'epamujer',
      logo: '/images/contenido/lifestyle/epamujer-logo.webp',
      mockup: '/images/contenido/lifestyle/mockup-epamujer.webp',
      demoUrl: 'https://epa-mujer-demo.vercel.app/',
      alt: 'Epa Mujer',
    },
    {
      id: 'allforher',
      logo: '/images/contenido/lifestyle/allforher-logo.webp',
      mockup: '/images/contenido/lifestyle/mockup-allforher.webp',
      demoUrl: '#',
      alt: 'All For Her',
    },
  ],
}
