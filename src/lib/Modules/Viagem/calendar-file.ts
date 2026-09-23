const ICS_LINE_BREAK = "\r\n";
const ICS_DATE_PATTERN = /-/g;

export type CalendarFileInput = {
  uid: string;
  title: string;
  checkIn: string;
  checkOut: string;
  location: string;
  description: string;
  url?: string;
};

function toIcsDate(isoDate: string): string {
  return isoDate.replace(ICS_DATE_PATTERN, "");
}

function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, ";")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

export function buildCalendarFile(input: CalendarFileInput): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Acolher Aparecida//Minha Viagem//PT",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${input.uid}@acolheraparecida.com.br`,
    `DTSTART;VALUE=DATE:${toIcsDate(input.checkIn)}`,
    `DTEND;VALUE=DATE:${toIcsDate(input.checkOut)}`,
    `SUMMARY:${escapeText(input.title)}`,
    `LOCATION:${escapeText(input.location)}`,
    `DESCRIPTION:${escapeText(input.description)}`,
  ];

  if (input.url) lines.push(`URL:${input.url}`);

  lines.push("END:VEVENT", "END:VCALENDAR");

  return lines.join(ICS_LINE_BREAK);
}
