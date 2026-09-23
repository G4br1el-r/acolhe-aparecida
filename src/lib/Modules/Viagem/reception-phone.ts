import { hashString } from "@/lib/Modules/Hospedagens/hash";

const APARECIDA_AREA_CODE = "12";
const LANDLINE_PREFIX = "3105";
const LINE_NUMBER_RANGE = 9000;
const LINE_NUMBER_OFFSET = 1000;

export function buildReceptionPhone(slug: string): string {
  const lineNumber =
    (hashString(slug) % LINE_NUMBER_RANGE) + LINE_NUMBER_OFFSET;

  return `(${APARECIDA_AREA_CODE}) ${LANDLINE_PREFIX}-${lineNumber}`;
}
