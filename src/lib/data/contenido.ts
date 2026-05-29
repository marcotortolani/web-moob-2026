export type ContenidoSlide = {
  slug: string
  title: string
  description: string
  vimeoId: string
  frame: string
  card?: string
  tagline?: { lead: string; highlight: string }
  heroVimeoId?: string
  heroFrame?: string
  productsLabel?: string
}

export const contenidoSlides: ContenidoSlide[] = [
  {
    slug: 'cocina',
    title: 'COCINA',
    description:
      'Recetas exclusivas, técnicas de chefs profesionales y secretos culinarios para transformar tus ingredientes cotidianos en platos extraordinarios.',
    vimeoId: '1193698178',
    frame: '/images/contenido/cocina-frame.webp',
    card: '/images/home/slider-contenido/carrousel-cat-cocina.webp',
    tagline: {
      lead: 'Te llevamos a la cocina, a los chefs, a las recetas y mucho más.',
      highlight: '¡Llená tu vida de sabor!',
    },
    heroVimeoId: '1163620608',
    heroFrame: '/images/contenido/cocina/somos-cocina-horizontal02.webp',
    productsLabel: 'culinarios',
  },
  {
    slug: 'gaming',
    title: 'GAMING',
    description:
      'Videos exclusivos de referentes especializados y las últimas tendencias del mundo digital antes que nadie.',
    vimeoId: '1193698438',
    frame: '/images/contenido/gamers-frame.webp',
    card: '/images/home/slider-contenido/carrousel-cat-gaming.webp',
    tagline: {
      lead: 'Te metemos en el juego, los referentes, las tendencias y mucho más.',
      highlight: '¡Llená tu vida de juego!',
    },
    heroVimeoId: '1164096962',
    heroFrame: '/images/contenido/gaming/somos-gaming-horizontal02.webp',
    productsLabel: 'gamers',
  },
  {
    slug: 'viajes',
    title: 'VIAJES',
    description:
      'Acompañá a nuestra comunidad de viajeros globales en una travesía sin filtros. Descubrí la esencia de cada cultura, paisajes que quitan el aliento y los secretos mejor guardados de cada rincón del planeta, contados por quienes los viven en primera persona.',
    vimeoId: '1193697937',
    frame: '/images/contenido/viajes-frame.webp',
    card: '/images/home/slider-contenido/carrousel-cat-viajes.webp',
    tagline: {
      lead: 'Te llevamos a destinos, culturas, paisajes y mucho más.',
      highlight: '¡Llená tu vida de aventuras!',
    },
    heroVimeoId: '1163397256',
    heroFrame: '/images/contenido/viajes/somos-viajes-horizontal02.webp',
    productsLabel: 'de viajes',
  },
  {
    slug: 'fitness',
    title: 'FITNESS',
    description:
      'Rutinas de entrenamiento personalizadas, planes de nutrición y consejos de bienestar diseñados para adaptarse a tu ritmo de vida y metas.',
    vimeoId: '1193699056',
    frame: '/images/contenido/fitness-frame.webp',
    card: '/images/home/slider-contenido/carrousel-cat-fitness.webp',
    tagline: {
      lead: 'Te sumamos rutinas, energía, hábitos saludables y mucho más.',
      highlight: '¡Llená tu vida de energía!',
    },
    heroVimeoId: '1164768048',
    heroFrame: '/images/contenido/fitness/somosfitness-grilla-horizontal02.webp',
    productsLabel: 'fitness',
  },
  {
    slug: 'kids',
    title: 'KIDS',
    description:
      'Contenido seguro y creativo para los más pequeños, con actividades educativas, juegos interactivos y mucha imaginación.',
    vimeoId: '1193699173',
    frame: '/images/contenido/kids-frame.webp',
  },
  {
    slug: 'educacion',
    title: 'EDUCACIÓN',
    description:
      'Enseñamos a dominar nuevas habilidades y potenciar tu crecimiento personal o profesional.',
    vimeoId: '1193698977',
    frame: '/images/contenido/educacion-frame.webp',
  },
  {
    slug: 'musica',
    title: 'MÚSICA',
    description:
      'Referentes de la música creando contenido exclusivo. Descubrí el detrás de escena con tus artistas y géneros preferidos.',
    vimeoId: '1193698825',
    frame: '/images/contenido/musica-frame.webp',
    card: '/images/home/slider-contenido/carrousel-cat-musica.webp',
    tagline: {
      lead: 'Te acercamos a la música, a los artistas, a sus recitales y mucho más.',
      highlight: '¡Llená tu vida de música!',
    },
    heroVimeoId: '1164486647',
    heroFrame: '/images/contenido/musica/somos-musica-horizontal02.webp',
    productsLabel: 'musicales',
  },
  {
    slug: 'lifestyle',
    title: 'LIFESTYLE',
    description:
      'Tendencias en diseño, bienestar mental y consejos prácticos para elevar tu día a día y encontrar el equilibrio perfecto.',
    vimeoId: '1193698688',
    frame: '/images/contenido/lifestyle-frame.webp',
    card: '/images/home/slider-contenido/carrousel-cat-lifestyle.webp',
    tagline: {
      lead: 'Te conectamos con las tendencias, el bienestar y mucho más.',
      highlight: '¡Llená tu vida de estilo!',
    },
    heroVimeoId: '1164480977',
    heroFrame: '/images/contenido/lifestyle/somos-lifestyle-horizontal02.webp',
    productsLabel: 'de lifestyle',
  },
]

// ─── Hero categories (lg+ desktop view) ───────────────────────────────────────
// Ordered subset of the 6 categories that have card images + taglines.
export const heroCategoryOrder = [
  'cocina',
  'musica',
  'lifestyle',
  'fitness',
  'viajes',
  'gaming',
] as const

export const heroCategories = heroCategoryOrder.map(
  (slug) => contenidoSlides.find((s) => s.slug === slug)!,
)
