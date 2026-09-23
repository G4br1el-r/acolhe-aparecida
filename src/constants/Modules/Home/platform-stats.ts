export const PLATFORM_STATS = {
  accommodationCount: 47,
  reviewCount: 1240,
  verifiedPartnerCount: 39,
} as const;

export type UpcomingEvent = {
  name: string;
  date: string;
  demandLabel: string;
};

export const NEXT_HIGH_DEMAND_EVENT: UpcomingEvent = {
  name: "Romaria de N. Sra. Aparecida",
  date: "12 de outubro",
  demandLabel: "alta procura",
};
