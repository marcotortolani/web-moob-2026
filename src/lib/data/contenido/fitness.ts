import type { ThemeContent } from './types'
import { getContentThemeStats } from '@/lib/stats'

export const fitnessContent: ThemeContent = {
  hero: {
    title: 'Fitness',
    description:
      'Rutinas de entrenamiento personalizadas, planes de nutrición y consejos de bienestar diseñados para adaptarse a tu ritmo de vida y metas.',
    banner: {
      video: 'https://vimeo.com/1164768048',
      videoFrame:
        '/images/contenido/fitness/somosfitness-grilla-horizontal02.webp',
      imageH: [
        '/images/contenido/fitness/somosfitness-grilla-horizontal01.webp',
        '/images/contenido/fitness/somosfitness-grilla-horizontal02.webp',
      ],
      imageV: [
        '/images/contenido/fitness/somosfitness-grilla-vertical01.webp',
        '/images/contenido/fitness/somosfitness-grilla-vertical02.webp',
      ],
    },
    videoPosition: 'bottom-right',
  },
  stats: getContentThemeStats('Conocé nuestros productos de contenido exclusivo de fitness'),
  products: [
    {
      id: 'totalfitness',
      logo: '/images/contenido/fitness/totalfitness-logo.webp',
      mockup: '/images/contenido/fitness/mockup-total-fitness.webp',
      demoUrl: 'https://total-fitness-test.vercel.app/',
      alt: 'Total Fitness',
    },
  ],
}
