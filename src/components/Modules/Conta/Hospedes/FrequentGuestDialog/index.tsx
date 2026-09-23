"use client";

import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import type { FrequentGuest } from "@/@types/Modules/Conta/user";
import { FormErrorBanner } from "@/components/Modules/Conta/Auth/FormErrorBanner";
import { BrandButton } from "@/components/ui/brand-button";
import { Chip } from "@/components/ui/chip";
import { Dialog } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";
import type { FrequentGuestInput } from "@/hooks/Modules/Conta/use-frequent-guests";
import { formatDocument } from "@/lib/Modules/Conta/format-document";
import { mapZodIssues } from "@/lib/Modules/Conta/map-zod-issues";
import {
  type FrequentGuestFormValues,
  frequentGuestSchema,
  GUEST_AGE_GROUP_LABELS,
  GUEST_AGE_GROUPS,
} from "@/schemas/Modules/Conta/frequent-guest";

const FORM_ID = "frequent-guest-form";

const GUEST_FIELDS: (keyof FrequentGuestFormValues)[] = [
  "fullName",
  "relationship",
  "ageGroup",
  "age",
  "document",
  "needsAccessibility",
];

const EMPTY_VALUES: FrequentGuestFormValues = {
  fullName: "",
  relationship: "",
  ageGroup: "adulto",
  age: "",
  document: "",
  needsAccessibility: false,
};

type FrequentGuestDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guest: FrequentGuest | null;
  onSave: (input: FrequentGuestInput) => Promise<unknown>;
  isSaving: boolean;
  errorMessage?: string;
};

export function FrequentGuestDialog({
  open,
  onOpenChange,
  guest,
  onSave,
  isSaving,
  errorMessage,
}: FrequentGuestDialogProps) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<FrequentGuestFormValues>({
    values: guest
      ? {
          fullName: guest.fullName,
          relationship: guest.relationship,
          ageGroup: guest.ageGroup,
          age: guest.age === undefined ? "" : String(guest.age),
          document: guest.document ?? "",
          needsAccessibility: guest.needsAccessibility,
        }
      : EMPTY_VALUES,
  });

  const ageGroup = watch("ageGroup");
  const needsAccessibility = watch("needsAccessibility");

  function handleDocumentChange(event: ChangeEvent<HTMLInputElement>) {
    clearErrors("document");
    setValue("document", formatDocument(event.target.value));
  }

  async function onSubmit(values: FrequentGuestFormValues) {
    clearErrors();
    const result = frequentGuestSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = mapZodIssues<keyof FrequentGuestFormValues>(
        result.error,
      );

      for (const field of GUEST_FIELDS) {
        const message = fieldErrors[field];
        if (message) setError(field, { message });
      }

      return;
    }

    const data = result.data;

    await onSave({
      fullName: data.fullName,
      relationship: data.relationship,
      ageGroup: data.ageGroup,
      age: data.age === "" ? undefined : Number(data.age),
      document: data.document === "" ? undefined : data.document,
      needsAccessibility: data.needsAccessibility,
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={guest ? "Editar hóspede" : "Novo hóspede frequente"}
      description="Essas pessoas aparecem como sugestão ao montar a lista de hóspedes de uma reserva."
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <BrandButton variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </BrandButton>
          <BrandButton
            type="submit"
            form={FORM_ID}
            isLoading={isSaving}
            loadingLabel="Salvando"
          >
            {guest ? "Salvar alterações" : "Adicionar hóspede"}
          </BrandButton>
        </div>
      }
    >
      <form
        id={FORM_ID}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        <TextField
          label="Nome completo"
          autoComplete="off"
          placeholder="Como está no documento"
          error={errors.fullName?.message}
          {...register("fullName", {
            onChange: () => clearErrors("fullName"),
          })}
        />

        <TextField
          label="Quem é para você"
          autoComplete="off"
          placeholder="Ex.: esposa, filho, coordenadora do grupo"
          error={errors.relationship?.message}
          {...register("relationship", {
            onChange: () => clearErrors("relationship"),
          })}
        />

        <fieldset>
          <legend className="text-sm font-medium text-blue-950">
            Faixa etária
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {GUEST_AGE_GROUPS.map((group) => (
              <Chip
                key={group}
                label={GUEST_AGE_GROUP_LABELS[group]}
                isSelected={ageGroup === group}
                onToggle={() => {
                  clearErrors("ageGroup");
                  setValue("ageGroup", group);
                }}
              />
            ))}
          </div>
          {errors.ageGroup?.message && (
            <p role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.ageGroup.message}
            </p>
          )}
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Idade"
            type="number"
            inputMode="numeric"
            placeholder="Opcional"
            hint="Importante para crianças e para tarifas de idosos."
            error={errors.age?.message}
            {...register("age", { onChange: () => clearErrors("age") })}
          />

          <TextField
            label="CPF"
            inputMode="numeric"
            placeholder="Opcional"
            hint="Agiliza o check-in na hospedagem."
            error={errors.document?.message}
            {...register("document", { onChange: handleDocumentChange })}
          />
        </div>

        <Switch
          label="Precisa de acessibilidade"
          description="Quarto adaptado, acesso sem escadas ou barras de apoio."
          checked={needsAccessibility}
          onCheckedChange={(checked) => setValue("needsAccessibility", checked)}
        />

        <FormErrorBanner message={errorMessage} />
      </form>
    </Dialog>
  );
}
