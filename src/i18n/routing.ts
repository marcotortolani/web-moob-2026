import { defineRouting } from 'next-intl/routing'

/**
 * Rutas internas (claves) = estructura real de carpetas bajo `app/[locale]`,
 * que se mantiene en español para minimizar movimientos de archivos.
 * Cada valor define la slug EXTERNA por idioma (lo que ve el usuario en la URL).
 *
 * `localePrefix: 'always'` => TODOS los idiomas muestran prefijo de locale
 * (/es, /en, /pt) + la slug traducida. Ej: /en/we-are-content/music,
 * /es/somos-contenido/musica, /pt/nosso-conteudo/musica. El ruteo y la detección
 * de idioma los maneja el middleware oficial de next-intl (`src/proxy.ts`).
 *
 * Las slugs de marca: "SOMOS" => "WE ARE" (en) / "NOSSO/NOSSA/NOSSOS/NOSSAS" (pt).
 */
export const pathnames = {
  '/': '/',

  '/join-us': {
    es: '/sumate',
    en: '/join-us',
    pt: '/junte-se',
  },

  '/somos-contenido': {
    es: '/somos-contenido',
    en: '/we-are-content',
    pt: '/nosso-conteudo',
  },
  '/somos-contenido/cocina': {
    es: '/somos-contenido/cocina',
    en: '/we-are-content/cooking',
    pt: '/nosso-conteudo/culinaria',
  },
  '/somos-contenido/educacion': {
    es: '/somos-contenido/educacion',
    en: '/we-are-content/education',
    pt: '/nosso-conteudo/educacao',
  },
  '/somos-contenido/fitness': {
    es: '/somos-contenido/fitness',
    en: '/we-are-content/fitness',
    pt: '/nosso-conteudo/fitness',
  },
  '/somos-contenido/gaming': {
    es: '/somos-contenido/gaming',
    en: '/we-are-content/gaming',
    pt: '/nosso-conteudo/gaming',
  },
  '/somos-contenido/kids': {
    es: '/somos-contenido/kids',
    en: '/we-are-content/kids',
    pt: '/nosso-conteudo/kids',
  },
  '/somos-contenido/lifestyle': {
    es: '/somos-contenido/lifestyle',
    en: '/we-are-content/lifestyle',
    pt: '/nosso-conteudo/lifestyle',
  },
  '/somos-contenido/musica': {
    es: '/somos-contenido/musica',
    en: '/we-are-content/music',
    pt: '/nosso-conteudo/musica',
  },
  '/somos-contenido/viajes': {
    es: '/somos-contenido/viajes',
    en: '/we-are-content/travel',
    pt: '/nosso-conteudo/viagens',
  },

  '/somos-eventos': {
    es: '/somos-eventos',
    en: '/we-are-events',
    pt: '/nossos-eventos',
  },
  '/somos-eventos/[slug]': {
    es: '/somos-eventos/[slug]',
    en: '/we-are-events/[slug]',
    pt: '/nossos-eventos/[slug]',
  },

  '/somos-experiencias': {
    es: '/somos-experiencias',
    en: '/we-are-experiences',
    pt: '/nossas-experiencias',
  },
  '/somos-experiencias/[slug]': {
    es: '/somos-experiencias/[slug]',
    en: '/we-are-experiences/[slug]',
    pt: '/nossas-experiencias/[slug]',
  },

  '/somos-juegos': {
    es: '/somos-juegos',
    en: '/we-are-games',
    pt: '/nossos-jogos',
  },

  '/somos-tecnologia': {
    es: '/somos-tecnologia',
    en: '/we-are-technology',
    pt: '/nossa-tecnologia',
  },
} as const

export const routing = defineRouting({
  locales: ['es', 'en', 'pt'],
  defaultLocale: 'es',
  localePrefix: 'always',
  localeCookie: { name: 'NEXT_LOCALE' },
  pathnames,
})

export type Locale = (typeof routing.locales)[number]
