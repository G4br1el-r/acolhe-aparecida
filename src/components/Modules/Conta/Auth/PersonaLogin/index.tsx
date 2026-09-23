"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { UserPersonaId } from "@/@types/Modules/Conta/user";
import { usePersonaLogin } from "@/hooks/Modules/Conta/use-session";
import {
  MOCK_PASSWORD_MIN_LENGTH,
  PERSONA_PRESETS,
} from "@/mocks/Modules/Conta/users";

export function PersonaLogin() {
  const personaLogin = usePersonaLogin();

  function handleSelect(personaId: UserPersonaId) {
    personaLogin.mutate(personaId, {
      onSuccess: (user) => {
        toast.success(`Olá, ${user.fullName.split(" ")[0]}`, {
          description: "Você entrou com um perfil de demonstração.",
        });
      },
      onError: (error) => toast.error(error.message),
    });
  }

  return (
    <section
      aria-labelledby="persona-login-title"
      className="flex flex-col gap-3"
    >
      <div>
        <h3
          id="persona-login-title"
          className="text-xs font-semibold uppercase tracking-wide text-blue-900/60"
        >
          Entrar com um perfil de demonstração
        </h3>
        <p className="mt-1 text-sm text-blue-950/60">
          Cada perfil mostra a plataforma em um momento diferente da viagem. Nos
          e-mails de demonstração, qualquer senha com {MOCK_PASSWORD_MIN_LENGTH}{" "}
          ou mais caracteres funciona.
        </p>
      </div>

      <ul className="flex flex-col gap-2">
        {PERSONA_PRESETS.map((persona) => {
          const isLoadingThis =
            personaLogin.isPending && personaLogin.variables === persona.id;

          return (
            <li key={persona.id}>
              <button
                type="button"
                onClick={() => handleSelect(persona.id)}
                disabled={personaLogin.isPending}
                aria-busy={isLoadingThis || undefined}
                className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl bg-blue-50/60 px-4 py-3 text-left transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-blue-950">
                    {persona.label}
                  </span>
                  <span className="block text-xs text-blue-950/60">
                    {persona.description}
                  </span>
                </span>
                {isLoadingThis ? (
                  <Loader2
                    className="h-4 w-4 shrink-0 animate-spin text-blue-900"
                    aria-hidden
                  />
                ) : (
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-blue-900/50 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
