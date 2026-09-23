"use client";

import { ChevronDown, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type { CheckoutQuote } from "@/hooks/Modules/Reserva/Checkout/use-checkout-quote";
import {
  formatStayRange,
  pluralize,
} from "@/lib/Modules/Hospedagens/format-date";
import {
  extrasTotalFor,
  formatCurrency,
} from "@/lib/Modules/Reserva/Checkout/price-summary";
import { cn } from "@/lib/utils";

type CheckoutSummaryProps = {
  accommodation: Accommodation;
  quote: CheckoutQuote;
  isCollapsible?: boolean;
};

export function CheckoutSummary({
  accommodation,
  quote,
  isCollapsible = false,
}: CheckoutSummaryProps) {
  const [isOpen, setIsOpen] = useState(!isCollapsible);
  const { draft, room, summary, extras, appliedCoupon, guestCount } = quote;

  const priceRows = [
    {
      label: `${formatCurrency(summary.nightlyRate)} x ${pluralize(summary.nightCount, "noite", "noites")}${summary.roomCount > 1 ? ` x ${pluralize(summary.roomCount, "quarto", "quartos")}` : ""}`,
      value: formatCurrency(summary.subtotal),
    },
    ...extras
      .filter((extra) => (extra.pricePerNight ?? extra.pricePerStay ?? 0) > 0)
      .map((extra) => ({
        label: `${extra.label}${extra.quantity > 1 ? ` x ${extra.quantity}` : ""}`,
        value: formatCurrency(extrasTotalFor([extra], summary.nightCount)),
      })),
    { label: "Taxa de serviço", value: formatCurrency(summary.serviceFee) },
  ];

  return (
    <section
      aria-label="Resumo da reserva"
      className="overflow-hidden rounded-3xl bg-white ring-1 ring-blue-950/10"
    >
      <div className="flex gap-4 p-4">
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl bg-blue-100">
          <Image
            src={accommodation.image}
            alt={accommodation.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <Link
            href={`/hospedagens/${accommodation.slug}`}
            className="line-clamp-1 text-sm font-semibold text-blue-950 hover:underline"
          >
            {accommodation.name}
          </Link>
          <p className="mt-0.5 text-xs text-blue-950/60">
            {accommodation.distanceFromSanctuary}
          </p>
          <p className="mt-1.5 text-xs text-blue-950/80">
            {formatStayRange(draft.checkIn, draft.checkOut)} ·{" "}
            {pluralize(summary.nightCount, "noite", "noites")}
          </p>
          <p className="text-xs text-blue-950/80">
            {room.name}
            {draft.roomCount > 1 && ` x ${draft.roomCount}`} ·{" "}
            {pluralize(guestCount, "hóspede", "hóspedes")}
          </p>
        </div>
      </div>

      {isCollapsible && (
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          className="flex w-full cursor-pointer items-center justify-between border-t border-blue-950/10 px-4 py-3 text-sm font-semibold text-blue-950"
        >
          <span>Total {formatCurrency(summary.total)}</span>
          <span className="flex items-center gap-1 text-xs font-medium text-blue-900">
            {isOpen ? "Ocultar detalhes" : "Ver detalhes"}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isOpen && "rotate-180",
              )}
              aria-hidden
            />
          </span>
        </button>
      )}

      <div
        className={cn(
          "border-t border-blue-950/10 px-4 pb-4",
          !isOpen && "hidden",
        )}
      >
        <dl className="mt-4 space-y-2.5 text-sm">
          {priceRows.map((row) => (
            <div key={row.label} className="flex justify-between gap-4">
              <dt className="text-blue-950/70">{row.label}</dt>
              <dd className="shrink-0 text-blue-950">{row.value}</dd>
            </div>
          ))}

          {summary.discount > 0 && (
            <div className="flex justify-between gap-4 text-emerald-700">
              <dt>
                Desconto
                {appliedCoupon && draft.paymentMethod === "pix"
                  ? ` (${appliedCoupon.code} + PIX)`
                  : appliedCoupon
                    ? ` (${appliedCoupon.code})`
                    : draft.paymentMethod === "pix"
                      ? " PIX"
                      : ""}
              </dt>
              <dd className="shrink-0">-{formatCurrency(summary.discount)}</dd>
            </div>
          )}

          <div className="flex justify-between gap-4 border-t border-blue-950/10 pt-3 text-base font-semibold text-blue-950">
            <dt>Total</dt>
            <dd>{formatCurrency(summary.total)}</dd>
          </div>

          {draft.paymentMethod === "cartao" && summary.installmentCount > 1 && (
            <div className="flex justify-between gap-4 text-xs text-blue-950/60">
              <dt>{summary.installmentCount}x sem juros</dt>
              <dd>{formatCurrency(summary.installmentValue)} por parcela</dd>
            </div>
          )}

          <div className="flex justify-between gap-4 rounded-xl bg-blue-50 px-3 py-2.5 text-xs">
            <dt className="font-medium text-blue-950">Cobrado agora</dt>
            <dd className="font-semibold text-blue-950">
              {formatCurrency(summary.dueNow)}
            </dd>
          </div>
        </dl>

        {summary.hasHighDemandPricing && (
          <p className="mt-3 text-xs text-blue-950/60">
            Suas datas incluem um período de alta procura. O valor por noite já
            considera isso.
          </p>
        )}

        <p className="mt-3 flex items-start gap-2 text-xs text-blue-950/60">
          <ShieldCheck
            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
            aria-hidden
          />
          Cancelamento gratuito até{" "}
          {accommodation.cancellationPolicy.freeUntilDaysBefore} dias antes do
          check-in.
        </p>
      </div>
    </section>
  );
}
