import { formatDistance, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatRelativeTime(
  isoDate: string,
  now: Date = new Date(),
): string {
  return formatDistance(parseISO(isoDate), now, {
    addSuffix: true,
    locale: ptBR,
  });
}
