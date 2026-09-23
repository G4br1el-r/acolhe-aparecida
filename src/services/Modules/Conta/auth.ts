import type { User, UserPersonaId } from "@/@types/Modules/Conta/user";
import { delay } from "@/mocks/latency";
import {
  MOCK_PASSWORD_MIN_LENGTH,
  PERSONA_PRESETS,
  SEEDED_USERS,
} from "@/mocks/Modules/Conta/users";
import { MockServiceError } from "@/mocks/scenario";
import { createMockId, readCollection, writeCollection } from "@/mocks/storage";

function readUsers(): User[] {
  return readCollection<User>("users", () => SEEDED_USERS);
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function fetchUser(userId: string): Promise<User | null> {
  await delay();

  return readUsers().find((user) => user.id === userId) ?? null;
}

export type LoginInput = {
  email: string;
  password: string;
};

export async function loginWithEmail(input: LoginInput): Promise<User> {
  await delay();

  if (input.password.length < MOCK_PASSWORD_MIN_LENGTH) {
    throw new MockServiceError("Senha incorreta. Confira e tente de novo.");
  }

  const user = readUsers().find(
    (candidate) =>
      normalizeEmail(candidate.email) === normalizeEmail(input.email),
  );

  if (!user) {
    throw new MockServiceError(
      "Não encontramos uma conta com este e-mail. Você pode criar uma em poucos segundos.",
    );
  }

  return user;
}

export async function loginAsPersona(personaId: UserPersonaId): Promise<User> {
  await delay();

  const preset = PERSONA_PRESETS.find((persona) => persona.id === personaId);
  const user = preset
    ? readUsers().find((candidate) => candidate.id === preset.userId)
    : undefined;

  if (!user) {
    throw new MockServiceError("Perfil de demonstração indisponível.");
  }

  return user;
}

export type RegisterInput = {
  fullName: string;
  email: string;
  phone: string;
  document: string;
  password: string;
};

export async function registerUser(input: RegisterInput): Promise<User> {
  await delay();

  const users = readUsers();
  const emailTaken = users.some(
    (candidate) =>
      normalizeEmail(candidate.email) === normalizeEmail(input.email),
  );

  if (emailTaken) {
    throw new MockServiceError(
      "Já existe uma conta com este e-mail. Entre com sua senha.",
    );
  }

  const user: User = {
    id: createMockId("usr"),
    personaId: "nova",
    fullName: input.fullName.trim(),
    email: normalizeEmail(input.email),
    phone: input.phone,
    document: input.document,
    address: { city: "", state: "" },
    preferences: {
      travelerProfiles: [],
      needsAccessibility: false,
      usuallyTravelsWith: "",
      preferredPayment: null,
      wantsEventAlerts: true,
    },
    frequentGuests: [],
    createdAt: new Date().toISOString(),
  };

  writeCollection("users", [...users, user]);

  return user;
}

export async function updateUser(
  userId: string,
  changes: Partial<Omit<User, "id" | "createdAt" | "personaId">>,
): Promise<User> {
  await delay();

  const users = readUsers();
  const index = users.findIndex((user) => user.id === userId);

  if (index < 0) {
    throw new MockServiceError("Conta não encontrada.");
  }

  const updated: User = { ...users[index], ...changes };
  const next = [...users];
  next[index] = updated;
  writeCollection("users", next);

  return updated;
}
