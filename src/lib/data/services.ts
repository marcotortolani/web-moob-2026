export type MockupContent =
  | { kind: "sat-push"; body: string; cancelLabel: string; confirmLabel: string }
  | { kind: "chat"; message: string }
  | { kind: "play"; label: string }
  | { kind: "bundles"; items: { title: string; lines: string[]; price: string; cta: string }[] }
  | { kind: "data-rewards"; body: string; cancelLabel: string; confirmLabel: string };

export interface TechService {
  id: string;
  label: string;
  icon: string;
  title: string;
  description: string;
  mockup: MockupContent;
}

export const techServices: TechService[] = [
  {
    id: "sat-push",
    label: "SAT PUSH",
    icon: "Bell",
    title: "SAT PUSH",
    description:
      "Plataforma de mensajería interactiva para enviar notificaciones push masivas y personalizadas directamente a celulares, permitiendo alertas, encuestas y enlaces directos (click-to-call, click-to-browse), impulsando la interacción y visibilidad de marcas de forma proactiva.",
    mockup: {
      kind: "sat-push",
      body: "Descubre el mundo junto a Que Guay, accede ahora para ver el mejor contenido de viajes",
      cancelLabel: "CANCELAR",
      confirmLabel: "ACEPTAR",
    },
  },
  {
    id: "sms",
    label: "SMS",
    icon: "MessageSquare",
    title: "SMS",
    description:
      "El uso de SMS con fines de marketing para anunciar productos o servicios, anunciar rebajas, enviar ofertas especiales o promocionar eventos. Estos mensajes se reconocen fácilmente por su clara llamada a la acción, como «Usa el código» o «Compra ahora».",
    mockup: {
      kind: "chat",
      message: "Descubre el mejor contenido de gaming en: bit.ly/3yJH0vv",
    },
  },
  {
    id: "publicidad",
    label: "PUBLICIDAD",
    icon: "BarChart2",
    title: "PUBLICIDAD",
    description:
      "Anuncios diseñados específicamente para smartphones y tablets, optimizados para interactuar con usuarios en apps, redes sociales y sitios web. Incluye formatos banner, vídeo, y anuncios nativos, siendo herramientas clave para aumentar ventas.",
    mockup: {
      kind: "play",
      label: "WATCH NOW!",
    },
  },
  {
    id: "bundle",
    label: "BUNDLE",
    icon: "Package",
    title: "BUNDLE",
    description:
      "Un bundle de datos en tecnología y móviles se refiere a un paquete o conjunto predefinido de servicios de conexión a internet (megabytes o gigabytes) que los operadores de telefonía móvil ofrecen a sus usuarios. Estos paquetes permiten acceder a internet sin depender de una red Wi-Fi, utilizando la red del proveedor.",
    mockup: {
      kind: "bundles",
      items: [
        {
          title: "BUNDLE 50 GB",
          lines: ["Incluye llamadas y SMS ilimitados", "youtube & instagram Free!"],
          price: "$xxxx",
          cta: "Contratar",
        },
        {
          title: "BUNDLE 100 GB",
          lines: ["Incluye llamadas y SMS ilimitados", "IG - Youtube y Netflix Free!"],
          price: "$xxxx",
          cta: "Contratar",
        },
      ],
    },
  },
  {
    id: "data-rewards",
    label: "DATA REWARDS",
    icon: "Gift",
    title: "DATA REWARDS",
    description:
      '"Data Rewards" (recompensas de datos) es un concepto que abarca diferentes soluciones diseñadas para beneficiar a los usuarios a cambio de su interacción, visualización de publicidad o uso de datos móviles, conectando marcas con consumidores.',
    mockup: {
      kind: "data-rewards",
      body: "Te quedaste sin datos, mirá una publicidad y consigue 50MB para seguir navegando",
      cancelLabel: "CANCELAR",
      confirmLabel: "CONTINUAR",
    },
  },
];
