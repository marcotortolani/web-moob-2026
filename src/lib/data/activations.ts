export interface Activation {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  coverImage: string | null;
  images: string[];
  videoUrl: string;
  detailVideoUrl: string;
  videoThumbnail?: string;
}

export const activations: Activation[] = [
  {
    slug: "clinica-cocina-victor-moreno-movistar-venezuela",
    title: "Clínica de cocina con Victor Moreno — Movistar Venezuela",
    shortTitle: "CLÍNICA DE COCINA\nCON VICTOR MORENO",
    description:
      "Usuarios del servicio que participaron de una trivia exclusiva para sumar puntos y ganar su lugar en una clínica de cocina exclusiva a cargo de Victor Moreno.",
    coverImage: "/images/experiencias/locoporlacocina-movistar-ve/activacion-lxc-horizontal01.webp",
    images: [
      "/images/experiencias/locoporlacocina-movistar-ve/activacion-lxc-horizontal01.webp",
      "/images/experiencias/locoporlacocina-movistar-ve/activacion-lxc-horizontal02.webp",
      "/images/experiencias/locoporlacocina-movistar-ve/activacion-lxc-vertical01.webp",
      "/images/experiencias/locoporlacocina-movistar-ve/activacion-lxc-vertical02.webp",
    ],
    videoUrl: "https://vimeo.com/1167461946",
    detailVideoUrl: "https://vimeo.com/1051941178",
  },
  {
    slug: "team-gamers-movistar-venezuela",
    title: "Stand y activación FitelVen — Team Gamers Movistar Venezuela",
    shortTitle: "STAND Y ACTIVACIÓN FITELVEN\nTEAM GAMERS",
    description:
      "Se realizó la instalación de un stand en el cual se promocionó el producto de Team Gamers. Las dos acciones principales fueron la creación de un tótem que contenía una trivia para que los participantes ganen premios y la proyección de una clínica.",
    coverImage: "/images/experiencias/teamgamers-movistar-ve/activacion-TG-horizontal01.webp",
    images: [
      "/images/experiencias/teamgamers-movistar-ve/activacion-TG-horizontal01.webp",
      "/images/experiencias/teamgamers-movistar-ve/activacion-TG-horizontal02.webp",
      "/images/experiencias/teamgamers-movistar-ve/activacion-TG-vertical01.webp",
      "/images/experiencias/teamgamers-movistar-ve/activacion-TG-vertical02.webp",
    ],
    videoUrl: "https://vimeo.com/1167444864",
    detailVideoUrl: "https://vimeo.com/1069269568",
  },
  {
    slug: "so-pra-elas-vodacom-mozambique",
    title: "So Pra Elas — Día de la Mujer Vodacom Mozambique",
    shortTitle: "ACCIÓN EL DÍA DE LA MUJER\nVODACOM MOZAMBIQUE",
    description: "",
    coverImage: "/images/experiencias/sopraelas-vodacom-mz/activacion-SPE-horizontal01.webp",
    images: [
      "/images/experiencias/sopraelas-vodacom-mz/activacion-SPE-horizontal01.webp",
      "/images/experiencias/sopraelas-vodacom-mz/activacion-SPE-horizontal02.webp",
      "/images/experiencias/sopraelas-vodacom-mz/activacion-SPE-vertical01.webp",
      "/images/experiencias/sopraelas-vodacom-mz/activacion-SPE-vertical02.webp",
    ],
    videoUrl: "https://vimeo.com/1167432366",
    detailVideoUrl: "https://vimeo.com/718443032",
  },
  {
    slug: "que-guay-viajes-movistar-venezuela",
    title: "Que Guay Viajes — Movistar Venezuela",
    shortTitle: "QUE GUAY VIAJES\nMOVISTAR VENEZUELA",
    description: "",
    coverImage: "/images/experiencias/queguayviajes-movistar-ve/activacion-QGV-horizontal01.webp",
    images: [
      "/images/experiencias/queguayviajes-movistar-ve/activacion-QGV-horizontal01.webp",
      "/images/experiencias/queguayviajes-movistar-ve/activacion-QGV-horizontal02.webp",
      "/images/experiencias/queguayviajes-movistar-ve/activacion-QGV-vertical01.webp",
      "/images/experiencias/queguayviajes-movistar-ve/activacion-QGV-vertical02.webp",
    ],
    videoUrl: "https://vimeo.com/1167391488",
    detailVideoUrl: "https://vimeo.com/1136465203",
  },
  {
    slug: "mundo-musica-personal-paraguay",
    title: "Mundo Música — Personal Paraguay",
    shortTitle: "MUNDO MÚSICA\nPERSONAL PARAGUAY",
    description: "",
    coverImage: "/images/experiencias/mundomusica-personal-py/activacion-MUNDOMUSICA-horizontal01.webp",
    images: [
      "/images/experiencias/mundomusica-personal-py/activacion-MUNDOMUSICA-horizontal01.webp",
      "/images/experiencias/mundomusica-personal-py/activacion-MUNDOMUSICA-horizontal02.webp",
      "/images/experiencias/mundomusica-personal-py/activacion-MUNDOMUSICA-vertica01.webp",
      "/images/experiencias/mundomusica-personal-py/activacion-MUNDOMUSICA-vertica02.webp",
    ],
    videoUrl: "https://vimeo.com/1167378582",
    detailVideoUrl: "https://vimeo.com/295657891",
  },
  {
    slug: "benja-torres-personal-paraguay",
    title: "Activación en centro comercial con Benja Torres — Personal Paraguay",
    shortTitle: "ACTIVACIÓN EN CENTRO COMERCIAL\nCON BENJA TORRES",
    description:
      "Una intervención artística inesperada y disruptiva, en la que Benja Torres se convierte en el epicentro de una experiencia emocional dentro del centro comercial. A través de sus letras y su arte, el evento humanizó las marcas asociadas, generando un vínculo cercano con el público.",
    coverImage: "/images/experiencias/activacion-benja-torres/activacion-benja-horizontal01.webp",
    images: [
      "/images/experiencias/activacion-benja-torres/activacion-benja-horizontal01.webp",
      "/images/experiencias/activacion-benja-torres/activacion-benja-horizontal02.webp",
      "/images/experiencias/activacion-benja-torres/activacion-benja-vertical01.webp",
      "/images/experiencias/activacion-benja-torres/activacion-benja-vertical02.webp",
    ],
    videoUrl: "https://vimeo.com/1167401530",
    detailVideoUrl: "https://vimeo.com/1193648086",
  },
];

export const ACTIVATIONS_PER_PAGE = 6;
