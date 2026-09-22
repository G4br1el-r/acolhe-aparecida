"use client";

import { Heart } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const ICON_SPRING_STIFFNESS = 420;
const ICON_SPRING_DAMPING = 9;

type SaveButtonProps = {
  accommodationName: string;
};

export function SaveButton({ accommodationName }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function handleClick() {
    const next = !isSaved;
    setIsSaved(next);

    if (next) {
      toast.success("Salvo na sua lista", { description: accommodationName });
    } else {
      toast("Removido da sua lista", { description: accommodationName });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isSaved}
      className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-blue-950 underline-offset-4 transition-colors hover:bg-blue-950/5 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
    >
      <motion.span
        key={isSaved ? "filled" : "empty"}
        initial={shouldReduceMotion ? false : { scale: 0.6, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: ICON_SPRING_STIFFNESS,
                damping: ICON_SPRING_DAMPING,
              }
        }
        className="flex"
      >
        <Heart
          className={`h-4 w-4 ${isSaved ? "fill-blue-900 text-blue-900" : ""}`}
        />
      </motion.span>
      {isSaved ? "Salvo" : "Salvar"}
    </button>
  );
}
