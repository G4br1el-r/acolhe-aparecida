import type { CityEvent } from "@/@types/Modules/Cidade/city";

type StayDates = {
  checkIn: string;
  checkOut: string;
};

export function findEventsDuringStay(
  events: CityEvent[],
  stay: StayDates,
): CityEvent[] {
  return events
    .filter(
      (event) =>
        event.startDate <= stay.checkOut && event.endDate >= stay.checkIn,
    )
    .sort((first, second) => first.startDate.localeCompare(second.startDate));
}
