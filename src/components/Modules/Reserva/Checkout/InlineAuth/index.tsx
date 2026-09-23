"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { User, UserPersonaId } from "@/@types/Modules/Conta/user";
import { BrandButton } from "@/components/ui/brand-button";
import { SegmentedTabs } from "@/components/ui/tabs";
import { TextField } from "@/components/ui/text-field";
import {
  useLogin,
  usePersonaLogin,
  useRegister,
} from "@/hooks/Modules/Conta/use-session";
import { PERSONA_PRESETS } from "@/mocks/Modules/Conta/users";
import {
  type LoginFormValues,
  loginSchema,
  type RegisterFormValues,
  registerSchema,
} from "@/schemas/Modules/Conta/auth";
import { fieldErrorsFrom } from "@/schemas/Modules/Reserva/Checkout/checkout";

type AuthMode = "entrar" | "cadastro";

type InlineAuthProps = {
  isResolving: boolean;
};

const EMPTY_REGISTER: RegisterFormValues = {
  fullName: "",
  email: "",
  phone: "",
  document: "",
  password: "",
};

export function InlineAuth({ isResolving }: InlineAuthProps) {
  const [mode, setMode] = useState<AuthMode>("entrar");
  const [login, setLogin] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [register, setRegister] = useState<RegisterFormValues>(EMPTY_REGISTER);
  const [loginErrors, setLoginErrors] = useState<
    Partial<Record<keyof LoginFormValues, string>>
  >({});
  const [registerErrors, setRegisterErrors] = useState<
    Partial<Record<keyof RegisterFormValues, string>>
  >({});
  const [serviceError, setServiceError] = useState<string | null>(null);

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const personaMutation = usePersonaLogin();

  const isBusy =
    loginMutation.isPending ||
    registerMutation.isPending ||
    personaMutation.isPending;

  function handleSuccess(user: User) {
    setServiceError(null);
    toast.success(`Bem-vindo, ${user.fullName.split(" ")[0]}`);
  }

  function handleError(error: unknown) {
    setServiceError(
      error instanceof Error
        ? error.message
        : "Não foi possível continuar agora.",
    );
  }

  function submitLogin() {
    const result = loginSchema.safeParse(login);
    if (!result.success) {
      setLoginErrors(fieldErrorsFrom(result.error));
      return;
    }
    setLoginErrors({});
    loginMutation.mutate(result.data, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  }

  function submitRegister() {
    const result = registerSchema.safeParse(register);
    if (!result.success) {
      setRegisterErrors(fieldErrorsFrom(result.error));
      return;
    }
    setRegisterErrors({});
    registerMutation.mutate(result.data, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  }

  function submitPersona(personaId: UserPersonaId) {
    personaMutation.mutate(personaId, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  }

  if (isResolving) {
    return (
      <section className="rounded-3xl bg-white p-5 ring-1 ring-blue-950/10">
        <p className="text-sm text-blue-950/60">Carregando sua conta…</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-white p-5 ring-1 ring-blue-950/10">
      <h2 className="text-lg font-semibold text-blue-950">
        Identifique-se para continuar
      </h2>
      <p className="mt-1 text-sm text-blue-950/70">
        Sua reserva fica salva na sua conta, com comprovante e suporte. Leva
        menos de um minuto.
      </p>

      <div className="mt-5">
        <SegmentedTabs
          value={mode}
          onValueChange={setMode}
          ariaLabel="Entrar ou criar conta"
          items={[
            { value: "entrar", label: "Já tenho conta" },
            { value: "cadastro", label: "Criar conta" },
          ]}
        />
      </div>

      {mode === "entrar" ? (
        <form
          className="mt-5 grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            submitLogin();
          }}
        >
          <TextField
            label="E-mail"
            type="email"
            autoComplete="email"
            value={login.email}
            onChange={(event) =>
              setLogin({ ...login, email: event.target.value })
            }
            error={loginErrors.email}
            required
          />
          <TextField
            label="Senha"
            type="password"
            autoComplete="current-password"
            value={login.password}
            onChange={(event) =>
              setLogin({ ...login, password: event.target.value })
            }
            error={loginErrors.password}
            hint="Ambiente de demonstração: qualquer senha com 6 ou mais caracteres."
            required
          />
          {serviceError && (
            <p role="alert" className="text-sm text-red-600">
              {serviceError}
            </p>
          )}
          <BrandButton
            type="submit"
            size="lg"
            isLoading={loginMutation.isPending}
            loadingLabel="Entrando"
          >
            Entrar e continuar
          </BrandButton>
        </form>
      ) : (
        <form
          className="mt-5 grid gap-4 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            submitRegister();
          }}
        >
          <div className="sm:col-span-2">
            <TextField
              label="Nome completo"
              autoComplete="name"
              value={register.fullName}
              onChange={(event) =>
                setRegister({ ...register, fullName: event.target.value })
              }
              error={registerErrors.fullName}
              required
            />
          </div>
          <TextField
            label="E-mail"
            type="email"
            autoComplete="email"
            value={register.email}
            onChange={(event) =>
              setRegister({ ...register, email: event.target.value })
            }
            error={registerErrors.email}
            required
          />
          <TextField
            label="Celular"
            type="tel"
            inputMode="tel"
            placeholder="(12) 99999-9999"
            value={register.phone}
            onChange={(event) =>
              setRegister({ ...register, phone: event.target.value })
            }
            error={registerErrors.phone}
            required
          />
          <TextField
            label="CPF"
            inputMode="numeric"
            placeholder="000.000.000-00"
            value={register.document}
            onChange={(event) =>
              setRegister({ ...register, document: event.target.value })
            }
            error={registerErrors.document}
            required
          />
          <TextField
            label="Senha"
            type="password"
            autoComplete="new-password"
            value={register.password}
            onChange={(event) =>
              setRegister({ ...register, password: event.target.value })
            }
            error={registerErrors.password}
            required
          />
          {serviceError && (
            <p role="alert" className="text-sm text-red-600 sm:col-span-2">
              {serviceError}
            </p>
          )}
          <div className="sm:col-span-2">
            <BrandButton
              type="submit"
              size="lg"
              isLoading={registerMutation.isPending}
              loadingLabel="Criando conta"
            >
              Criar conta e continuar
            </BrandButton>
          </div>
        </form>
      )}

      <div className="mt-6 border-t border-blue-950/10 pt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
          Perfis de demonstração
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {PERSONA_PRESETS.map((persona) => (
            <li key={persona.id}>
              <button
                type="button"
                disabled={isBusy}
                onClick={() => submitPersona(persona.id)}
                className="cursor-pointer rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-950 transition-colors hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 disabled:opacity-50"
              >
                {persona.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
