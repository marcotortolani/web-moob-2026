# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] — 2026-06-09

### Fixed

- **Hydration mismatch (React #418)** — el lazy-load de Vimeo introducido en 1.0.3 inicializaba el estado `inView` con `typeof IntersectionObserver === 'undefined'`, que da `true` en el server y `false` en el cliente. En `EventsSlider` esto renderizaba el `<div>` del player en el server pero no en el cliente, rompiendo la hidratación. Ahora `inView` arranca en `false` en ambos (`BannerGridVideo` y `EventsSlider`) y el `IntersectionObserver` lo activa post-montaje

## [1.0.3] — 2026-06-09

Auditoría de Lighthouse (desktop, `memoob.com`): correcciones de accesibilidad y performance.

### Fixed

- **Accesibilidad — `link-name`** — los íconos sociales (Instagram/LinkedIn en header desktop, menú mobile y footer) no tenían nombre accesible; se agregó `aria-label`. De paso, los 4 `<a>` del header tenían `href="{socialLinks.x}"` **literal sin interpolar** (links rotos) → corregidos a `href={socialLinks.x}`
- **Accesibilidad — `label-content-name-mismatch`** — se quitaron los `aria-label` hardcodeados que no coincidían con el texto visible: `map-hover-preview.tsx` y el link de dirección mobile del footer (estaban en español fijo en un sitio trilingüe) ahora usan la dirección visible; el botón de `language-switcher` incluye el código de idioma visible (`ES`/`EN`/`PT`) en su `aria-label`
- **Accesibilidad — `color-contrast`** — los CTAs sobre fondo `mint` pasan a **texto negro** (7.91:1) en lugar de blanco (2.65:1, fallaba AA): `DemoButton` de contenido/tecnología/eventos/activaciones/juegos, banda de marcas y botones de `game-showcase`/`contenido-slide`/`contenido-hero`. El verde de marca `#40b09d` queda **intacto**. Los grises muteados (`text-white/20|30|40`) suben a `text-white/50` para cumplir AA (placeholders de inputs sin cambios)

### Changed

- **Hero video — peso y carga** — `public/videos/home-hero.mp4` recomprimido de **9.5 MB a 2.7 MB**; el `<video>` de fondo se monta en `requestIdleCallback` (post-hidratación) con `preload="metadata"` en vez de `auto`, para que su descarga no compita con el LCP (la imagen `priority` se pinta primero)
- **Players de Vimeo — lazy-load** — `BannerGridVideo` (×3 en el home) y `EventsSlider` montaban `react-player` apenas se renderizaban, buffereando su video aunque estuvieran fuera de pantalla (~26 MB iniciales). Ahora se montan recién al entrar al viewport (`IntersectionObserver`); hasta entonces se ve el poster. Esto además **difiere las cookies de terceros** de Vimeo (Best Practices)
- **`BannerGridVideo` — `priority` opt-in** — las imágenes del grid tenían `priority` hardcodeado en las 3 instancias del home; ahora es una prop activada solo en `content-section` (cercana al fold). Tech y activaciones cargan lazy, evitando que ~6 imágenes bajo el fold compitan con el LCP

## [1.0.2] — 2026-06-09

### Added

- **`src/app/icon.svg`** — ícono SVG vectorial del logo de Media Moob; Next.js lo registra como `<link rel="icon" type="image/svg+xml">` en el `<head>`, mejorando la calidad del favicon en Google Search y en tabs de alta resolución
- **`src/app/apple-icon.tsx`** — ícono 180×180 generado con `ImageResponse`; Next.js emite `<link rel="apple-touch-icon">` para iOS y previews de compartido
- **`src/app/manifest.ts`** — web manifest con nombre, colores de marca (`#000000`) e íconos; habilita "Agregar al inicio" y da contexto de marca a motores de búsqueda

## [1.0.1] — 2026-06-03

### Fixed

- **OG image — font en `public/fonts/`** — la fuente Bebas Neue se leía de `node_modules/` en runtime; movida a `public/fonts/` para garantizar su inclusión en el bundle serverless de Vercel
- **`externalPath()` — warn para claves desconocidas** — en desarrollo, la función ahora emite `console.warn` si se pasa una clave que no existe en `pathnames`, evitando canonical/hreflang incorrectos silenciosos
- **Imágenes del slider de marcas** — corregido warning de Next.js Image sobre aspect ratio (`width={0} height={0}` + `sizes` en lugar de dimensiones fijas)
- **Dominio canónico** — corregido typo `mediamoob.com` → `memoob.com` en `src/lib/seo.ts`

### Changed

- **`src/lib/data/social.ts`** — URLs de Instagram y LinkedIn extraídas a fuente única; header, footer y JSON-LD las consumen desde este archivo
- **`opengraph-image.tsx`** — `readFileSync` del logo y la fuente movidos al module scope; se ejecutan una sola vez por instancia de función en lugar de en cada request
- **`src/lib/theme-page.tsx`** — helper compartido para los 8 pages de contenido temático (`generateThemeMetadata` + `ThemePage`); cada page reducido de ~55 a ~15 líneas
- **`layout.tsx`** — eliminado `alternates` redundante sobreescrito por `page.tsx`

---

## [1.0.0] — 2026-06-03

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
