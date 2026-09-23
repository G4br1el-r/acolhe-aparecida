const DOCUMENT_DIGITS_LENGTH = 11;
const FIRST_GROUP_END = 3;
const SECOND_GROUP_END = 6;
const THIRD_GROUP_END = 9;

export function formatDocument(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, DOCUMENT_DIGITS_LENGTH);

  if (digits.length <= FIRST_GROUP_END) return digits;

  if (digits.length <= SECOND_GROUP_END) {
    return `${digits.slice(0, FIRST_GROUP_END)}.${digits.slice(FIRST_GROUP_END)}`;
  }

  if (digits.length <= THIRD_GROUP_END) {
    return `${digits.slice(0, FIRST_GROUP_END)}.${digits.slice(FIRST_GROUP_END, SECOND_GROUP_END)}.${digits.slice(SECOND_GROUP_END)}`;
  }

  return `${digits.slice(0, FIRST_GROUP_END)}.${digits.slice(FIRST_GROUP_END, SECOND_GROUP_END)}.${digits.slice(SECOND_GROUP_END, THIRD_GROUP_END)}-${digits.slice(THIRD_GROUP_END)}`;
}
