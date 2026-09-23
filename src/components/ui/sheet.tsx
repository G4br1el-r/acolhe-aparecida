"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  side?: "right" | "left" | "bottom";
};

const SIDE_CLASSES = {
  right:
    "inset-y-0 right-0 h-dvh w-full max-w-md rounded-l-3xl data-ending-style:translate-x-full data-starting-style:translate-x-full",
  left: "inset-y-0 left-0 h-dvh w-full max-w-sm rounded-r-3xl data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
  bottom:
    "inset-x-0 bottom-0 max-h-[92dvh] w-full rounded-t-3xl data-ending-style:translate-y-full data-starting-style:translate-y-full",
} as const;

export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  side = "right",
}: SheetProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-80 min-h-dvh bg-blue-950/40 backdrop-blur-[2px] transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <DialogPrimitive.Popup
          className={cn(
            "fixed z-90 flex flex-col bg-white shadow-2xl outline-none transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
            SIDE_CLASSES[side],
          )}
        >
          {side === "bottom" && (
            <div className="flex justify-center pt-3" aria-hidden>
              <span className="h-1.5 w-12 rounded-full bg-blue-950/15" />
            </div>
          )}

          <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4">
            <div className="min-w-0">
              <DialogPrimitive.Title className="text-lg font-semibold text-blue-950">
                {title}
              </DialogPrimitive.Title>
              {description && (
                <DialogPrimitive.Description className="mt-1 text-sm text-blue-950/60">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>

            <DialogPrimitive.Close
              aria-label="Fechar"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-blue-950/70 transition-colors hover:bg-blue-950/5 hover:text-blue-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-6">
            {children}
          </div>

          {footer && (
            <div className="border-t border-blue-950/10 bg-white px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {footer}
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
