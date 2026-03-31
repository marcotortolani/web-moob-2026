export interface Activation {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  coverImage: string;
  images: string[];
  videoThumbnail?: string;
}

export const activations: Activation[] = [
  {
    slug: "benja-torres-personal-paraguay",
    title: "Benja Torres en vivo centro comercial",
    shortTitle: "ACTIVACIÓN EN CENTRO COMERCIAL CON BENJA TORRES. PERSONAL PARAGUAY",
    description:
      "Una experiencia única donde los fans de Benja Torres pudieron disfrutar de una actuación en vivo en el centro comercial, impulsada por Personal Paraguay.",
    coverImage: "/images/activations/activation-1.jpg",
    images: [
      "/images/activations/activation-1.jpg",
      "/images/activations/activation-2.jpg",
      "/images/activations/activation-3.jpg",
    ],
    videoThumbnail: "/images/activations/activation-1.jpg",
  },
  {
    slug: "dia-mujer-vodacom-mozambique",
    title: "Acción el Día de la Mujer Vodacom Mozambique",
    shortTitle: "ACCIÓN EL DÍA DE LA MUJER VODACOM MOZAMBIQUE",
    description:
      "Celebración del Día Internacional de la Mujer con actividades y contenido exclusivo en colaboración con Vodacom Mozambique.",
    coverImage: "/images/activations/activation-2.jpg",
    images: [
      "/images/activations/activation-2.jpg",
      "/images/activations/activation-1.jpg",
      "/images/activations/activation-3.jpg",
    ],
    videoThumbnail: "/images/activations/activation-2.jpg",
  },
  {
    slug: "fitelven-team-gamers",
    title: "Stand y activación Fitelven Team Gamers",
    shortTitle: "STAND Y ACTIVACIÓN FITELVEN TEAM GAMERS",
    description:
      "Presencia de alto impacto en el evento Fitelven con activaciones de gaming y experiencias interactivas para la comunidad gamer.",
    coverImage: "/images/activations/activation-3.jpg",
    images: [
      "/images/activations/activation-3.jpg",
      "/images/activations/activation-4.jpg",
      "/images/activations/activation-1.jpg",
    ],
    videoThumbnail: "/images/activations/activation-3.jpg",
  },
  {
    slug: "clinica-cocina-victor-moreno",
    title: "Clínica de cocina con Victor Moreno",
    shortTitle: "CLÍNICA DE COCINA CON VICTOR MORENO",
    description:
      "Taller exclusivo de cocina con el reconocido chef Victor Moreno, combinando gastronomía y tecnología móvil para una experiencia única.",
    coverImage: "/images/activations/activation-4.jpg",
    images: [
      "/images/activations/activation-4.jpg",
      "/images/activations/activation-2.jpg",
      "/images/activations/activation-3.jpg",
    ],
    videoThumbnail: "/images/activations/activation-4.jpg",
  },
  {
    slug: "movistar-arena-show",
    title: "Show en vivo Movistar Arena",
    shortTitle: "SHOW EN VIVO MOVISTAR ARENA",
    description:
      "Gran show en vivo con artistas exclusivos, transmitido en tiempo real a suscriptores de Movistar en toda Latinoamérica.",
    coverImage: "/images/activations/activation-1.jpg",
    images: [
      "/images/activations/activation-1.jpg",
      "/images/activations/activation-3.jpg",
      "/images/activations/activation-4.jpg",
    ],
    videoThumbnail: "/images/activations/activation-1.jpg",
  },
  {
    slug: "gaming-summit-colombia",
    title: "Gaming Summit Colombia",
    shortTitle: "GAMING SUMMIT COLOMBIA",
    description:
      "Cumbre regional de gaming con torneos, contenido en vivo y activaciones de marca para la comunidad gamer de Colombia.",
    coverImage: "/images/activations/activation-2.jpg",
    images: [
      "/images/activations/activation-2.jpg",
      "/images/activations/activation-4.jpg",
      "/images/activations/activation-1.jpg",
    ],
    videoThumbnail: "/images/activations/activation-2.jpg",
  },
];

export const ACTIVATIONS_PER_PAGE = 6;
