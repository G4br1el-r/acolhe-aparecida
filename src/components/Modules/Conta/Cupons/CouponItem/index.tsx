"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Coupon } from "@/@types/Modules/Conta/user";
import {
  type CouponStatus,
  describeCouponRule,
  resolveCouponStatus,
} from "@/lib/Modules/Conta/coupon-status";
import { formatNumericDate } from "@/lib/Modules/Hospedagens/format-date";
import { cn } from "@/lib/utils";

const COPIED_FEEDBACK_IN_MS = 1800;

const STATUS_LABELS: Record<Exclude<CouponStatus, "disponivel">, string> = {
  usado: "Já usado",
  expirado: "Expirado",
};

type CouponItemProps = {
  coupon: Coupon;
};

export function CouponItem({ coupon }: CouponItemProps) {
  const [isCopied, setIsCopied] = useState(false);
  const status = resolveCouponStatus(coupon);
  const isAvailable = status === "disponivel";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setIsCopied(true);
      toast.success(`Código ${coupon.code} copiado.`, {
        description: "Cole no campo de cupom do checkout.",
      });
      window.setTimeout(() => setIsCopied(false), COPIED_FEEDBACK_IN_MS);
    } catch {
      toast.error("Não foi possível copiar. Anote o código manualmente.");
    }
  }

  return (
    <li
      className={cn(
        "flex flex-col gap-4 rounded-3xl p-5 ring-1 ring-blue-950/8 sm:flex-row sm:items-center sm:justify-between sm:p-6",
        isAvailable ? "bg-white" : "bg-blue-50/40 text-blue-950/60",
      )}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={cn(
              "font-mono text-lg font-semibold tracking-wide",
              isAvailable ? "text-blue-950" : "text-blue-950/50 line-through",
            )}
          >
            {coupon.code}
          </p>
          {!isAvailable && (
            <span className="rounded-full bg-blue-950/8 px-2.5 py-0.5 text-xs font-medium text-blue-950/60">
              {STATUS_LABELS[status]}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm font-medium text-blue-950/80">
          {describeCouponRule(coupon)}
        </p>
        <p className="mt-1 text-xs text-blue-950/55">
          {isAvailable ? "Válido até" : "Validade"}{" "}
          {formatNumericDate(coupon.expiresAt)}
        </p>
      </div>

      {isAvailable && (
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-blue-50 px-5 text-sm font-semibold text-blue-950 transition-colors hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-emerald-600" aria-hidden />
          ) : (
            <Copy className="h-4 w-4" aria-hidden />
          )}
          {isCopied ? "Copiado" : "Copiar código"}
        </button>
      )}
    </li>
  );
}
