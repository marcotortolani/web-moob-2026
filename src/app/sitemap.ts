import { MetadataRoute } from 'next'
import { activations } from '@/lib/data/activations'
import { events } from '@/lib/data/events'
import { contenidoSlides } from '@/lib/data/contenido'
import { routing, pathnames } from '@/i18n/routing'
import { externalPath } from '@/lib/seo'

type InternalKey = keyof typeof pathnames

/** Entrada de sitemap con la URL en español (canónica) + alternates hreflang. */
function entry(
  key: InternalKey,
  opts: {
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
    priority: number
    slug?: string
  },
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {}
  for (const locale of routing.locales) {
    languages[locale] = externalPath(key, locale, opts.slug)
  }
  return {
    url: externalPath(key, routing.defaultLocale, opts.slug),
    lastModified: new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    entry('/', { changeFrequency: 'weekly', priority: 1 }),
    entry('/somos-contenido', { changeFrequency: 'monthly', priority: 0.8 }),
    entry('/somos-tecnologia', { changeFrequency: 'monthly', priority: 0.8 }),
    entry('/somos-eventos', { changeFrequency: 'weekly', priority: 0.8 }),
    entry('/somos-experiencias', { changeFrequency: 'weekly', priority: 0.8 }),
    entry('/somos-juegos', { changeFrequency: 'monthly', priority: 0.8 }),
  ]

  const contenidoRoutes: MetadataRoute.Sitemap = contenidoSlides.map((s) =>
    entry(`/somos-contenido/${s.slug}` as InternalKey, {
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
  )

  const activationRoutes: MetadataRoute.Sitemap = activations.map((a) =>
    entry('/somos-experiencias/[slug]', {
      changeFrequency: 'monthly',
      priority: 0.6,
      slug: a.slug,
    }),
  )

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) =>
    entry('/somos-eventos/[slug]', {
      changeFrequency: 'monthly',
      priority: 0.6,
      slug: e.slug,
    }),
  )

  return [...staticRoutes, ...contenidoRoutes, ...activationRoutes, ...eventRoutes]
}
