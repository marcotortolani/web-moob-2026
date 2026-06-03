import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

/**
 * Wrappers de navegación que respetan `routing` (locales + pathnames localizados).
 * Usar estos en lugar de `next/link` y `next/navigation` en todo componente que
 * navegue entre páginas, para que las URLs salgan traducidas según el idioma activo.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
