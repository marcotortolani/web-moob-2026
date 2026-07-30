import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

/**
 * Proxy de i18n (Next.js 16 usa `proxy.ts`, no `middleware.ts`).
 *
 * Con `localePrefix: 'always'` el middleware oficial de next-intl maneja todo:
 * - Detecta el idioma en `/` (cookie NEXT_LOCALE -> Accept-Language -> default) y
 *   redirige a `/{locale}`.
 * - Resuelve las slugs traducidas por idioma (pathnames) con prefijo de locale,
 *   ej. /en/we-are-content/music. Si la slug no corresponde al locale, redirige a
 *   la canónica de ese idioma.
 *
 * `/co-tyc` queda excluida del matcher: es una página legal de cumplimiento
 * para Claro Colombia, sin i18n, que vive fuera del árbol `[locale]`.
 */
export default createMiddleware(routing)

export const config = {
  // Excluir api, /co-tyc (página legal sin i18n para Claro Colombia), internals
  // de Next y archivos con punto (assets, sitemap.xml, etc.)
  matcher: '/((?!api|co-tyc|_next|_vercel|.*\\..*).*)',
}
