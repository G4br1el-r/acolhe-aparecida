"use client";

import { Check, Scale } from "lucide-react";
import { toast } from "sonner";
import { useIsClient } from "@/hooks/use-is-client";
import { cn } from "@/lib/utils";
import {
  MAX_COMPARE_ITEMS,
  useCompareStore,
} from "@/store/Modules/Hospedagens/Comparacao/use-compare-store";

type CompareToggleProps = {
  slug: string;
  accommodationName: string;
  variant?: "chip" | "text";
  className?: string;
};

export function CompareToggle({
  slug,
  accommodationName,
  variant = "chip",
  className,
}: CompareToggleProps) {
  const isClient = useIsClient();
  const isComparing = useCompareStore((state) => state.slugs.includes(slug));
  const toggleCompare = useCompareStore((state) => state.toggleCompare);

  const isActive = isClient && isComparing;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const result = toggleCompare(slug);

    if (result === "full") {
      toast.error(`Você pode comparar até ${MAX_COMPARE_ITEMS} hospedagens`, {
        description: "Remova uma da comparação para adicionar outra.",
      });
    } else if (result === "added") {
      toast.success("Adicionada à comparação", {
        description: accommodationName,
      });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isActive}
      className={cn(
        "flex cursor-pointer items-center gap-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900",
        variant === "chip" &&
          "rounded-full px-3 py-1.5 ring-1 ring-blue-950/15 hover:bg-blue-50",
        variant === "chip" &&
          isActive &&
          "bg-blue-950 text-white ring-blue-950 hover:bg-blue-900",
        variant === "text" &&
          "text-blue-950 hover:underline underline-offset-4",
        className,
      )}
    >
      {isActive ? (
        <Check className="h-3.5 w-3.5" aria-hidden />
      ) : (
        <Scale className="h-3.5 w-3.5" aria-hidden />
      )}
      {isActive ? "Comparando" : "Comparar"}
    </button>
  );
}
