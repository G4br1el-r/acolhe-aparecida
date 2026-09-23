import { pluralize } from "@/lib/Modules/Hospedagens/format-date";
import type { SearchParams } from "@/schemas/Modules/Hospedagens/Busca/search-params";
import type { SearchDraft } from "@/store/Modules/Hospedagens/Busca/use-search-store";

export function draftToSearchParams(draft: SearchDraft): Partial<SearchParams> {
  return {
    checkin: draft.checkIn ?? undefined,
    checkout: draft.checkOut ?? undefined,
    adultos: draft.adults,
    criancas: draft.children,
    idades: draft.childAges.slice(0, draft.children),
    idosos: draft.seniors,
    quartos: draft.rooms,
    acessibilidade: draft.needsAccessibility,
  };
}

export function searchParamsToDraft(params: SearchParams): SearchDraft {
  return {
    checkIn: params.checkin ?? null,
    checkOut: params.checkout ?? null,
    adults: params.adultos,
    children: params.criancas,
    childAges: params.idades,
    seniors: params.idosos,
    rooms: params.quartos,
    needsAccessibility: params.acessibilidade,
  };
}

export function describeGuests(
  draft: Pick<SearchDraft, "adults" | "children" | "seniors" | "rooms">,
): string {
  const parts = [pluralize(draft.adults, "adulto", "adultos")];

  if (draft.children > 0) {
    parts.push(pluralize(draft.children, "criança", "crianças"));
  }
  if (draft.seniors > 0) {
    parts.push(pluralize(draft.seniors, "idoso", "idosos"));
  }

  const guests = parts.join(", ");
  const rooms = pluralize(draft.rooms, "quarto", "quartos");

  return `${guests} · ${rooms}`;
}

export function describeGuestsShort(
  draft: Pick<SearchDraft, "adults" | "children" | "seniors" | "rooms">,
): string {
  const total = draft.adults + draft.children + draft.seniors;

  return `${pluralize(total, "hóspede", "hóspedes")} · ${pluralize(draft.rooms, "quarto", "quartos")}`;
}
