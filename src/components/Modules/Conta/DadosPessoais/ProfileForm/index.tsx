"use client";

import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormErrorBanner } from "@/components/Modules/Conta/Auth/FormErrorBanner";
import { SelectField } from "@/components/Modules/Conta/Shared/SelectField";
import { BrandButton } from "@/components/ui/brand-button";
import { Skeleton } from "@/components/ui/skeleton";
import { TextField } from "@/components/ui/text-field";
import {
  useCurrentUser,
  useUpdateUser,
} from "@/hooks/Modules/Conta/use-session";
import { formatPhone } from "@/lib/Modules/Conta/format-phone";
import { mapZodIssues } from "@/lib/Modules/Conta/map-zod-issues";
import { toProfileFormValues } from "@/lib/Modules/Conta/profile-form-values";
import {
  BRAZILIAN_STATES,
  type ProfileFormValues,
  profileSchema,
} from "@/schemas/Modules/Conta/profile";

const PROFILE_FIELDS: (keyof ProfileFormValues)[] = [
  "fullName",
  "email",
  "phone",
  "city",
  "state",
  "birthDate",
];

const STATE_OPTIONS = BRAZILIAN_STATES.map((state) => ({
  value: state,
  label: state,
}));

export function ProfileForm() {
  const { user } = useCurrentUser();
  const updateUser = useUpdateUser();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    values: user ? toProfileFormValues(user) : undefined,
  });

  if (!user) {
    return (
      <div aria-busy className="mt-8 grid gap-5 sm:grid-cols-2">
        <Skeleton className="h-12 sm:col-span-2" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
      </div>
    );
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    clearErrors("phone");
    setValue("phone", formatPhone(event.target.value), { shouldDirty: true });
  }

  function onSubmit(values: ProfileFormValues) {
    clearErrors();
    const result = profileSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = mapZodIssues<keyof ProfileFormValues>(result.error);

      for (const field of PROFILE_FIELDS) {
        const message = fieldErrors[field];
        if (message) setError(field, { message });
      }

      return;
    }

    const data = result.data;

    updateUser.mutate(
      {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        birthDate: data.birthDate || undefined,
        address: {
          city: data.city,
          state: data.state,
          zipCode: user?.address.zipCode,
        },
      },
      {
        onSuccess: (updated) => {
          reset(toProfileFormValues(updated));
          toast.success("Dados atualizados.");
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-8 flex flex-col gap-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <TextField
            label="Nome completo"
            autoComplete="name"
            error={errors.fullName?.message}
            {...register("fullName", {
              onChange: () => clearErrors("fullName"),
            })}
          />
        </div>

        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email?.message}
          {...register("email", { onChange: () => clearErrors("email") })}
        />

        <TextField
          label="Celular"
          type="tel"
          autoComplete="tel-national"
          inputMode="numeric"
          error={errors.phone?.message}
          {...register("phone", { onChange: handlePhoneChange })}
        />

        <TextField
          label="Cidade"
          autoComplete="address-level2"
          placeholder="De onde você vem"
          error={errors.city?.message}
          {...register("city", { onChange: () => clearErrors("city") })}
        />

        <SelectField
          label="Estado"
          autoComplete="address-level1"
          placeholder="UF"
          options={STATE_OPTIONS}
          error={errors.state?.message}
          {...register("state", { onChange: () => clearErrors("state") })}
        />

        <TextField
          label="Data de nascimento"
          type="date"
          autoComplete="bday"
          hint="Ajuda a hospedagem a preparar a recepção."
          error={errors.birthDate?.message}
          {...register("birthDate", {
            onChange: () => clearErrors("birthDate"),
          })}
        />
      </div>

      <FormErrorBanner message={updateUser.error?.message} />

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-blue-950/50">
          O CPF {user.document} fica guardado e não pode ser alterado por aqui.
        </p>
        <BrandButton
          type="submit"
          isLoading={updateUser.isPending}
          loadingLabel="Salvando"
          disabled={!isDirty}
        >
          Salvar alterações
        </BrandButton>
      </div>
    </form>
  );
}
