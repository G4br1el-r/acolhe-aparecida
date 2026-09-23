const CARD_GROUP_SIZE = 4;
const MAX_CARD_DIGITS = 16;
const MIN_CARD_DIGITS = 13;
const EXPIRY_DIGITS = 4;
const MONTHS_IN_YEAR = 12;
const CENTURY_BASE = 2000;
const LUHN_DOUBLE_THRESHOLD = 9;
const LUHN_MODULO = 10;
const CVV_MIN_LENGTH = 3;
const CVV_MAX_LENGTH = 4;

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatCardNumber(value: string): string {
  const digits = onlyDigits(value).slice(0, MAX_CARD_DIGITS);
  const groups = digits.match(new RegExp(`.{1,${CARD_GROUP_SIZE}}`, "g"));

  return groups ? groups.join(" ") : "";
}

export function formatExpiry(value: string): string {
  const digits = onlyDigits(value).slice(0, EXPIRY_DIGITS);

  if (digits.length <= 2) return digits;

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function isValidLuhn(value: string): boolean {
  const digits = onlyDigits(value);

  if (digits.length < MIN_CARD_DIGITS || digits.length > MAX_CARD_DIGITS) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > LUHN_DOUBLE_THRESHOLD) digit -= LUHN_DOUBLE_THRESHOLD;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % LUHN_MODULO === 0;
}

export function isValidExpiry(
  value: string,
  today: Date = new Date(),
): boolean {
  const digits = onlyDigits(value);
  if (digits.length !== EXPIRY_DIGITS) return false;

  const month = Number(digits.slice(0, 2));
  const year = CENTURY_BASE + Number(digits.slice(2));

  if (month < 1 || month > MONTHS_IN_YEAR) return false;

  const endOfMonth = new Date(year, month, 0);

  return endOfMonth >= today;
}

export function isValidCvv(value: string): boolean {
  const digits = onlyDigits(value);

  return digits.length >= CVV_MIN_LENGTH && digits.length <= CVV_MAX_LENGTH;
}
