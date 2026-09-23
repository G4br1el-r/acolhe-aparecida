"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CHECKOUT_STEPS,
  type CheckoutStepId,
} from "@/store/Modules/Reserva/Checkout/use-checkout-store";

type CheckoutStepperProps = {
  currentStep: CheckoutStepId;
  completedSteps: CheckoutStepId[];
  onSelectStep: (step: CheckoutStepId) => void;
};

export function CheckoutStepper({
  currentStep,
  completedSteps,
  onSelectStep,
}: CheckoutStepperProps) {
  const currentIndex = CHECKOUT_STEPS.findIndex(
    (step) => step.id === currentStep,
  );

  return (
    <nav aria-label="Etapas da reserva">
      <ol className="flex items-center gap-2 overflow-x-auto scrollbar-none">
        {CHECKOUT_STEPS.map((step, index) => {
          const isCurrent = step.id === currentStep;
          const isCompleted = completedSteps.includes(step.id);
          const isReachable = isCompleted || index <= currentIndex;

          return (
            <li key={step.id} className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => isReachable && onSelectStep(step.id)}
                disabled={!isReachable}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-full py-1.5 pr-3 pl-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900",
                  isCurrent && "bg-blue-950 text-white",
                  !isCurrent &&
                    isReachable &&
                    "cursor-pointer text-blue-950 hover:bg-blue-50",
                  !isReachable && "text-blue-950/40",
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                    isCurrent && "bg-white/20 text-white",
                    !isCurrent &&
                      isCompleted &&
                      "bg-emerald-100 text-emerald-700",
                    !isCurrent &&
                      !isCompleted &&
                      "bg-blue-950/8 text-blue-950/60",
                  )}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  ) : (
                    index + 1
                  )}
                </span>
                {step.label}
              </button>
              {index < CHECKOUT_STEPS.length - 1 && (
                <span aria-hidden className="h-px w-4 bg-blue-950/15" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
