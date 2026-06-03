# Changelog

## [Unreleased]

### feat: internacionalización (i18n) — es / en / pt

- Migración completa de `src/app/*` a `src/app/[locale]/*` con `next-intl`
- Locales: español (es, default), inglés (en), portugués (pt)
- `localePrefix: 'always'` — todas las rutas llevan prefijo de idioma (`/es`, `/en`, `/pt`)
- Slugs traducidas por idioma definidas en `src/i18n/routing.ts` (pathnames)
- Middleware en `src/proxy.ts` con detección automática y cookie `NEXT_LOCALE`
- Archivos de traducción en `messages/{es,en,pt}.json` + splits por dominio (`content`, `catalog`, `services`, `forms`)
- Componente `LanguageSwitcher` en header y footer
- Imágenes localizadas en `public/images/localized/`

### feat: SEO

- **`src/lib/seo.ts`** — fuente única de verdad para el dominio (`SITE_URL`) y helpers `externalPath` / `getAlternates`; elimina el dominio hardcodeado que existía en 3 archivos
- **OG image dinámica** — `src/app/[locale]/opengraph-image.tsx` genera un PNG 1200×630 con `next/og`: logo de marca, wordmark "MEDIA MOOB" en Bebas Neue (blanco + mint), tagline traducida por locale
- **Twitter image** — `src/app/[locale]/twitter-image.tsx` re-exporta la misma imagen
- **`public/og-image.jpg` eliminado** — era un SVG de 443 bytes con extensión errónea; las tarjetas de redes sociales quedaban rotas
- **Canonical + hreflang en `<head>`** — `alternates: getAlternates(key, locale)` en los 17 `page.tsx` de la app; los 3 locales quedan correctamente enlazados en cada URL
- **JSON-LD structured data** — `src/components/seo/json-ld.tsx` inyecta `Organization` + `WebSite` schema.org en el layout raíz
- `src/app/robots.ts` y `src/app/sitemap.ts` refactorizados para usar `SITE_URL` de `@/lib/seo`
- `<html lang={locale}>` dinámico ya estaba en el layout localizado

### feat: nuevo favicon

- Reemplazado el favicon por defecto de Vercel por el isotipo de Media Moob (`src/app/favicon.ico`, 64×64)

### feat: responsive & componentes

- Ajustes responsive en hero, stats, events, activations, games, tech, map, contact, footer
- Secciones de contenido temático (música, cocina, educación, fitness, gaming, kids, lifestyle, viajes) actualizadas
- Galerías de detalle para eventos y experiencias
- `JoinUsSection` reescrita con `country-combobox` y esquemas de validación actualizados (`src/lib/schemas/`)
- Emails transaccionales de contacto y join-us rediseñados (`src/emails/`)
- Componente `DemoButton` agregado
- Componente `LocalizedImage` para imágenes con variantes por locale

### chore

- Instalado `@fontsource/bebas-neue` para uso en `next/og` (WOFF sin WOFF2)
- `next-intl` agregado como dependencia principal
