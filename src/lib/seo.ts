import { type Metadata } from 'next'
import { pathnames, routing } from '@/i18n/routing'

/** Canonical domain — single source of truth. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://memoob.com'

/**
 * Builds a fully-qualified URL for a given pathname key, locale, and optional
 * dynamic slug. E.g. '/somos-eventos/[slug]' + 'en' + 'moob-fest' →
 * 'https://memoob.com/en/we-are-events/moob-fest'
 */
export function externalPath(
  key: string,
  locale: string,
  slug?: string,
): string {
  const entry = (pathnames as Record<string, string | Record<string, string>>)[key]
  if (!entry && process.env.NODE_ENV === 'development') {
    console.warn(`[seo] unknown pathname key: "${key}" — canonical will default to "/"`)
  }
  let ext: string = entry
    ? typeof entry === 'string'
      ? entry
      : entry[locale] ?? '/'
    : '/'
  if (slug) ext = ext.replace('[slug]', slug)
  return `${SITE_URL}/${locale}${ext === '/' ? '' : ext}`
}

/**
 * Returns a `Metadata['alternates']` object with:
 * - `canonical`: the URL for the current locale.
 * - `languages`: a map of all locales → their respective URLs.
 *
 * Drop this directly into any `generateMetadata` return value.
 */
export function getAlternates(
  key: string,
  locale: string,
  slug?: string,
): Metadata['alternates'] {
  const languages: Record<string, string> = {}
  for (const l of routing.locales) {
    languages[l] = externalPath(key, l, slug)
  }
  return {
    canonical: externalPath(key, locale, slug),
    languages,
  }
}
