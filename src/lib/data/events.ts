export interface Event {
  slug: string
  title: string
  shortTitle: string
  description: string
  coverImage: string | null
  images: string[]
  videoUrl: string
  detailVideoUrl: string
  logoSrc?: string
}

export const events: Event[] = [
  {
    slug: 'club-media-fest',
    title: 'Club Media Fest',
    shortTitle: 'CLUB\nMEDIA FEST',
    description:
      'Primer festival internacional que presenta a los youtubers/influencers. Más de 30 artistas en escena. 2 escenarios. Sets de música, dj set, desafios, paneles, meet & greet, desfiles, humor, belleza.',
    coverImage: '/images/home/slider-eventos/cmf-evento.webp',
    images: [
      '/images/events/club-media-fest/evento-CMF-horizontal01.webp',
      '/images/events/club-media-fest/evento-CMF-horizontal02.webp',
      '/images/events/club-media-fest/evento-CMF-vertical01.webp',
      '/images/events/club-media-fest/evento-CMF-vertical02.webp',
    ],
    videoUrl: 'https://vimeo.com/1166470745',
    detailVideoUrl: 'https://vimeo.com/854794539',
    logoSrc: '/images/logos-eventos/evento-cmf.webp',
  },
  {
    slug: 'cruce-de-campeones',
    title: 'Cruce de Campeones',
    shortTitle: 'CRUCE DE\nCAMPEONES',
    description:
      'Cruce de campeones reúne a los máximos exponentes del Freestyle en Español, en un evento donde los artistas compiten para llegar a una gran final donde puede coronarse.',
    coverImage: '/images/home/slider-eventos/cdc-evento.webp',
    images: [
      '/images/events/cruce-de-campeones/evento-CDC-horizontal01.webp',
      '/images/events/cruce-de-campeones/evento-CDC-horizontal02.webp',
      '/images/events/cruce-de-campeones/evento-CDC-vertical01.webp',
      '/images/events/cruce-de-campeones/evento-CDC-vertical02.webp',
    ],
    videoUrl: 'https://vimeo.com/1166471021',
    detailVideoUrl: 'https://vimeo.com/868088810',
    logoSrc: '/images/logos-eventos/evento-cdc.webp',
  },
  {
    slug: 'personal-fest',
    title: 'Personal Fest',
    shortTitle: 'PERSONAL\nFEST',
    description:
      'El Personal Fest fue uno de los festivales de música más importantes de Argentina, realizado principalmente en Buenos Aires. Organizado por la empresa de telefonía Personal, se destacó por reunir artistas internacionales de primera línea (rock, pop, electrónica) con bandas locales en múltiples escenarios.',
    coverImage: '/images/home/slider-eventos/personal-fest-evento.webp',
    images: [
      '/images/events/personal-fest/evento-PersonalFest-horizontal01.webp',
      '/images/events/personal-fest/evento-PersonalFest-horizontal02.webp',
      '/images/events/personal-fest/evento-PersonalFest-vertical01.webp',
      '/images/events/personal-fest/evento-PersonalFest-vertical02.webp',
    ],
    videoUrl: 'https://vimeo.com/1166471396',
    detailVideoUrl: 'https://vimeo.com/301844864',
    logoSrc: '/images/logos-eventos/evento-personal-fest.webp',
  },
  {
    slug: 'copa-goals',
    title: 'Copa Goals',
    shortTitle: 'COPA\nGOALS',
    description:
      '"Goals" es un evento vinculado al gaming amateur, en el cual miles de chicos tuvieron la oportunidad de jugar por cumplir un sueño: el de jugar junto a sus ídolos el día del evento.',
    coverImage: '/images/home/slider-eventos/copa-goals-evento.webp',
    images: [
      '/images/events/copa-goals/evento-GOALS-horizontal01.webp',
      '/images/events/copa-goals/evento-GOALS-horizontal02.webp',
      '/images/events/copa-goals/evento-GOALS-vertical01.webp',
      '/images/events/copa-goals/evento-GOALS-vertical02.webp',
    ],
    videoUrl: 'https://vimeo.com/1167369709',
    detailVideoUrl: 'https://vimeo.com/475845175',
    logoSrc: '/images/logos-eventos/evento-copa-goals.webp',
  },
  {
    slug: 'comic-con',
    title: 'Comic Con',
    shortTitle: 'COMIC\nCON',
    description:
      'Comic Con es la principal convención de cultura pop, que reúne a fans de cómics, anime, cine, videojuegos y cosplay en un espacio único.',
    coverImage: '/images/home/slider-eventos/comiccon-evento.webp',
    images: [
      '/images/events/comic-con/evento-comiccon-horizontal01.webp',
      '/images/events/comic-con/evento-comiccon-horizontal02.webp',
      '/images/events/comic-con/evento-comiccon-vertical01.webp',
      '/images/events/comic-con/evento-comiccon-vertical02.webp',
    ],
    videoUrl: 'https://vimeo.com/1167497056',
    detailVideoUrl: 'https://vimeo.com/1078364118',
    logoSrc: '/images/logos-eventos/evento-comicon.webp',
  },
  {
    slug: 'unkla-cup',
    title: 'Unkla Cup — Team Gamers',
    shortTitle: 'UNKLA CUP\nTEAM GAMERS',
    description:
      'Copa UNKLA / Team Gamers. Planificación, Desarrollo y Ejecución de Torneo de Gaming.',
    coverImage: '/images/home/slider-eventos/unklacup-evento.webp',
    images: [
      '/images/events/unkla-cup/evento-unklacup-horizontal01.webp',
      '/images/events/unkla-cup/evento-unklacup-horizontal02.webp',
      '/images/events/unkla-cup/evento-unklacup-vertical01.webp',
      '/images/events/unkla-cup/evento-unklacup-vertical02.webp',
    ],
    videoUrl: 'https://vimeo.com/1167462693',
    detailVideoUrl: 'https://vimeo.com/1098626343',
    logoSrc: '/images/logos-eventos/evento-copa-unkla.webp',
  },
]

export const EVENTS_PER_PAGE = 6
