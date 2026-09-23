"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { BrandButton } from "@/components/ui/brand-button";
import { buildSharedFavoritesPath } from "@/lib/Modules/Hospedagens/Favoritos/shared-favorites";

const COPIED_FEEDBACK_IN_MS = 2000;

type ShareFavoritesButtonProps = {
  slugs: string[];
};

export function ShareFavoritesButton({ slugs }: ShareFavoritesButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}${buildSharedFavoritesPath(slugs)}`;

    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      toast.success("Link copiado", {
        description:
          "Quem abrir vê a lista e pode salvar nos próprios favoritos.",
      });
      window.setTimeout(() => setIsCopied(false), COPIED_FEEDBACK_IN_MS);
    } catch {
      toast.error("Não foi possível copiar", {
        description: url,
      });
    }
  }

  return (
    <BrandButton
      variant="outline"
      onClick={handleShare}
      disabled={slugs.length === 0}
    >
      {isCopied ? (
        <Check className="h-4 w-4 text-emerald-700" aria-hidden />
      ) : (
        <Link2 className="h-4 w-4" aria-hidden />
      )}
      {isCopied ? "Link copiado" : "Compartilhar lista"}
    </BrandButton>
  );
}
