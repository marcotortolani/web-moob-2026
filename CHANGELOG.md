# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.12] — 2026-06-12

Centralización de todos los datos de estadísticas del sitio en `src/lib/stats.ts`. Los números ya no están hardcodeados en cada componente o archivo de datos — se calculan dinámicamente a partir de una fecha base y tasas de crecimiento configurables. El stat de suscriptores actualiza el número en pantalla en tiempo real cada ~12 segundos.

### Added

- **`src/lib/stats.ts` — utilidad central de estadísticas** — fuente única de verdad para los tres stats del sitio (`contentHours`, `subscribers`, `yearsExperience`). Cada stat tiene un `BASE` (valor al `GROWTH_START_MS`) y un `RATE_PER_MS` (tasa de crecimiento por milisegundo). `getStatValue(key)` devuelve el valor actual; `getTickInterval(key)` devuelve el intervalo en ms para el contador en vivo (o `null` si la tasa es demasiado lenta). `getContentThemeStats(ctaText)` es un helper de conveniencia para los 8 archivos de categoría de contenido
- **`useStatValue(key)` hook en `stats-section.tsx`** — inicializa el estado con `getStatValue(key)` y arma un `setInterval` usando `getTickInterval(key)` para actualizar el número en vivo. Solo dispara interval para stats cuya tasa implica un tick ≤ 60 segundos
- **`StatItem` component** — sub-componente que encapsula `useStatValue` por stat, permitiendo usarlo dentro del `.map` sin violar las reglas de hooks

### Changed

- **Stats del home (`stats-section.tsx`)** — los valores ya no son literales hardcodeados sino que vienen del hook `useStatValue`. El layout mobile se ajustó para apilar el label debajo del número (antes quedaba al lado)
- **`src/lib/data/content.ts` — stats array** — valores derivados de `getStatValue()` en lugar de strings literales
- **8 archivos de categoría de contenido** (`educacion`, `kids`, `viajes`, `fitness`, `lifestyle`, `cocina`, `gaming`, `musica`) — el bloque `stats: { value: 1200, unit: 'HS', ... }` reemplazado por `stats: getContentThemeStats(ctaText)` (7 líneas → 1 por archivo)
- **Subscribers** — cambia de unidad `K` (550K) a número completo sin unidad (2.700.000+). Tasa: ~218.000/mes → tick en vivo cada ~12 segundos
- **Tasas de crecimiento confirmadas** — `contentHours`: 1 HS cada 10 días (~3 HS/mes); `subscribers`: 218.000/mes (~7.267/día); `yearsExperience`: calculado automáticamente como `año actual − 2010`

## [1.0.11] — 2026-06-12

Nuevo copy del texto orbital del hero en **inglés** y re-cálculo de sus offsets **midiendo en el navegador**. Los intentos anteriores de acomodar el texto estimando largos a mano empeoraban en cada iteración: con los offsets heredados, `our operations reach •` (más largo que `our operations`) terminaba en ~361° pisando a `we are in` (que arranca en ~346°), y dejaba un hueco de ~20° después de `this is where`. Esta vez se midió el largo real de cada frase con `getComputedTextLength()` y se posicionaron secuencialmente respetando el arco de banderas.

### Changed

- **Hero — copy del anillo orbital en inglés** — `here we arrive with our operations` → `this is where our operations reach` (también en `Map.subtitle` para mantener consistencia con la sección del mapa)

### Fixed

- **Hero — texto orbital en inglés: solapamientos y huecos (desktop y mobile)** — offsets `en` recalculados con las longitudes renderizadas reales (full r=170: weAreIn 26.8° / countries 76.3° / arriveWith 33.7° / operations 63.3°; compact r=185: countries 80° / arriveWith 35.2° / operations 62.3°). Secuencia full: `this is where` 243.6° → `our operations reach •` 280.3° (gap 3°) → `we are in` 347.6° (gap 4°) → `more than 30 countries •` 376.4° (gap 2°, cruza el seam vía path de 1.5 vueltas) terminando a ~2° del borde de banderas. Compact: arriveWith 251.1° → operations 288.9° (gap 2.6°) → countries 1.8° (gap 10.6°) con ~10° de margen a las banderas. Verificado con screenshots congelando la animación en 1440px y 390px. es/pt sin cambios

### Fixed

- **Home — descripción del bloque "Somos Eventos" era la de "Somos Contenido"** — por error de copy/paste en el diseño, `Events.description` tenía el mismo texto que `Content.description`. Se corrigió en es/en/pt para usar el texto correcto: "Creamos eventos de contenido en vivo, desde festivales hasta producciones de larga, mediana y corta duración en más de 30 países." (equivalente al ya usado en la página `/somos-eventos`)

## [1.0.9] — 2026-06-10

Ajuste del texto orbital del hero (anillo que gira alrededor del globo) en **inglés** y **portugués** a partir de revisión en tablet (md/lg). El inglés se veía claramente roto: la frase `we are in` se mostraba cortada como "WE A". Midiendo en el navegador se halló que el `<textPath>` arrancaba en posición angular ~96% del path de **1 vuelta** y terminaba en ~103%, así que **SVG clipaba los glifos sobrantes** (un `textPath` no envuelve más allá del largo del path). El anillo compacto de mobile ya evitaba esto usando un path de 1.5 vueltas; el completo seguía en 1 vuelta.

### Added

- **Somos Contenido — flechas laterales en el slider de productos** — cuando una categoría tiene más de un producto, el slider (`ThemeProductsSlider`) muestra flechas `‹ ›` a los lados para indicar que se puede desplazar/swipe entre slides. Aparecen en todos los breakpoints: en el hub `/somos-contenido` (desktop, dentro de `ContenidoHero`) y en las páginas de categoría `/somos-contenido/[slug]` (mobile y desktop). Llaman a `slidePrev()`/`slideNext()` de Swiper y conviven con el autoplay (`disableOnInteraction: false`). Se agregaron las claves `ContentHub.prevSlide`/`nextSlide` (aria-labels) en es/en/pt. Flechas blancas al 90% de opacidad (contrastan tanto sobre el overlay negro lateral como sobre la franja mint), centradas verticalmente respecto de la franja mint, dentro de un container `max-w-6xl` por delante de los gradientes de borde (`z-50`); en hover aparece el borde circular que las contiene con `scale-105` y transición

### Fixed

- **Hero — el texto orbital en inglés se cortaba ("WE A")** — el path `#outerCircle` pasó de 1 a **1.5 vueltas** (un tercer arco retraza el mismo círculo y da pista de path extra), igual que el anillo compacto. Esto permite que `we are in` (que necesita arrancar "antes del 0" porque la oración A en inglés es más larga) renderice completo sin clip. Todos los offsets `full` se reescalaron **÷1.5** en es/en/pt: las posiciones **angulares no cambian** (mismo círculo), así que el español —la referencia afinada a mano— se ve idéntico
- **Hero — solapamiento de texto con banderas en inglés** — `more than 30 countries` terminaba pegado a las banderas; ahora cierra con ~5.6° de margen. El bloque de texto quedó centrado respecto al arco de banderas (márgenes inicial/final parejos a 5.6°), con las dos oraciones unidas (gaps internos 2.6° y 2.0°) y un gap de 3.0° entre ellas

### Changed

- **Hero — texto orbital en portugués más unido** — se redujo el gap entre `aqui chegamos com` y `nossas operações` de ~9° a ~3.6° (queda ~1 espacio de palabra), para que se lea como una sola frase; el sobrante se movió al límite entre oraciones (donde va el "•")

## [1.0.8] — 2026-06-09

Cuarta pasada de performance mobile. El análisis post-v1.0.7 (`mobile-4`, perf 80) mostró que igualar las cajas con `pb-0.5` no alcanzó: el LCP seguía en 4.9s sobre el `<video>`. Midiendo los candidatos LCP localmente con `PerformanceObserver` (build de producción + headless Chrome) se descubrió que **Chrome no descuenta el padding al calcular el tamaño LCP de un `<video>`** (sí lo hace para `<img>`): con `pb-0.5` en ambos, la imagen pintaba 196.515px² y el video 196.912px² — el video siempre quedaba más grande y se robaba el LCP al hacer fade-in.

### Fixed

- **Hero — el video ya no emite candidato LCP** — la caja del video pasa de `inset-0 h-full` + `pb-0.5` a `h-[calc(100%-4px)]`: achicar el **border box** (no el padding) es lo único que reduce su tamaño LCP. Con el video 4px más corto que la `<Image priority>`, ésta queda como candidato LCP definitivo (~1.2s) y el fade-in del video deja de contar. Verificado localmente: un solo candidato LCP (IMG a 224ms), video reproduciendo visible sin emitir candidato. Nota: `bottom-1` tampoco servía — un replaced element con `height: auto` ignora `bottom` y colapsa a su aspect ratio intrínseco. El gradiente a negro del pie tapa la junta de 4px

## [1.0.7] — 2026-06-09

Tercera pasada de performance mobile. El análisis post-v1.0.6 (`mobile-3`, perf 80) mostró que el poster bajaba temprano (~700ms) pero el LCP seguía en 4.8s sobre el `<video>`: como el video está en `opacity-0` hasta `onCanPlay`, el poster nunca pinta visible; y al hacer fade-in el video pintaba **2px más alto** que la `<Image priority>` (que lleva `pb-0.5`), por lo que Chrome lo tomaba como nuevo candidato LCP más grande, descartando a la imagen que pintó a ~1.2s.

### Fixed

- **Hero — el video le "robaba" el LCP a la imagen** — se agregó el mismo `pb-0.5` al `<video>` para que su caja pintada nunca supere a la de la `<Image priority>`. Con áreas iguales, el candidato LCP definitivo es la imagen (~1.2s) y el fade-in del video deja de contar (LCP estimado: 4.8s → ~1.2s). El poster se mantiene para el caso de autoplay bloqueado
- **Best Practices — `image-aspect-ratio`** — `producciones-propias-icon.webp` (77×73) se estiraba a 48×48; se agregó `object-contain` a los íconos de categorías del hero (todos casi cuadrados, sin cambio visual)

### Changed

- **Grid de banners — `quality={60}`** — las imágenes del split-flap (`BannerGridVideo`) pasan de q75 (default) a q60; el reporte marcaba ~64KB de desperdicio por compresión en las horizontales del home

## [1.0.6] — 2026-06-09

Segunda pasada de performance mobile. La auditoría reveló que **el elemento LCP es el `<video>` de fondo del hero**: la `<Image>` pinta rápido (24KB) pero el video, al hacer fade-in encima, se vuelve el LCP, y su pintado dependía de la descarga del mp4 (2.4MB → LCP simulado ~5.9s).

### Changed

- **Hero — poster liviano en el `<video>`** — se agregó `poster="/images/hero-bg-poster.jpg"` (768×432, 38KB, generado desde `hero-bg.webp`). El video pinta el poster apenas se monta, **desacoplando el LCP de la descarga del mp4** (de ~5.9s a ~1s). Se mantiene la `<Image priority>` para el FCP y como fallback
- **Globo 3D — piso de delay en el diferido** — `requestIdleCallback` disparaba en el primer hueco de idle (~800ms, antes del LCP), así que el bundle de Three.js seguía evaluándose en la ventana crítica. Se añadió un piso de 1.5s antes de programarlo, para que entre después del LCP

### Added

- **`public/images/hero-bg-poster.jpg`** — poster optimizado del hero para el `<video>` de fondo

## [1.0.5] — 2026-06-09

Optimización de performance **mobile** (Lighthouse mobile: LCP 8.2s, TBT 260ms → el throttling de CPU de mobile exponía el costo del JS y de las imágenes).

### Changed

- **Globo 3D (Three.js) — montaje diferido** — `LazyDottedGlobe` evaluaba ~1s de JS (bundle de 256KB) durante la hidratación, bloqueando el hilo principal y retrasando el LCP en mobile. Ahora se monta en `requestIdleCallback` (cuando el hilo está libre tras el render crítico, post-LCP); hasta entonces se ve el `GlobeFallback` y la animación de aparición del globo disimula la entrada tardía. El globo se mantiene en todas las plataformas
- **Hero — `poster` redundante eliminado** — el `<video>` tenía `poster="/images/hero-bg.webp"`, que cargaba el archivo **crudo** (1618×1946, 384KB) sin pasar por `next/image`. Como ya hay un `<Image priority>` optimizado detrás del video como fallback, el poster era redundante; al quitarlo, el fallback es la imagen optimizada y se elimina la carga del crudo (≈ −1650ms de LCP en mobile)
- **Carrusel de categorías — `sizes` corregido** — los íconos se servían a ~615px cuando se muestran a ~95px (`sizes="60vw"` en un slider de `slidesPerView: 4.2`); ajustado a `sizes="(max-width: 1024px) 31vw, 20vw"` para que `next/image` entregue una variante acorde

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
