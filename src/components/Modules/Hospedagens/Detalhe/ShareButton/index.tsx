"use client";

import { Share } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ShareButtonProps = {
  title: string;
};

export function ShareButton({ title }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);

  async function handleShare() {
    if (isSharing) {
      return;
    }

    setIsSharing(true);
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copiado", { description: title });
      }
    } catch {
      toast.error("Não foi possível compartilhar agora");
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={isSharing}
      className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-blue-950 underline-offset-4 transition-colors hover:bg-blue-950/5 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Share className="h-4 w-4" />
      Compartilhar
    </button>
  );
}
