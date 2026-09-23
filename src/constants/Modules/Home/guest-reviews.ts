import type { TravelerProfileId } from "./traveler-profiles";

export type GuestReview = {
  id: string;
  quote: string;
  authorName: string;
  travelContext: string;
  stayedAt: string;
  rating: number;
  accommodationName: string;
  highlight: string;
  portrait: string;
  portraitAlt: string;
  relatedProfiles: TravelerProfileId[];
};

export const REVIEW_RATING_SCALE = 5;

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: "familia-outubro",
    quote:
      "Minha mãe tem 78 anos e conseguiu ir e voltar do Santuário a pé, no ritmo dela. Era exatamente isso que eu precisava saber antes de reservar.",
    authorName: "Cristiane M.",
    travelContext: "Família com 2 crianças e avó · 3 noites",
    stayedAt: "Outubro",
    rating: 4.9,
    accommodationName: "Pousada Santa Clara",
    highlight: "550 m do Santuário",
    portrait:
      "https://images.unsplash.com/photo-1662850886700-4ec19bd30d11?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900&h=1200",
    portraitAlt: "Retrato de Cristiane, hóspede que viajou com a família",
    relatedProfiles: ["familia-criancas", "idosos"],
  },
  {
    id: "romaria-van",
    quote:
      "Somos 22 pessoas de van. Foi a primeira vez que reservei sem precisar ligar pra ninguém e sem ficar na dúvida se caberia o veículo.",
    authorName: "Pe. Anselmo R.",
    travelContext: "Romaria de 22 pessoas · 2 noites",
    stayedAt: "Agosto",
    rating: 4.8,
    accommodationName: "Hotel Rainha da Paz",
    highlight: "Estacionamento para van",
    portrait:
      "https://images.unsplash.com/photo-1711786005061-3687e056b9e3?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900&h=1200",
    portraitAlt: "Retrato do Padre Anselmo, responsável por uma romaria",
    relatedProfiles: ["grupo-romarias", "estacionamento-van"],
  },
  {
    id: "acessibilidade-cadeira",
    quote:
      "Meu marido usa cadeira de rodas. A hospedagem era do jeito que estava descrito, sem degrau na entrada e com barra no banheiro. Não teve surpresa.",
    authorName: "Regina P.",
    travelContext: "Casal, com acessibilidade · 2 noites",
    stayedAt: "Maio",
    rating: 5,
    accommodationName: "Residencial Monte Carmelo",
    highlight: "Entrada sem degrau",
    portrait:
      "https://images.unsplash.com/photo-1758691031787-90867cb6fb2c?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900&h=1200",
    portraitAlt: "Retrato de Regina e seu marido, hóspedes do Monte Carmelo",
    relatedProfiles: ["acessibilidade", "idosos"],
  },
];
