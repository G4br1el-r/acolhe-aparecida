import { differenceInCalendarDays } from "date-fns";
import { parseIsoDate } from "@/lib/Modules/Hospedagens/Busca/availability";

const TOMORROW_IN_DAYS = 1;

export type CountdownTone =
  | "upcoming"
  | "imminent"
  | "today"
  | "during"
  | "past";

export type Countdown = {
  label: string;
  tone: CountdownTone;
  daysUntilCheckIn: number;
};

type StayDates = {
  checkIn: string;
  checkOut: string;
};

export function buildCountdown(
  stay: StayDates,
  today: Date = new Date(),
): Countdown {
  const daysUntilCheckIn = differenceInCalendarDays(
    parseIsoDate(stay.checkIn),
    today,
  );
  const daysUntilCheckOut = differenceInCalendarDays(
    parseIsoDate(stay.checkOut),
    today,
  );

  if (daysUntilCheckOut <= 0) {
    return { label: "Viagem concluída", tone: "past", daysUntilCheckIn };
  }

  if (daysUntilCheckIn < 0) {
    return {
      label: "Você está em Aparecida",
      tone: "during",
      daysUntilCheckIn,
    };
  }

  if (daysUntilCheckIn === 0) {
    return { label: "É hoje, boa viagem", tone: "today", daysUntilCheckIn };
  }

  if (daysUntilCheckIn === TOMORROW_IN_DAYS) {
    return { label: "É amanhã", tone: "imminent", daysUntilCheckIn };
  }

  return {
    label: `Faltam ${daysUntilCheckIn} dias`,
    tone: "upcoming",
    daysUntilCheckIn,
  };
}
