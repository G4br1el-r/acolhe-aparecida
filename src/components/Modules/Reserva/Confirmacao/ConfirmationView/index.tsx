"use client";

import { CalendarDays, Check, MapPin, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { BrandLink } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useReservation } from "@/hooks/Modules/Reserva/use-reservations";
import {
  formatLongDate,
  pluralize,
} from "@/lib/Modules/Hospedagens/format-date";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { findAccommodationBySlug } from "@/mocks/Modules/Hospedagens/accommodations";
import { paymentMethodLabel } from "@/services/Modules/Reserva/payments";

const CHECK_SPRING_STIFFNESS = 260;
const CHECK_SPRING_DAMPING = 18;
const CHECK_DELAY_IN_SECONDS = 0.15;

type ConfirmationViewProps = {
  reservationId: string;
};

export function ConfirmationView({ reservationId }: ConfirmationViewProps) {
  const shouldReduceMotion = useReducedMotion();
  const { data: reservation, isPending } = useReservation(reservationId);
  const accommodation = reservation
    ? findAccommodationBySlug(reservation.accommodationSlug)
    : undefined;

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 pt-28 pb-20 sm:px-6">
        <Skeleton className="mx-auto h-16 w-16 rounded-full" />
        <Skeleton className="mx-auto mt-6 h-8 w-72" />
        <Skeleton className="mt-8 h-64 rounded-3xl" />
      </div>
    );
  }

  if (!reservation || !accommodation) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 pt-28 pb-20 sm:px-6">
        <EmptyState
          icon={CalendarDays}
          title="Não encontramos essa reserva"
          description="Ela pode estar em outra conta. Veja suas viagens ou faça uma nova busca."
          action={<BrandLink href="/minha-viagem">Ver Minha Viagem</BrandLink>}
        />
      </div>
    );
  }

  const room = accommodation.rooms.find(
    (candidate) => candidate.id === reservation.roomTypeId,
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-28 pb-20 sm:px-6">
      <div className="flex flex-col items-center text-center">
        <motion.span
          initial={shouldReduceMotion ? false : { scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: CHECK_SPRING_STIFFNESS,
            damping: CHECK_SPRING_DAMPING,
            delay: shouldReduceMotion ? 0 : CHECK_DELAY_IN_SECONDS,
          }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
        >
          <Check className="h-8 w-8" strokeWidth={3} aria-hidden />
        </motion.span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
          Reserva confirmada
        </h1>
        <p className="mt-2 max-w-md text-base text-blue-950/70">
          Enviamos o comprovante para {reservation.responsible.email}. Tudo fica
          salvo em Minha Viagem, mesmo sem internet na estrada.
        </p>
        <p className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-950 ring-1 ring-blue-950/10">
          Código {reservation.code}
        </p>
      </div>

      <section className="mt-10 overflow-hidden rounded-3xl bg-white ring-1 ring-blue-950/10">
        <div className="relative aspect-[21/9] w-full bg-blue-100">
          <Image
            src={accommodation.image}
            alt={accommodation.name}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-blue-950">
            {accommodation.name}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-blue-950/70">
            <MapPin className="h-4 w-4 text-blue-900/70" aria-hidden />
            {accommodation.address.street}, {accommodation.address.neighborhood}
            . {accommodation.distanceFromSanctuary}.
          </p>

          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
                Check-in
              </dt>
              <dd className="mt-1 text-sm font-medium text-blue-950">
                {formatLongDate(reservation.checkIn)}
                <span className="block text-xs font-normal text-blue-950/60">
                  a partir das {accommodation.checkInTime}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
                Check-out
              </dt>
              <dd className="mt-1 text-sm font-medium text-blue-950">
                {formatLongDate(reservation.checkOut)}
                <span className="block text-xs font-normal text-blue-950/60">
                  até as {accommodation.checkOutTime}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
                Quarto e hóspedes
              </dt>
              <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium text-blue-950">
                <Users className="h-4 w-4 text-blue-900/70" aria-hidden />
                {room?.name ?? "Quarto"}
                {reservation.roomCount > 1 && ` x ${reservation.roomCount}`} ·{" "}
                {pluralize(reservation.guests.length, "hóspede", "hóspedes")}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
                Pagamento
              </dt>
              <dd className="mt-1 text-sm font-medium text-blue-950">
                {formatCurrency(reservation.price.total)} ·{" "}
                {paymentMethodLabel(reservation.payment.method)}
                {reservation.payment.installmentCount > 1 &&
                  ` em ${reservation.payment.installmentCount}x`}
                <span className="block text-xs font-normal text-emerald-700">
                  Pagamento aprovado
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-6 rounded-3xl bg-blue-50/60 p-6 ring-1 ring-blue-950/8">
        <h2 className="text-base font-semibold text-blue-950">
          O que acontece agora
        </h2>
        <ol className="mt-3 space-y-2 text-sm text-blue-950/80">
          <li>1. A hospedagem já recebeu sua reserva e o nome dos hóspedes.</li>
          <li>
            2. Leve documento com foto de todos. Crianças podem apresentar
            certidão de nascimento.
          </li>
          <li>
            3. Precisa mudar algo? Datas e cancelamento ficam em Minha Viagem,
            dentro do prazo da política.
          </li>
        </ol>
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <BrandLink href={`/minha-viagem/${reservation.id}`} size="lg">
          Abrir Minha Viagem
        </BrandLink>
        <BrandLink href="/guia" size="lg" variant="secondary">
          Planejar o dia em Aparecida
        </BrandLink>
      </div>

      <p className="mt-6 text-center text-xs text-blue-950/55">
        Dúvidas? O{" "}
        <Link
          href="/suporte"
          className="font-medium text-blue-900 underline-offset-4 hover:underline"
        >
          suporte
        </Link>{" "}
        atende todos os dias, das 7h às 22h.
      </p>
    </div>
  );
}
