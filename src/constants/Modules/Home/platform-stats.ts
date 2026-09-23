import { ACCOMMODATIONS } from "@/mocks/Modules/Hospedagens/accommodations";

export const PLATFORM_STATS = {
  accommodationCount: ACCOMMODATIONS.length,
  reviewCount: ACCOMMODATIONS.reduce(
    (total, accommodation) => total + accommodation.reviewCount,
    0,
  ),
  verifiedPartnerCount: ACCOMMODATIONS.length,
} as const;

export type UpcomingEvent = {
  name: string;
  date: string;
  demandLabel: string;
};

export const NEXT_HIGH_DEMAND_EVENT: UpcomingEvent = {
  name: "Festa da Padroeira",
  date: "12 de outubro",
  demandLabel: "alta procura",
};
