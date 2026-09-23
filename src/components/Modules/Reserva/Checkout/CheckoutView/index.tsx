"use client";

import { ArrowLeft, CalendarX } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { BrandLink } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/Modules/Conta/use-session";
import { useCheckoutQuote } from "@/hooks/Modules/Reserva/Checkout/use-checkout-quote";
import { useIsClient } from "@/hooks/use-is-client";
import {
  CHECKOUT_STEPS,
  type CheckoutStepId,
  useCheckoutStore,
} from "@/store/Modules/Reserva/Checkout/use-checkout-store";
import { CheckoutStepper } from "../CheckoutStepper";
import { CheckoutSummary } from "../CheckoutSummary";
import { StepDetails } from "../StepDetails";
import { StepGuests } from "../StepGuests";
import { StepPayment } from "../StepPayment";
import { StepResponsible } from "../StepResponsible";

type CheckoutViewProps = {
  accommodation: Accommodation;
};

export function CheckoutView({ accommodation }: CheckoutViewProps) {
  const isClient = useIsClient();
  const quote = useCheckoutQuote(accommodation);
  const goToStep = useCheckoutStore((state) => state.goToStep);
  const { user, userId, isResolving } = useCurrentUser();

  const currentStep = quote?.draft.step ?? "hospedes";
  const currentIndex = CHECKOUT_STEPS.findIndex(
    (step) => step.id === currentStep,
  );

  useEffect(() => {
    if (!quote) return;
    if (
      (currentStep === "solicitacoes" || currentStep === "pagamento") &&
      !isResolving &&
      !user
    ) {
      goToStep("responsavel");
    }
  }, [currentStep, user, isResolving, goToStep, quote]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  function moveTo(step: CheckoutStepId) {
    goToStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!isClient) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:px-8 md:pt-28">
        <Skeleton className="h-8 w-64" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <Skeleton className="h-96 rounded-3xl" />
          <Skeleton className="h-72 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!quote || quote.nightCount === 0 || !quote.roomAvailability) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <EmptyState
          icon={CalendarX}
          title="Sua reserva ainda não começou"
          description="Escolha as datas e o quarto na página da hospedagem para chegar aqui com tudo calculado."
          action={
            <BrandLink href={`/hospedagens/${accommodation.slug}`}>
              Ir para {accommodation.name}
            </BrandLink>
          }
        />
      </div>
    );
  }

  const completedSteps = CHECKOUT_STEPS.slice(0, currentIndex).map(
    (step) => step.id,
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-28 sm:px-6 lg:px-8 md:pt-28 lg:pb-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href={`/hospedagens/${accommodation.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-900 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar para a hospedagem
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
            Sua reserva
          </h1>
          <p className="mt-1 text-sm text-blue-950/60">
            Quatro etapas curtas. O total não muda no final.
          </p>
        </div>
        <CheckoutStepper
          currentStep={currentStep}
          completedSteps={completedSteps}
          onSelectStep={moveTo}
        />
      </div>

      <div className="mt-6 lg:hidden">
        <CheckoutSummary
          accommodation={accommodation}
          quote={quote}
          isCollapsible
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div>
          {currentStep === "hospedes" && (
            <StepGuests
              accommodation={accommodation}
              quote={quote}
              frequentGuests={user?.frequentGuests ?? []}
              responsibleName={
                user?.fullName ?? quote.draft.responsible.fullName
              }
              onContinue={() => moveTo("responsavel")}
            />
          )}
          {currentStep === "responsavel" && (
            <StepResponsible
              quote={quote}
              user={user}
              isResolvingUser={isResolving}
              onContinue={() => moveTo("solicitacoes")}
              onBack={() => moveTo("hospedes")}
            />
          )}
          {currentStep === "solicitacoes" && (
            <StepDetails
              accommodation={accommodation}
              quote={quote}
              onContinue={() => moveTo("pagamento")}
              onBack={() => moveTo("responsavel")}
            />
          )}
          {currentStep === "pagamento" && userId && (
            <StepPayment
              accommodation={accommodation}
              quote={quote}
              userId={userId}
              onBack={() => moveTo("solicitacoes")}
            />
          )}
        </div>

        <aside className="hidden lg:sticky lg:top-28 lg:block">
          <CheckoutSummary accommodation={accommodation} quote={quote} />
        </aside>
      </div>
    </div>
  );
}
