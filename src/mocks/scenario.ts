export type MockScenario = "erro" | "vazio" | "lento";

export const SCENARIO_SEARCH_PARAM = "cenario";

export class MockServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MockServiceError";
  }
}

export function parseScenario(value: string | undefined): MockScenario | null {
  if (value === "erro" || value === "vazio" || value === "lento") {
    return value;
  }

  return null;
}
