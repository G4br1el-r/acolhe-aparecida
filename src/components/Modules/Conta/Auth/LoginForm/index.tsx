"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormErrorBanner } from "@/components/Modules/Conta/Auth/FormErrorBanner";
import { PasswordField } from "@/components/Modules/Conta/Auth/PasswordField";
import { PersonaLogin } from "@/components/Modules/Conta/Auth/PersonaLogin";
import { BrandButton } from "@/components/ui/brand-button";
import { TextField } from "@/components/ui/text-field";
import { useNextPath } from "@/hooks/Modules/Conta/use-next-path";
import { useLogin } from "@/hooks/Modules/Conta/use-session";
import { mapZodIssues } from "@/lib/Modules/Conta/map-zod-issues";
import { DEFAULT_NEXT_PATH } from "@/lib/Modules/Conta/resolve-next-path";
import {
  type LoginFormValues,
  loginSchema,
} from "@/schemas/Modules/Conta/auth";

const LOGIN_FIELDS: (keyof LoginFormValues)[] = ["email", "password"];

export function LoginForm() {
  const login = useLogin();
  const nextPath = useNextPath();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const registerHref =
    nextPath === DEFAULT_NEXT_PATH
      ? "/cadastro"
      : `/cadastro?next=${encodeURIComponent(nextPath)}`;

  function onSubmit(values: LoginFormValues) {
    clearErrors();
    const result = loginSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = mapZodIssues<keyof LoginFormValues>(result.error);

      for (const field of LOGIN_FIELDS) {
        const message = fieldErrors[field];
        if (message) setError(field, { message });
      }

      return;
    }

    login.mutate(result.data, {
      onSuccess: (user) => {
        toast.success(`Bem-vindo de volta, ${user.fullName.split(" ")[0]}`);
      },
    });
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
          Que bom ter você de volta
        </h2>
        <p className="mt-2 text-sm text-blue-950/65 md:text-base">
          Entre para acompanhar sua reserva, seus favoritos e tudo o que já
          organizou para Aparecida.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="voce@exemplo.com.br"
          error={errors.email?.message}
          {...register("email", { onChange: () => clearErrors("email") })}
        />

        <PasswordField
          label="Senha"
          autoComplete="current-password"
          placeholder="Sua senha"
          error={errors.password?.message}
          {...register("password", {
            onChange: () => clearErrors("password"),
          })}
        />

        <FormErrorBanner message={login.error?.message} />

        <BrandButton
          type="submit"
          size="lg"
          fullWidth
          isLoading={login.isPending}
          loadingLabel="Entrando"
        >
          Entrar
        </BrandButton>

        <p className="text-center text-sm text-blue-950/65">
          Ainda não tem conta?{" "}
          <Link
            href={registerHref}
            className="font-semibold text-blue-900 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            Criar conta
          </Link>
        </p>
      </form>

      <div className="flex items-center gap-4" aria-hidden>
        <span className="h-px flex-1 bg-blue-950/10" />
        <span className="text-xs font-medium text-blue-950/40">ou</span>
        <span className="h-px flex-1 bg-blue-950/10" />
      </div>

      <PersonaLogin />
    </div>
  );
}
