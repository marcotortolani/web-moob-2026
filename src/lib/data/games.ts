export interface Game {
  id: string
  title: string
  description: string
  icon: string // lucide icon name
  color: string
  mockupImage: string
  demoUrl?: string
}

export const games: Game[] = [
  {
    id: 'trivias',
    title: 'TRIVIAS',
    description:
      'Competencias de conocimiento en múltiples categorías. Los usuarios responden preguntas y acumulan puntos para ganar premios exclusivos de su operadora.',
    icon: 'HelpCircle',
    color: '#40b09d',
    mockupImage: '/images/games/trivia-tg-v3.png',
    demoUrl: 'https://trivia-v3-tg-movistar-ven-pwa.vercel.app/',
  },
  {
    id: 'memotest',
    title: 'MEMOTEST',
    description:
      'Juego de memoria clásico reinventado con contenido de marca. Encuentra los pares y desbloquea beneficios especiales para suscriptores.',
    icon: 'Grid2X2',
    color: '#40b09d',
    mockupImage: '/images/games/memotest-qgv.png',
    demoUrl: '',
  },
]
