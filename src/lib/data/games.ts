export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  color: string;
}

export const games: Game[] = [
  {
    id: "trivias",
    title: "TRIVIAS",
    description:
      "Competencias de conocimiento en múltiples categorías. Los usuarios responden preguntas y acumulan puntos para ganar premios exclusivos de su operadora.",
    icon: "HelpCircle",
    color: "#40b09d",
  },
  {
    id: "memotest",
    title: "MEMOTEST",
    description:
      "Juego de memoria clásico reinventado con contenido de marca. Encuentra los pares y desbloquea beneficios especiales para suscriptores.",
    icon: "Grid2X2",
    color: "#40b09d",
  },
  {
    id: "puzzle",
    title: "PUZZLE",
    description:
      "Rompecabezas interactivos con imágenes exclusivas de artistas y eventos. Completá el puzzle y ganás acceso a contenido premium.",
    icon: "Puzzle",
    color: "#40b09d",
  },
  {
    id: "ruleta",
    title: "RULETA",
    description:
      "Girá la ruleta y descubrí qué premio te espera. Premios diarios, semanales y sorteos especiales para usuarios activos.",
    icon: "RotateCcw",
    color: "#40b09d",
  },
  {
    id: "predicciones",
    title: "PREDICCIONES",
    description:
      "Apostá por tus equipos y artistas favoritos. Sistema de predicciones con ranking y premios para los más acertados de la temporada.",
    icon: "TrendingUp",
    color: "#40b09d",
  },
];
