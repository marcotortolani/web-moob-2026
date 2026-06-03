# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] — 2026-06-03

### Added
- **Internacionalización (i18n)** — migración completa a `next-intl` con locales es / en / pt
  - Rutas localizadas bajo `src/app/[locale]/` con slugs traducidas por idioma (`/es/somos-contenido`, `/en/we-are-content`, `/pt/nosso-conteudo`)
  - Middleware en `src/proxy.ts` con detección automática y cookie `NEXT_LOCALE`
  - Archivos de traducción en `messages/{es,en,pt}.json` + splits por dominio (content, catalog, services, forms)
  - Componente `LanguageSwitcher` en header y footer
  - Soporte de imágenes localizadas vía `LocalizedImage`
- **SEO completo**
  - `src/lib/seo.ts` — fuente única de `SITE_URL` + helpers `externalPath` / `getAlternates`
  - OG image dinámica con `next/og`: PNG 1200×630, logo de marca, wordmark en Bebas Neue, tagline traducida por locale
  - Twitter image (re-exporta la OG image)
  - `<link rel="canonical">` + `<link rel="alternate" hreflang>` en el `<head>` de las 17 rutas
  - JSON-LD structured data (`Organization` + `WebSite` schema.org) en el layout raíz
- **Nuevo favicon** — isotipo de Media Moob en 64×64, reemplaza el default de Vercel
- **Versión en footer** — la versión del paquete se muestra en el pie de página
- Secciones nuevas: `DemoButton`, `LocalizedImage`, `country-combobox` mejorado
- Galerías de detalle para eventos y experiencias

### Changed
- `src/app/robots.ts` y `src/app/sitemap.ts` refactorizados para usar `SITE_URL` de `@/lib/seo` (sin dominio hardcodeado)
- Emails transaccionales de contacto y join-us rediseñados
- Esquemas de validación `contact` y `join-us` actualizados
- Ajustes responsive generales en hero, stats, events, activations, games, tech, map, contact y footer

### Removed
- `public/og-image.jpg` — era un SVG de 443 bytes con extensión errónea que rompía las tarjetas en redes sociales
- Rutas planas `src/app/*` reemplazadas por `src/app/[locale]/*`

---

## [0.1.0] — 2026-04-01

### Added
- Setup inicial del proyecto Next.js con Tailwind CSS y shadcn/ui
- Estructura base de secciones: home, contenido, tecnología, eventos, experiencias, juegos
- Formularios de contacto y join-us con envío de emails vía Resend
- Sitemap y robots.txt iniciales
