export const DEFAULT_NEXT_PATH = "/minha-viagem";

export function resolveNextPath(rawNext: string | null | undefined): string {
  if (!rawNext) return DEFAULT_NEXT_PATH;

  const isRelativePath = rawNext.startsWith("/") && !rawNext.startsWith("//");

  return isRelativePath ? rawNext : DEFAULT_NEXT_PATH;
}
