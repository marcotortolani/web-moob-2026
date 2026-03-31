# Plan de Implementación: Sitio Web Media Moob

## Contexto

Media Moob es una empresa de entretenimiento, contenido y tecnología móvil con presencia en 30+ países. Se implementa su sitio web corporativo completo basado en diseños de Figma (`i9BqcEFoKZ2h7TakgYyapE`, página "sitio memoob"), con diseño mobile-first, full responsive, animaciones y componentes reutilizables.

**Figma URL**: `https://www.figma.com/design/i9BqcEFoKZ2h7TakgYyapE/Micrositio-Trivia-Safaricom-Kenya?node-id=168-38`

**Stack**:

- Next.js 16.2.1 (App Router, Turbopack)
- React 19.2 (View Transitions, useEffectEvent, Activity)
- Tailwind CSS v4 (CSS-first config, `@theme inline`, sin tailwind.config.js)
- shadcn/ui v4 (componentes base)
- Motion (`motion/react`) para animaciones
- Swiper para carousels
- TypeScript 5

**Consideraciones Next.js 16**:

- `params` y `searchParams` son Promises (async obligatorio)
- Turbopack es el bundler por defecto
- Usar `PageProps<'/ruta/[slug]'>` con `npx next typegen`
- No usar `bg-gradient-to-*`, usar `bg-linear-to-*` (Tailwind v4)

**Design tokens (extraídos de Figma)**:

- Accent/Mint: `#40b09d`
- Background: `#000000`
- Surface: `#111111` / `#1a1a1a`
- Text: white, `#999999` (muted)
- Fuente body/headings: Poppins (Regular, Bold, ExtraBold)
- Fuente display/CTAs: Bebas Neue
- Títulos de sección: Poppins ExtraBold italic, `#40b09d`
- Label "SOMOS": Poppins Regular, uppercase, tracking-widest, white

**Nota**: Lucide-react v0.x no incluye `Instagram`/`Linkedin`. Se usan SVGs custom en `src/components/ui/social-icons.tsx`.

---

## Progreso

- [x] **Etapa 0**: Setup del Proyecto y Design System
- [x] **Etapa 1**: Home Mobile
- [x] **Etapa 2**: Home Desktop (Responsive)
- [x] **Etapa 3**: SOMOS Música
- [x] **Etapa 4**: SOMOS Tecnología
- [x] **Etapa 5**: SOMOS Activaciones y Experiencias
- [x] **Etapa 6**: SOMOS Activaciones - Interna (Detalle)
- [x] **Etapa 7**: SOMOS Juegos & Gamificación
- [x] **Etapa 8**: Polish, Animaciones Globales, SEO y Performance

---

## Etapa 0: Setup del Proyecto ✅

### Dependencias instaladas

```bash
npx shadcn@latest init -d    # shadcn/ui + clsx + tailwind-merge + lucide-react + cva
npm install motion            # Animaciones (paquete moderno de framer-motion)
npm install swiper            # Carousels
```

### Design System configurado en `src/app/globals.css`

- `@theme inline` con colores mint, surface, background
- Clases utility: `.scrollbar-none`, `.animate-spin-slow`, `.text-mint`, `.bg-mint`, `.border-mint`
- Fuentes: Poppins y Bebas Neue via `next/font/google` en `layout.tsx`

### Archivos creados/modificados

| Archivo                              | Estado                                    |
| ------------------------------------ | ----------------------------------------- |
| `src/app/globals.css`                | ✅ Design tokens + utilities              |
| `src/app/layout.tsx`                 | ✅ Fuentes, metadata español, `lang="es"` |
| `src/lib/utils.ts`                   | ✅ `cn()` (shadcn)                        |
| `src/lib/data/navigation.ts`         | ✅ Links de nav                           |
| `src/lib/data/content.ts`            | ✅ Stats, categorías, servicios tech      |
| `src/components/ui/button.tsx`       | ✅ shadcn button                          |
| `src/components/ui/social-icons.tsx` | ✅ InstagramIcon, LinkedinIcon SVG        |
| `next.config.ts`                     | ✅ Imágenes remotas de Figma              |

---

## Etapa 1: Home Mobile ✅

### Componentes compartidos

| Componente     | Archivo                                 | Estado                                                             |
| -------------- | --------------------------------------- | ------------------------------------------------------------------ |
| Header         | `src/components/layout/header.tsx`      | ✅ Fixed, scroll-aware bg, hamburger mobile, nav desktop, logo SVG |
| Footer         | `src/components/layout/footer.tsx`      | ✅ Logo, redes sociales, dirección                                 |
| SectionHeading | `src/components/ui/section-heading.tsx` | ✅ Patrón "SOMOS" + título mint + descripción                      |

### Secciones del Home

| Sección            | Archivo                                                | Estado                                                  |
| ------------------ | ------------------------------------------------------ | ------------------------------------------------------- |
| HeroSection        | `src/components/sections/home/hero-section.tsx`        | ✅ Stagger text, globo SVG, CTA reel, iconos categorías |
| ContentSection     | `src/components/sections/home/content-section.tsx`     | ✅ Grid 3x2 → 6 col, 6 categorías con images            |
| BrandsBar          | `src/components/sections/home/brands-bar.tsx`          | ✅ Marquee infinito de marcas                           |
| StatsSection       | `src/components/sections/home/stats-section.tsx`       | ✅ Counter animado: 1200 HS / 550K / 15 años            |
| EventsSection      | `src/components/sections/home/events-section.tsx`      | ✅ Scroll horizontal mobile, grid asimétrico desktop    |
| TechSection        | `src/components/sections/home/tech-section.tsx`        | ✅ 5 iconos circulares de servicios                     |
| ActivationsSection | `src/components/sections/home/activations-section.tsx` | ✅ Grid 2×2 con overlay título                          |
| GamesSection       | `src/components/sections/home/games-section.tsx`       | ✅ Iconos de juegos con hover                           |
| MapSection         | `src/components/sections/home/map-section.tsx`         | ✅ SVG globo con texto circular rotante                 |

### Página

| Archivo            | Estado                         |
| ------------------ | ------------------------------ |
| `src/app/page.tsx` | ✅ Compone todas las secciones |

---

## Etapa 2: Home Desktop (Responsive)

**Objetivo**: Adaptar cada componente del home para que se vea como el diseño desktop de Figma (1728px).
No se crean archivos nuevos — se agregan clases responsive `md:`, `lg:`, `xl:`, `2xl:` a los componentes existentes.

### Figma reference

- Nodo desktop: `313:3` ("HOME- Desktop", 1728×9369px)

### Cambios por componente

| Componente             | Breakpoint | Cambios desktop                                                                                                                                                         |
| ---------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Header**             | `lg:`      | Nav horizontal con links visibles, ocultar hamburger, mostrar iconos sociales. Ya implementado ✅                                                                       |
| **HeroSection**        | `lg:`      | Layout flex: texto izquierda, globo/mapa derecha. Tipografía escalada hasta 8xl. CTA más grande. Ya tiene clases responsive ✅ — refinar según Figma desktop            |
| **ContentSection**     | `lg:`      | Grid `grid-cols-6` (ya tiene `md:grid-cols-6`). Agregar sección de logos de marcas debajo de categorías. Heading más grande. Descripción al lado del heading en desktop |
| **BrandsBar**          | `lg:`      | Agregar logos reales de marcas. Más padding vertical                                                                                                                    |
| **StatsSection**       | `md:`      | `grid-cols-3` con dividers verticales (ya implementado ✅). Agregar iconos decorativos más grandes                                                                      |
| **EventsSection**      | `lg:`      | Grid asimétrico 3 columnas: izq 3 stacked, centro grande, der 2 stacked (ya implementado ✅). Imágenes más grandes, gap mayor                                           |
| **TechSection**        | `lg:`      | Iconos `w-20 h-20` (ya tiene `md:` ✅). Agregar descripción expandida al lado en desktop                                                                                |
| **ActivationsSection** | `lg:`      | Grid `grid-cols-4` (ya tiene `md:grid-cols-4` ✅). Cards más grandes, texto overlay más legible                                                                         |
| **GamesSection**       | `lg:`      | Iconos `w-24 h-24` (ya tiene `md:` ✅). Layout horizontal con descripción al lado                                                                                       |
| **MapSection**         | `lg:`      | Globo más grande `w-[420px]` (ya tiene `md:` ✅). Layout flex con texto a un lado                                                                                       |
| **Footer**             | `md:`      | Layout horizontal con columnas: logo + nav + social + dirección                                                                                                         |

### Breakpoint strategy

```
Mobile: default (< 768px)  → stack vertical, scroll horizontal en listas
Tablet: md (768px+)        → 2-3 columnas, nav visible
Desktop: lg (1024px+)      → Layout completo, grids expandidos
Wide: xl (1280px+)         → Más breathing room, textos más grandes
Full: 2xl (1536px+)        → max-w-[1728px] centrado, diseño Figma 1:1
```

---

## Etapa 3: SOMOS Música

### Figma reference

- Nodo mobile: `325:664` / `654:356` ("Somos Musica mobile")

### Archivos a crear

| Archivo                                               | Descripción                                     |
| ----------------------------------------------------- | ----------------------------------------------- |
| `src/app/somos-musica/page.tsx`                       | Página SOMOS Música                             |
| `src/components/sections/musica/hero-musica.tsx`      | Hero con grid de fotos 2x2 + grande de artistas |
| `src/components/sections/musica/product-showcase.tsx` | Showcase "Mundo Música" con mockup laptop/phone |
| `src/components/ui/demo-button.tsx`                   | Botón "VER DEMO" reutilizable (mint, rounded)   |
| `src/components/ui/image-grid-mosaic.tsx`             | Grid asimétrico de imágenes reutilizable        |

### Layout

1. Header (compartido)
2. Hero: Grid de fotos de artistas/música (2 fotos top + 1 grande + 2 bottom)
3. "SOMOS Música" (SectionHeading, título con font italic cursiva grande)
4. Texto: "Te acercamos a la música, a los artistas, a sus recitales y mucho más. Llená tu vida de música!"
5. Stats: icono play + "1200 HS" + "CONTENIDO EXCLUSIVO"
6. Subtexto: "Contenido de corta, mediana y larga duración"
7. CTA mint background: "Conocé nuestros productos de contenido exclusivo musical"
8. Product showcase: "Mundo Música" título + mockups laptop y phone mostrando app
9. Botón "VER DEMO" (mint border, rounded-full)
10. Dot pagination (4 dots)
11. Footer (compartido)

### Animaciones

- Fotos del hero: stagger fade-in
- Mockups: parallax sutil al scroll
- CTA button: hover pulse/glow
- Stats: counter animation

### Responsive

- Mobile: stack vertical, imágenes full width
- Desktop: grid 2 columnas (texto + stats izq, mockups der)

---

## Etapa 4: SOMOS Tecnología

### Figma reference

- Nodo mobile: `328:4860` ("SOMOS TECNOLOGÍA - Mobile")

### Archivos a crear

| Archivo                                                 | Descripción                                              |
| ------------------------------------------------------- | -------------------------------------------------------- |
| `src/app/somos-tecnologia/page.tsx`                     | Página SOMOS Tecnología                                  |
| `src/components/sections/tecnologia/hero-tech.tsx`      | Hero imagen persona con tech                             |
| `src/components/sections/tecnologia/services-nav.tsx`   | 5 iconos de servicios seleccionables                     |
| `src/components/sections/tecnologia/service-detail.tsx` | Detalle con phone mockup + descripción                   |
| `src/components/ui/phone-mockup.tsx`                    | Phone mockup frame reutilizable                          |
| `src/lib/data/services.ts`                              | Data de servicios (ya existe parcialmente en content.ts) |

### Layout

1. Header
2. Hero: Imagen de persona con tecnología + overlay oscuro
3. "SOMOS Tecnología" (SectionHeading)
4. Descripción: "Aplicamos tecnología propia para amplificar su alcance e impacto..."
5. Video play button (circular, centrado)
6. Texto: "RECORRE Y CONOCE NUESTROS SERVICIOS DE TECNOLOGÍA"
7. 5 iconos en fila: Sat Push, SMS, Publicidad, Bundle, Data Rewards (seleccionables)
8. Detalle del servicio activo:
   - Título grande (ej: "SAT PUSH")
   - Phone mockup con contenido del servicio
   - Descripción larga del servicio
9. Flechas prev/next para navegar entre servicios
10. Footer

### Animaciones

- Iconos: hover scale, activo con highlight mint
- Transición entre servicios: AnimatePresence slide horizontal
- Phone mockup: spring entrance
- Flechas: hover translate-x

### Responsive

- Mobile: iconos scroll horizontal, detalle stack vertical
- Desktop: 2 columnas (phone mockup izq + texto der)

---

## Etapa 5: SOMOS Activaciones y Experiencias

### Figma reference

- Nodo mobile: `336:85` ("SOMOS ACTIVACIONES - Mobile")

### Archivos a crear

| Archivo                                                      | Descripción                      |
| ------------------------------------------------------------ | -------------------------------- |
| `src/app/somos-activaciones/page.tsx`                        | Listado de activaciones          |
| `src/components/sections/activaciones/hero-activaciones.tsx` | Hero collage de fotos            |
| `src/components/sections/activaciones/activations-grid.tsx`  | Grid 2×3 paginado                |
| `src/components/ui/activation-card.tsx`                      | Card con imagen + título overlay |
| `src/components/ui/pagination-arrows.tsx`                    | "1/3" con flechas `<` `>`        |
| `src/lib/data/activations.ts`                                | Data de activaciones             |

### Layout

1. Header
2. Hero: Collage grande de fotos de activaciones (2 arriba irregulares + 1 grande abajo)
3. "SOMOS Activaciones y experiencias" (SectionHeading)
4. Descripción: "Unimos el mundo OFF con el ON generando activaciones y experiencias para usuarios y partners."
5. Grid 2 columnas × 3 filas de activation cards:
   - Cada card: imagen con rounded-xl + título bold uppercase overlay en bottom
   - Ejemplos: "ACTIVACIÓN EN CENTRO COMERCIAL CON BENJA TORRES. PERSONAL PARAGUAY", "ACCIÓN EL DÍA DE LA MUJER VODACOM MOZAMBIQUE"
6. Paginación: `< 1/3 >` centrado
7. Footer

### Animaciones

- Cards: stagger entrance, hover zoom + overlay oscuro
- Cambio de página: slide transition
- Hero collage: parallax layers

### Responsive

- Mobile: grid 2 columnas
- Desktop: grid 3 columnas, cards más grandes

---

## Etapa 6: SOMOS Activaciones - Interna (Detalle)

### Figma reference

- Nodo mobile: `401:160` ("SOMOS ACTIVACIONES - INTERNA - Mobile")

### Archivos a crear

| Archivo                                                   | Descripción                                     |
| --------------------------------------------------------- | ----------------------------------------------- |
| `src/app/somos-activaciones/[slug]/page.tsx`              | Detalle de activación (async params Next.js 16) |
| `src/components/sections/activaciones/detail-gallery.tsx` | Collage 3 fotos                                 |
| `src/components/ui/video-player.tsx`                      | Video player con play button circular           |

### Layout

1. Header
2. Gallery: 3 fotos del evento (2 en grid arriba + 1 grande abajo)
3. Label "ACTIVACIONES" + Título grande del evento
4. Video player: thumbnail con botón play circular centrado, borde mint
5. Footer

### Next.js 16 async params

```tsx
export default async function Page(
  props: PageProps<'/somos-activaciones/[slug]'>,
) {
  const { slug } = await props.params
  // lookup activation data by slug
}
```

### Animaciones

- Gallery: fade-in staggered
- Video play button: hover glow + scale
- Entrada de página: View Transition

---

## Etapa 7: SOMOS Juegos & Gamificación

### Figma reference

- Nodo mobile: `449:331` ("SOMOS JUEGOS - Mobile")

### Archivos a crear

| Archivo                                            | Descripción                  |
| -------------------------------------------------- | ---------------------------- |
| `src/app/somos-juegos/page.tsx`                    | Página SOMOS Juegos          |
| `src/components/sections/juegos/hero-juegos.tsx`   | Hero grid de gamers          |
| `src/components/sections/juegos/game-showcase.tsx` | Showcase individual de juego |
| `src/lib/data/games.ts`                            | Data de juegos               |

### Layout

1. Header
2. Hero: Grid 2×2 de fotos de gamers
3. "SOMOS Juegos & Gamificación" (SectionHeading)
4. Descripción: "Desarrollamos juegos en base a nuestros productos con premios exclusivos para nuestros usuarios."
5. Phone mockup grande mostrando juego activo (ej: rueda de trivia)
6. Título del juego: "TRIVIAS"
7. Descripción detallada del juego
8. Botón "VER DEMO" (mint)
9. Dot pagination (4-5 dots)
10. Flechas prev/next para navegar entre juegos
11. Footer

### Juegos a mostrar

- TRIVIAS (rueda giratoria)
- MEMOTEST (cartas de memoria)
- PUZZLE (rompecabezas)
- PAINT (dibujo)

### Animaciones

- Phone mockup: spring entrance, rueda gira al entrar
- Transición entre juegos: AnimatePresence slide
- Dots: scale del activo
- Hero fotos: stagger fade-in

---

## Etapa 8: Polish, Animaciones Globales, SEO y Performance

### 8.1 Animaciones globales

- Page transitions con View Transitions API de React 19.2
- Smooth scroll a secciones del home desde la nav
- Scroll progress bar sutil en header (línea mint)
- Lazy loading de secciones below-the-fold

### 8.2 SEO

| Archivo                    | Descripción                                 |
| -------------------------- | ------------------------------------------- |
| `src/app/layout.tsx`       | Metadata template, OpenGraph, Twitter cards |
| `src/app/page.tsx`         | Metadata home                               |
| `src/app/somos-*/page.tsx` | Metadata por página                         |
| `src/app/sitemap.ts`       | Sitemap automático                          |
| `src/app/robots.ts`        | Robots.txt                                  |
| `public/og-image.jpg`      | Imagen OpenGraph                            |

### 8.3 Performance

- `next/image` con sizes y priority correctos
- Dynamic imports para carousels y video player
- Font subsetting
- Preload de hero image

### 8.4 Accesibilidad

- Navegación por teclado en menús y carousels
- Alt text descriptivo en todas las imágenes
- Focus visible styles (outline mint)
- Aria labels en botones
- Skip to content link
- Color contrast ratio ≥ 4.5:1

---

## Estructura de Carpetas Final

```
src/
├── app/
│   ├── globals.css                          # Design tokens, @theme inline
│   ├── layout.tsx                           # Root layout, fuentes, metadata
│   ├── page.tsx                             # Home (todas las secciones)
│   ├── sitemap.ts                           # SEO
│   ├── robots.ts                            # SEO
│   ├── somos-musica/
│   │   └── page.tsx
│   ├── somos-tecnologia/
│   │   └── page.tsx
│   ├── somos-activaciones/
│   │   ├── page.tsx                         # Listado
│   │   └── [slug]/
│   │       └── page.tsx                     # Detalle (async params)
│   └── somos-juegos/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── header.tsx                       # Fixed, scroll-aware, responsive nav
│   │   └── footer.tsx                       # Logo, social, dirección
│   ├── ui/
│   │   ├── button.tsx                       # shadcn
│   │   ├── social-icons.tsx                 # Instagram + LinkedIn SVG
│   │   ├── section-heading.tsx              # "SOMOS" + título pattern
│   │   ├── demo-button.tsx                  # Botón "VER DEMO"
│   │   ├── image-grid-mosaic.tsx            # Grid asimétrico reutilizable
│   │   ├── phone-mockup.tsx                 # Frame de teléfono
│   │   ├── video-player.tsx                 # Player con play button
│   │   ├── activation-card.tsx              # Card imagen + overlay
│   │   └── pagination-arrows.tsx            # "1/3" con flechas
│   └── sections/
│       ├── home/
│       │   ├── hero-section.tsx
│       │   ├── content-section.tsx
│       │   ├── brands-bar.tsx
│       │   ├── stats-section.tsx
│       │   ├── events-section.tsx
│       │   ├── tech-section.tsx
│       │   ├── activations-section.tsx
│       │   ├── games-section.tsx
│       │   └── map-section.tsx
│       ├── musica/
│       │   ├── hero-musica.tsx
│       │   └── product-showcase.tsx
│       ├── tecnologia/
│       │   ├── hero-tech.tsx
│       │   ├── services-nav.tsx
│       │   └── service-detail.tsx
│       ├── activaciones/
│       │   ├── hero-activaciones.tsx
│       │   ├── activations-grid.tsx
│       │   └── detail-gallery.tsx
│       └── juegos/
│           ├── hero-juegos.tsx
│           └── game-showcase.tsx
└── lib/
    ├── utils.ts                             # cn()
    └── data/
        ├── navigation.ts                    # Nav links
        ├── content.ts                       # Stats, categorías, servicios
        ├── activations.ts                   # Data de activaciones
        └── games.ts                         # Data de juegos

public/
├── images/
│   ├── hero-bg.jpg
│   ├── categories/                          # cocina, musica, lifestyle, etc.
│   ├── events/                              # event-1 a event-6
│   ├── activations/                         # activation-1 a activation-4
│   └── games/                               # trivia, memotest, puzzle, paint
└── og-image.jpg
```

---

## Verificación por Etapa

Para cada etapa completada:

1. `npx tsc --noEmit` — sin errores TypeScript
2. `npm run dev` — compila sin errores
3. Responsive: probar en 375px, 768px, 1024px, 1440px, 1728px
4. Animaciones: verificar fluidez a 60fps
5. Lighthouse: score > 90 en Performance, Accessibility, SEO
6. Comparar visualmente con screenshots de Figma via MCP `get_screenshot`
