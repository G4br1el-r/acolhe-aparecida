import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const SHORT_DATE_FORMAT = "d 'de' MMM";
const LONG_DATE_FORMAT = "EEEE, d 'de' MMMM";
const NUMERIC_DATE_FORMAT = "dd/MM/yyyy";
const MONTH_YEAR_FORMAT = "MMMM 'de' yyyy";

export function formatShortDate(isoDate: string): string {
  return format(parseISO(isoDate), SHORT_DATE_FORMAT, { locale: ptBR }).replace(
    ".",
    "",
  );
}

export function formatLongDate(isoDate: string): string {
  return format(parseISO(isoDate), LONG_DATE_FORMAT, { locale: ptBR });
}

export function formatNumericDate(isoDate: string): string {
  return format(parseISO(isoDate), NUMERIC_DATE_FORMAT);
}

export function formatMonthYear(isoDate: string): string {
  const formatted = format(parseISO(isoDate), MONTH_YEAR_FORMAT, {
    locale: ptBR,
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function formatStayRange(checkIn: string, checkOut: string): string {
  return `${formatShortDate(checkIn)} a ${formatShortDate(checkOut)}`;
}

export function daysUntil(isoDate: string, today: Date = new Date()): number {
  return differenceInCalendarDays(parseISO(isoDate), today);
}

export function pluralize(
  count: number,
  singular: string,
  plural: string,
): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
