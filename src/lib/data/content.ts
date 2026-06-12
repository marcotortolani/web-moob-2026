import { getStatValue } from '@/lib/stats'

export const stats = [
  {
    value: String(getStatValue('contentHours')),
    unit: 'HS',
    label: 'CONTENIDO EXCLUSIVO',
    icon: 'play',
  },
  {
    value: String(getStatValue('subscribers')),
    unit: '',
    label: 'SUSCRIPTORES EN NUESTROS PORTALES',
    icon: 'users',
  },
  {
    value: String(getStatValue('yearsExperience')),
    unit: 'años',
    label: 'EXPERIENCIA',
    icon: 'clock',
  },
]

export const contentCategories = [
  { label: 'cocina', id: 'cocina' },
  { label: 'música', id: 'musica' },
  { label: 'lifestyle', id: 'lifestyle' },
  { label: 'fitness', id: 'fitness' },
  { label: 'viajes', id: 'viajes' },
  { label: 'gaming', id: 'gaming' },
] as const

export const navCategories = [
  { label: 'contenido exclusivo', icon: 'film' },
  { label: 'tecnología', icon: 'cpu' },
  { label: 'eventos y experiencias', icon: 'calendar' },
  { label: 'artistas e influencers', icon: 'mic' },
  { label: 'producciones propias', icon: 'video' },
] as const

export const techServices = [
  {
    id: 'sat-push',
    label: 'Sat Push',
    description:
      'Plataforma de mensajería interactiva para enviar notificaciones push masivas y personalizadas directamente a celulares, permitiendo alertas, encuestas y enlaces directos (click-to-call, click-to-browse), impulsando la interacción y visibilidad de marcas de forma proactiva.',
    icon: 'bell',
  },
  {
    id: 'sms',
    label: 'SMS',
    description:
      'Solución de mensajería SMS masiva para campañas de marketing directo con altos índices de apertura y conversión.',
    icon: 'message-square',
  },
  {
    id: 'publicidad',
    label: 'Publicidad',
    description:
      'Red publicitaria premium para operadoras de telecomunicaciones con formatos nativos e interstitials de alta visibilidad.',
    icon: 'bar-chart',
  },
  {
    id: 'bundle',
    label: 'Bundle',
    description:
      'Soluciones de empaquetado de contenido y servicios digitales para operadoras, maximizando el ARPU y la retención de usuarios.',
    icon: 'package',
  },
  {
    id: 'data-rewards',
    label: 'Data Rewards',
    description:
      'Sistema de recompensas en datos móviles que incentiva la interacción y fidelización de usuarios con contenido premium.',
    icon: 'gift',
  },
] as const
