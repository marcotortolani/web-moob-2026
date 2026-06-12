import type { ThemeContent } from './types'
import { getContentThemeStats } from '@/lib/stats'

export const musicaContent: ThemeContent = {
  hero: {
    title: 'Música',
    description:
      'Te acercamos a la música, a los artistas, a sus recitales y mucho más. ¡Llená tu vida de música!',
    banner: {
      video: 'https://vimeo.com/1164486647',
      videoFrame: '/images/contenido/musica/somos-musica-horizontal02.webp',
      imageH: [
        '/images/contenido/musica/somos-musica-horizontal01.webp',
        '/images/contenido/musica/somos-musica-horizontal02.webp',
      ],
      imageV: [
        '/images/contenido/musica/somos-musica-vertical01.webp',
        '/images/contenido/musica/somos-musica-vertical02.webp',
      ],
    },
    videoPosition: 'bottom-right',
  },
  stats: getContentThemeStats('Conocé nuestros productos de contenido exclusivo musical'),
  products: [
    {
      id: 'mundomusica',
      logo: '/images/contenido/musica/mundomusica-logo.webp',
      mockup: '/images/contenido/musica/mockup-mundomusica.webp',
      demoUrl: 'https://mundo-musica-test.vercel.app/',
      alt: 'Mundo Música',
    },
    {
      id: 'cdc',
      logo: '/images/contenido/musica/cdc-logo.webp',
      mockup: '/images/contenido/musica/mockup-cdc.webp',
      demoUrl: 'http://test.crucedecampeones.moob.club/',
      alt: 'Cruce de Campeones',
    },
  ],
}
