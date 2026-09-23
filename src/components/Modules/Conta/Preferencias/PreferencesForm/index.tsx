"use client";

import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import type { UserPreferences } from "@/@types/Modules/Conta/user";
import { FormErrorBanner } from "@/components/Modules/Conta/Auth/FormErrorBanner";
import { BrandButton } from "@/components/ui/brand-button";
import { Chip } from "@/components/ui/chip";
import { Switch } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";
import {
  TRAVELER_PROFILES,
  type TravelerProfileId,
} from "@/constants/Modules/Home/traveler-profiles";
import { useUpdateUser } from "@/hooks/Modules/Conta/use-session";

type PaymentOption = {
  value: NonNullable<UserPreferences["preferredPayment"]>;
  label: string;
};

const PAYMENT_OPTIONS: PaymentOption[] = [
  { value: "pix", label: "Pix" },
  { value: "cartao", label: "Cartão de crédito" },
];

type PreferencesFormProps = {
  initialPreferences: UserPreferences;
};

export function PreferencesForm({ initialPreferences }: PreferencesFormProps) {
  const updateUser = useUpdateUser();
  const [preferences, setPreferences] =
    useState<UserPreferences>(initialPreferences);
  const [savedPreferences, setSavedPreferences] =
    useState<UserPreferences>(initialPreferences);

  const isDirty =
    JSON.stringify(preferences) !== JSON.stringify(savedPreferences);

  function toggleProfile(profileId: TravelerProfileId) {
    setPreferences((current) => ({
      ...current,
      travelerProfiles: current.travelerProfiles.includes(profileId)
        ? current.travelerProfiles.filter((id) => id !== profileId)
        : [...current.travelerProfiles, profileId],
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateUser.mutate(
      { preferences },
      {
        onSuccess: (user) => {
          setSavedPreferences(user.preferences);
          toast.success("Preferências salvas.", {
            description: "Vamos usar isso para sugerir hospedagens melhores.",
          });
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-10">
      <fieldset>
        <legend className="text-sm font-semibold text-blue-950">
          Como você costuma viajar para Aparecida?
        </legend>
        <p className="mt-1 text-sm text-blue-950/60">
          Escolha quantos quiser. Isso ajusta o que destacamos na busca.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {TRAVELER_PROFILES.map((profile) => (
            <Chip
              key={profile.id}
              label={profile.label}
              icon={profile.icon}
              isSelected={preferences.travelerProfiles.includes(profile.id)}
              onToggle={() => toggleProfile(profile.id)}
            />
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1 border-t border-blue-950/10 pt-8">
        <Switch
          label="Preciso de acessibilidade"
          description="Mostramos primeiro hospedagens com quartos e acessos adaptados."
          checked={preferences.needsAccessibility}
          onCheckedChange={(checked) =>
            setPreferences((current) => ({
              ...current,
              needsAccessibility: checked,
            }))
          }
        />
        <Switch
          label="Avisar sobre datas e eventos"
          description="Festa da Padroeira, feriados e romarias que lotam a cidade."
          checked={preferences.wantsEventAlerts}
          onCheckedChange={(checked) =>
            setPreferences((current) => ({
              ...current,
              wantsEventAlerts: checked,
            }))
          }
        />
      </div>

      <div className="border-t border-blue-950/10 pt-8">
        <TextField
          label="Com quem você costuma viajar?"
          placeholder="Ex.: esposa e dois filhos, grupo da paróquia"
          hint="Usamos como sugestão ao montar a lista de hóspedes."
          value={preferences.usuallyTravelsWith}
          onChange={(event) =>
            setPreferences((current) => ({
              ...current,
              usuallyTravelsWith: event.target.value,
            }))
          }
        />
      </div>

      <fieldset className="border-t border-blue-950/10 pt-8">
        <legend className="text-sm font-semibold text-blue-950">
          Como prefere pagar?
        </legend>
        <p className="mt-1 text-sm text-blue-950/60">
          Já deixamos essa opção selecionada no checkout. Você pode trocar na
          hora.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {PAYMENT_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              isSelected={preferences.preferredPayment === option.value}
              onToggle={() =>
                setPreferences((current) => ({
                  ...current,
                  preferredPayment:
                    current.preferredPayment === option.value
                      ? null
                      : option.value,
                }))
              }
            />
          ))}
        </div>
      </fieldset>

      <FormErrorBanner message={updateUser.error?.message} />

      <div className="flex justify-end">
        <BrandButton
          type="submit"
          isLoading={updateUser.isPending}
          loadingLabel="Salvando"
          disabled={!isDirty}
        >
          Salvar preferências
        </BrandButton>
      </div>
    </form>
  );
}
