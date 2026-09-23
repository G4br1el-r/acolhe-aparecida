"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import { useIsClient } from "@/hooks/use-is-client";
import { cn } from "@/lib/utils";
import { useSavedPlacesStore } from "@/store/Modules/Cidade/use-saved-places-store";

type SavePlaceButtonProps = {
  placeId: string;
  placeName: string;
  className?: string;
};

export function SavePlaceButton({
  placeId,
  placeName,
  className,
}: SavePlaceButtonProps) {
  const isClient = useIsClient();
  const isSaved = useSavedPlacesStore((state) =>
    state.placeIds.includes(placeId),
  );
  const toggleSaved = useSavedPlacesStore((state) => state.toggleSaved);
  const isActive = isClient && isSaved;

  function handleClick() {
    const added = toggleSaved(placeId);

    if (added) {
      toast.success("Salvo na sua viagem", {
        description: `${placeName} agora aparece em Minha Viagem.`,
      });
    } else {
      toast("Removido da sua viagem", { description: placeName });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isActive}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2",
        isActive
          ? "bg-blue-950 text-white hover:bg-blue-900"
          : "bg-white text-blue-950 ring-1 ring-blue-950/15 hover:bg-blue-50",
        className,
      )}
    >
      {isActive ? (
        <BookmarkCheck className="h-4 w-4" aria-hidden />
      ) : (
        <Bookmark className="h-4 w-4" aria-hidden />
      )}
      {isActive ? "Salvo" : "Salvar"}
    </button>
  );
}
