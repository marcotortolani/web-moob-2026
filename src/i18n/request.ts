import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

// Los mensajes se dividen en un archivo core (`messages/<locale>.json`) + archivos
// por dominio (`messages/<locale>/<domain>.json`) para mantenerlos manejables.
const DOMAINS = ['content', 'catalog', 'services', 'forms'] as const

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` corresponde al segmento `[locale]` resuelto por el middleware.
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  const core = (await import(`../../messages/${locale}.json`)).default
  const domains = await Promise.all(
    DOMAINS.map((d) =>
      import(`../../messages/${locale}/${d}.json`).then((m) => m.default),
    ),
  )

  return {
    locale,
    messages: Object.assign({}, core, ...domains),
  }
})
