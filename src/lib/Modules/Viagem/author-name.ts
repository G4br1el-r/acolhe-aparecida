const HONORIFICS = new Set(["pe.", "pe", "dr.", "dra.", "sr.", "sra.", "frei"]);

export function buildReviewAuthorName(fullName: string): string {
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0 && !HONORIFICS.has(part.toLowerCase()));

  if (parts.length === 0) return "Hóspede";
  if (parts.length === 1) return parts[0];

  const firstName = parts[0];
  const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();

  return `${firstName} ${lastInitial}.`;
}
