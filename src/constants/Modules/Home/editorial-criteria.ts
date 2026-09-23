import type { Accommodation } from "./accommodations";

export type EditorialCriterion = {
  id: string;
  title: string;
  description: string;
  matches: (accommodation: Accommodation) => boolean;
};

const WALKING_DISTANCE_LIMIT_IN_MINUTES = 10;
const GROUP_CAPACITY_THRESHOLD = 10;

export const EDITORIAL_CRITERIA: EditorialCriterion[] = [
  {
    id: "a-pe-ate-o-santuario",
    title: "A pé até o Santuário",
    description: `Até ${WALKING_DISTANCE_LIMIT_IN_MINUTES} minutos caminhando, sem depender de carro.`,
    matches: (accommodation) =>
      accommodation.walkingMinutes <= WALKING_DISTANCE_LIMIT_IN_MINUTES,
  },
  {
    id: "grupos-e-romarias",
    title: "Para grupos e romarias",
    description: `A partir de ${GROUP_CAPACITY_THRESHOLD} pessoas, com espaço para van ou ônibus.`,
    matches: (accommodation) =>
      accommodation.totalCapacity >= GROUP_CAPACITY_THRESHOLD &&
      (accommodation.parking.includes("van") ||
        accommodation.parking.includes("onibus")),
  },
  {
    id: "acessibilidade-verificada",
    title: "Acessibilidade verificada",
    description: "Entrada, banheiro e circulação conferidos pela nossa equipe.",
    matches: (accommodation) =>
      accommodation.badges.includes("acessibilidade-verificada"),
  },
  {
    id: "com-cafe-da-manha",
    title: "Com café da manhã incluso",
    description: "Primeira refeição resolvida antes da missa.",
    matches: (accommodation) => accommodation.meals.includes("cafe"),
  },
];
