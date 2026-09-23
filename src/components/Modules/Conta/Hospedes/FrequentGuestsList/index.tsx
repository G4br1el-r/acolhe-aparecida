"use client";

import { Plus, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { FrequentGuest } from "@/@types/Modules/Conta/user";
import { FrequentGuestDialog } from "@/components/Modules/Conta/Hospedes/FrequentGuestDialog";
import { FrequentGuestItem } from "@/components/Modules/Conta/Hospedes/FrequentGuestItem";
import { ContaPageHeading } from "@/components/Modules/Conta/Shared/ContaPageHeading";
import { BrandButton } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type FrequentGuestInput,
  useFrequentGuests,
} from "@/hooks/Modules/Conta/use-frequent-guests";
import { useCurrentUser } from "@/hooks/Modules/Conta/use-session";

export function FrequentGuestsList() {
  const { user } = useCurrentUser();
  const { guests, isSaving, addGuest, editGuest, removeGuest } =
    useFrequentGuests();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<FrequentGuest | null>(null);
  const [saveError, setSaveError] = useState<string | undefined>();

  function openCreate() {
    setEditingGuest(null);
    setSaveError(undefined);
    setIsDialogOpen(true);
  }

  function openEdit(guest: FrequentGuest) {
    setEditingGuest(guest);
    setSaveError(undefined);
    setIsDialogOpen(true);
  }

  async function handleSave(input: FrequentGuestInput) {
    setSaveError(undefined);

    try {
      if (editingGuest) {
        await editGuest(editingGuest.id, input);
        toast.success(`${input.fullName.split(" ")[0]} atualizado.`);
      } else {
        await addGuest(input);
        toast.success(
          `${input.fullName.split(" ")[0]} adicionado aos seus hóspedes.`,
        );
      }

      setIsDialogOpen(false);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Não foi possível salvar.",
      );
    }
  }

  async function handleRemove(guest: FrequentGuest) {
    try {
      await removeGuest(guest.id);
      toast.success(`${guest.fullName.split(" ")[0]} removido da lista.`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Não foi possível remover.",
      );
    }
  }

  const addButton = (
    <BrandButton variant="secondary" size="sm" onClick={openCreate}>
      <Plus className="h-4 w-4" aria-hidden />
      Adicionar hóspede
    </BrandButton>
  );

  return (
    <section aria-labelledby="hospedes-title">
      <ContaPageHeading
        title="Hóspedes frequentes"
        description="Quem viaja com você de novo e de novo. Na hora de reservar, é só escolher da lista em vez de digitar tudo outra vez."
        action={user && guests.length > 0 ? addButton : undefined}
      />

      {!user ? (
        <div aria-busy className="mt-8 flex flex-col gap-4">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : guests.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Nenhum hóspede salvo ainda"
          description="Cadastre as pessoas que costumam viajar com você. No checkout, basta selecionar e a lista de hóspedes fica pronta."
          action={addButton}
          className="mt-8"
        />
      ) : (
        <ul className="mt-6 divide-y divide-blue-950/10">
          {guests.map((guest) => (
            <FrequentGuestItem
              key={guest.id}
              guest={guest}
              onEdit={openEdit}
              onRemove={handleRemove}
              isDisabled={isSaving}
            />
          ))}
        </ul>
      )}

      <FrequentGuestDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        guest={editingGuest}
        onSave={handleSave}
        isSaving={isSaving}
        errorMessage={saveError}
      />
    </section>
  );
}
