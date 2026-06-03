import { routing } from '@/i18n/routing'

/**
 * Registro de imágenes que cambian según el idioma (ej. capturas de pantalla con
 * texto adentro). Por cada `key`:
 * - `locales`: idiomas para los que EXISTE una variante subida.
 * - `base`: carpeta pública base.
 * - `ext`: extensión de archivo.
 * - `fallback`: idioma a usar cuando no hay match (default del registro).
 *
 * Convención de archivos: `public/<base>/<locale>.<ext>`
 *   ej. /images/localized/games-mockup/es.webp, /en.webp, /pt.webp
 */
export type LocalizedImageConfig = {
  locales: string[]
  base: string
  ext: string
  fallback: string
}

export const localizedImages = {
  'games-mockup': {
    // Solo `es` subida por ahora. Al subir en.webp / pt.webp, agregarlos acá.
    locales: ['es'],
    base: '/images/localized/games-mockup',
    ext: 'webp',
    fallback: 'es',
  },
} satisfies Record<string, LocalizedImageConfig>

export type LocalizedImageKey = keyof typeof localizedImages

/**
 * Resuelve la mejor imagen para un idioma con cadena de fallback:
 *   idioma exacto -> idioma base (pt-PT -> pt) -> fallback del registro -> primer disponible.
 *
 * Ejemplos:
 *   ('games-mockup', 'pt-PT') -> pt   (strip de región)
 *   ('games-mockup', 'de')    -> es   (sin variante -> fallback; si fuera 'en' default daría en)
 */
export function resolveLocalizedImage(
  key: LocalizedImageKey,
  locale: string,
): string {
  const cfg = localizedImages[key]
  const candidates = [
    locale,
    locale.split('-')[0],
    cfg.fallback,
    routing.defaultLocale,
    cfg.locales[0],
  ]
  const match = candidates.find((c) => cfg.locales.includes(c)) ?? cfg.locales[0]
  return `${cfg.base}/${match}.${cfg.ext}`
}
