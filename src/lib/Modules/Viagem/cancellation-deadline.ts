import { subDays } from "date-fns";
import {
  parseIsoDate,
  toIsoDate,
} from "@/lib/Modules/Hospedagens/Busca/availability";

export function freeCancellationDeadline(
  checkIn: string,
  freeUntilDaysBefore: number,
): string {
  return toIsoDate(subDays(parseIsoDate(checkIn), freeUntilDaysBefore));
}
