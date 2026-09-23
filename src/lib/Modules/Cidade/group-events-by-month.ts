import type { CityEvent } from "@/@types/Modules/Cidade/city";
import { formatMonthYear } from "@/lib/Modules/Hospedagens/format-date";

const MONTH_KEY_LENGTH = 7;

export type EventMonthGroup = {
  key: string;
  label: string;
  events: CityEvent[];
};

export function groupEventsByMonth(events: CityEvent[]): EventMonthGroup[] {
  const groups = new Map<string, EventMonthGroup>();

  for (const event of events) {
    const key = event.startDate.slice(0, MONTH_KEY_LENGTH);
    const existing = groups.get(key);

    if (existing) {
      existing.events.push(event);
      continue;
    }

    groups.set(key, {
      key,
      label: formatMonthYear(event.startDate),
      events: [event],
    });
  }

  return Array.from(groups.values());
}
