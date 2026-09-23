const PHONE_DIGITS_LENGTH = 11;
const AREA_CODE_LENGTH = 2;
const LANDLINE_DIGITS_LENGTH = 10;
const LANDLINE_PREFIX_END = 6;
const MOBILE_PREFIX_END = 7;

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, PHONE_DIGITS_LENGTH);

  if (digits.length === 0) return "";

  if (digits.length <= AREA_CODE_LENGTH) return `(${digits}`;

  const areaCode = digits.slice(0, AREA_CODE_LENGTH);
  const rest = digits.slice(AREA_CODE_LENGTH);
  const prefixEnd =
    digits.length <= LANDLINE_DIGITS_LENGTH
      ? LANDLINE_PREFIX_END - AREA_CODE_LENGTH
      : MOBILE_PREFIX_END - AREA_CODE_LENGTH;

  if (rest.length <= prefixEnd) return `(${areaCode}) ${rest}`;

  return `(${areaCode}) ${rest.slice(0, prefixEnd)}-${rest.slice(prefixEnd)}`;
}
