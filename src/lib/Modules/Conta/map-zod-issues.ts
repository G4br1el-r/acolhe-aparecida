import type { ZodError } from "zod";

export type FieldErrorMap<Field extends string> = Partial<
  Record<Field, string>
>;

export function mapZodIssues<Field extends string>(
  error: ZodError,
): FieldErrorMap<Field> {
  const result: FieldErrorMap<Field> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];

    if (typeof field !== "string") continue;

    const key = field as Field;

    if (!result[key]) {
      result[key] = issue.message;
    }
  }

  return result;
}
