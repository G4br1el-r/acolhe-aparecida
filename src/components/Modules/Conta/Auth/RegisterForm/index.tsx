"use client";

import Link from "next/link";
import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormErrorBanner } from "@/components/Modules/Conta/Auth/FormErrorBanner";
import { PasswordField } from "@/components/Modules/Conta/Auth/PasswordField";
import { BrandButton } from "@/components/ui/brand-button";
import { TextField } from "@/components/ui/text-field";
import { useNextPath } from "@/hooks/Modules/Conta/use-next-path";
import { useRegister } from "@/hooks/Modules/Conta/use-session";
import { formatDocument } from "@/lib/Modules/Conta/format-document";
import { formatPhone } from "@/lib/Modules/Conta/format-phone";
import { mapZodIssues } from "@/lib/Modules/Conta/map-zod-issues";
import { DEFAULT_NEXT_PATH } from "@/lib/Modules/Conta/resolve-next-path";
import { MOCK_PASSWORD_MIN_LENGTH } from "@/mocks/Modules/Conta/users";
import {
  type RegisterFormValues,
  registerSchema,
} from "@/schemas/Modules/Conta/auth";

const REGISTER_FIELDS: (keyof RegisterFormValues)[] = [
  "fullName",
  "email",
  "phone",
  "document",
  "password",
];

export function RegisterForm() {
  const registerMutation = useRegister();
  const nextPath = useNextPath();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      document: "",
      password: "",
    },
  });

  const loginHref =
    nextPath === DEFAULT_NEXT_PATH
      ? "/entrar"
      : `/entrar?next=${encodeURIComponent(nextPath)}`;

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    clearErrors("phone");
    setValue("phone", formatPhone(event.target.value));
  }

  function handleDocumentChange(event: ChangeEvent<HTMLInputElement>) {
    clearErrors("document");
    setValue("document", formatDocument(event.target.value));
  }

  function onSubmit(values: RegisterFormValues) {
    clearErrors();
    const result = registerSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = mapZodIssues<keyof RegisterFormValues>(result.error);

      for (const field of REGISTER_FIELDS) {
        const message = fieldErrors[field];
        if (message) setError(field, { message });
      }

      return;
    }

    registerMutation.mutate(result.data, {
      onSuccess: (user) => {
        toast.success(`Conta criada, ${user.fullName.split(" ")[0]}`, {
          description: "Agora é só escolher onde ficar.",
        });
      },
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
          Crie sua conta
        </h2>
        <p className="mt-2 text-sm text-blue-950/65 md:text-base">
          Leva menos de um minuto. Com a conta, sua reserva, seus hóspedes e
          seus favoritos ficam guardados para as próximas idas.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        <TextField
          label="Nome completo"
          autoComplete="name"
          placeholder="Como está no seu documento"
          error={errors.fullName?.message}
          {...register("fullName", {
            onChange: () => clearErrors("fullName"),
          })}
        />

        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="voce@exemplo.com.br"
          error={errors.email?.message}
          {...register("email", { onChange: () => clearErrors("email") })}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Celular"
            type="tel"
            autoComplete="tel-national"
            inputMode="numeric"
            placeholder="(12) 99999-9999"
            error={errors.phone?.message}
            {...register("phone", { onChange: handlePhoneChange })}
          />

          <TextField
            label="CPF"
            inputMode="numeric"
            placeholder="000.000.000-00"
            hint="Pedido pelas hospedagens no check-in."
            error={errors.document?.message}
            {...register("document", { onChange: handleDocumentChange })}
          />
        </div>

        <PasswordField
          label="Senha"
          autoComplete="new-password"
          placeholder={`Pelo menos ${MOCK_PASSWORD_MIN_LENGTH} caracteres`}
          error={errors.password?.message}
          {...register("password", {
            onChange: () => clearErrors("password"),
          })}
        />

        <FormErrorBanner message={registerMutation.error?.message} />

        <BrandButton
          type="submit"
          size="lg"
          fullWidth
          isLoading={registerMutation.isPending}
          loadingLabel="Criando sua conta"
        >
          Criar conta
        </BrandButton>

        <p className="text-center text-xs text-blue-950/55">
          Ao continuar, você concorda com os{" "}
          <Link
            href="/termos"
            className="font-medium text-blue-900 underline-offset-4 hover:underline"
          >
            Termos de uso
          </Link>{" "}
          e a{" "}
          <Link
            href="/privacidade"
            className="font-medium text-blue-900 underline-offset-4 hover:underline"
          >
            Política de privacidade
          </Link>
          .
        </p>
      </form>

      <p className="text-center text-sm text-blue-950/65">
        Já tem conta?{" "}
        <Link
          href={loginHref}
          className="font-semibold text-blue-900 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
