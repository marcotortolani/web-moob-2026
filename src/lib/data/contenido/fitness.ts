import type { ThemeContent } from './types'

export const fitnessContent: ThemeContent = {
  hero: {
    title: 'Fitness',
    description:
      'Rutinas de entrenamiento personalizadas, planes de nutrición y consejos de bienestar diseñados para adaptarse a tu ritmo de vida y metas.',
    banner: {
      video: 'https://vimeo.com/1164768048',
      videoFrame:
        '/images/contenido/fitness/somosfitness-grilla-horizontal02.webp',
      imageH: '/images/contenido/fitness/somosfitness-grilla-horizontal01.webp',
      imageV: '/images/contenido/fitness/somosfitness-grilla-vertical01.webp',
    },
    videoPosition: 'bottom-right',
  },
  stats: {
    value: 1200,
    unit: 'HS',
    label: 'Contenido exclusivo',
    caption: 'Contenido de corta, mediana y larga duración',
    ctaText: 'Conocé nuestros productos de contenido exclusivo de fitness',
  },
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
