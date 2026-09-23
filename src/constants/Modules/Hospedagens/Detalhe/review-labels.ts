import type { ReviewTravelerType } from "@/@types/Modules/Hospedagens/review";

export const TRAVELER_TYPE_LABELS: Record<ReviewTravelerType, string> = {
  familia: "Viagem em família",
  casal: "Casal",
  idosos: "Viagem com idosos",
  romaria: "Romaria",
  excursao: "Excursão",
  sozinho: "Viajando sozinho",
  amigos: "Grupo de amigos",
};

export const TRAVELER_TYPE_FILTERS: {
  id: ReviewTravelerType;
  label: string;
}[] = [
  { id: "familia", label: "Famílias" },
  { id: "idosos", label: "Com idosos" },
  { id: "romaria", label: "Romarias" },
  { id: "excursao", label: "Excursões" },
  { id: "casal", label: "Casais" },
];

export const VISIBLE_REVIEWS_COUNT = 4;
export const VISIBLE_AMENITIES_COUNT = 8;
