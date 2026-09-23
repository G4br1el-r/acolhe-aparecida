import type {
  ReviewPhoto,
  ReviewTravelerType,
} from "@/@types/Modules/Hospedagens/review";

export const MIN_COMMENT_LENGTH = 40;
export const MAX_COMMENT_LENGTH = 1200;
export const MAX_TITLE_LENGTH = 80;
export const MAX_REVIEW_PHOTOS = 3;
export const MIN_SCORE = 1;
export const MAX_SCORE = 5;
export const REVIEW_PHOTO_WIDTH = 900;

export const TRAVELER_TYPE_OPTIONS: ReviewTravelerType[] = [
  "familia",
  "casal",
  "idosos",
  "romaria",
  "excursao",
  "amigos",
  "sozinho",
];

export const SCORE_LABELS: Record<number, string> = {
  1: "Ruim",
  2: "Fraca",
  3: "Ok",
  4: "Boa",
  5: "Excelente",
};

const UNSPLASH = "https://images.unsplash.com";

function photoUrl(photoId: string): string {
  return `${UNSPLASH}/${photoId}?auto=format&fit=crop&q=80&w=${REVIEW_PHOTO_WIDTH}`;
}

export const MOCK_REVIEW_PHOTOS: ReviewPhoto[] = [
  {
    id: "mock-quarto",
    url: photoUrl("photo-1631049552057-403cdb8f0658"),
    caption: "Quarto no dia da chegada",
  },
  {
    id: "mock-cafe",
    url: photoUrl("photo-1558497446-1fd7429d9be4"),
    caption: "Mesa do café da manhã",
  },
  {
    id: "mock-vista",
    url: photoUrl("photo-1609602126247-4ab7188b4aa1"),
    caption: "Vista da varanda",
  },
  {
    id: "mock-banheiro",
    url: photoUrl("photo-1702014859028-c773f15029db"),
    caption: "Banheiro",
  },
  {
    id: "mock-fachada",
    url: photoUrl("photo-1611892440504-42a792e24d32"),
    caption: "Fachada da hospedagem",
  },
  {
    id: "mock-sala",
    url: photoUrl("photo-1646974400439-321c4a9240b9"),
    caption: "Sala de estar",
  },
];
