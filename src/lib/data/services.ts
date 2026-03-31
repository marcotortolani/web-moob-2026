export interface TechService {
  id: string;
  label: string;
  icon: string; // lucide icon name
  title: string;
  description: string;
  mockupLabel: string;
}

export const techServices: TechService[] = [
  {
    id: "sat-push",
    label: "SAT PUSH",
    icon: "Bell",
    title: "SAT PUSH",
    description:
      "Plataforma de mensajería interactiva para enviar notificaciones push masivas y personalizadas directamente a celulares, permitiendo alertas, encuestas y enlaces directos (click-to-call, click-to-browse), impulsando la interacción y visibilidad de marcas de forma proactiva.",
    mockupLabel: "Push Notification",
  },
  {
    id: "sms",
    label: "SMS",
    icon: "MessageSquare",
    title: "SMS",
    description:
      "Envío masivo de mensajes de texto personalizados con alta tasa de apertura. Campañas bidireccionales, concursos, votaciones y servicios de suscripción con cobertura en todos los operadores de la región.",
    mockupLabel: "SMS Campaign",
  },
  {
    id: "publicidad",
    label: "PUBLICIDAD",
    icon: "BarChart2",
    title: "PUBLICIDAD",
    description:
      "Soluciones de publicidad digital integradas en nuestras plataformas de contenido. Segmentación avanzada por operadora, región y perfil de usuario para maximizar el retorno de inversión de cada campaña.",
    mockupLabel: "Ad Platform",
  },
  {
    id: "bundle",
    label: "BUNDLE",
    icon: "Package",
    title: "BUNDLE",
    description:
      "Paquetes de servicios integrados que combinan contenido, datos y valor agregado para los suscriptores de operadoras móviles. Modelos flexibles de monetización adaptados a cada mercado.",
    mockupLabel: "Bundle Service",
  },
  {
    id: "data-rewards",
    label: "DATA REWARDS",
    icon: "Gift",
    title: "DATA REWARDS",
    description:
      "Programa de recompensas en datos móviles para fidelizar usuarios. Los suscriptores acumulan datos al interactuar con contenido y marcas, creando un ecosistema de engagement de alto valor.",
    mockupLabel: "Rewards Program",
  },
];
