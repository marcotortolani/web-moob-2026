/**
 * `key` = key del namespace `Nav` en los messages (texto fuente en inglés).
 * `href` = ruta INTERNA canónica (la slug traducida la genera el `Link` de next-intl).
 * El link con hash (`/#contact`) ancla a la home y se renderiza como `<a>`.
 */
export const navLinks = [
  { key: 'Content', href: '/somos-contenido' },
  { key: 'Technology', href: '/somos-tecnologia' },
  { key: 'Events', href: '/somos-eventos' },
  { key: 'Experiences', href: '/somos-experiencias' },
  { key: 'Games', href: '/somos-juegos' },
  { key: 'Work with us', href: '/join-us' },
  { key: "Let's talk!", href: '/#contact', highlight: true },
] as const
