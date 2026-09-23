import type { ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/ui/reveal";

const VIEWPORT_AMOUNT = 0.15;
const VIEWPORT_MARGIN = "0px 0px -5% 0px";

type TripSectionProps = {
  id: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

export function TripSection({
  id,
  title,
  description,
  action,
  children,
}: TripSectionProps) {
  return (
    <Reveal trigger="inView" amount={VIEWPORT_AMOUNT} margin={VIEWPORT_MARGIN}>
      <RevealItem>
        <section
          id={id}
          aria-labelledby={`${id}-titulo`}
          className="rounded-3xl bg-white p-5 ring-1 ring-blue-950/8 sm:p-7"
        >
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
            <div className="min-w-0">
              <h2
                id={`${id}-titulo`}
                className="text-xl font-semibold tracking-tight text-blue-950"
              >
                {title}
              </h2>
              {description && (
                <p className="mt-1 max-w-prose text-sm text-blue-950/60">
                  {description}
                </p>
              )}
            </div>
            {action}
          </div>

          <div className="mt-5">{children}</div>
        </section>
      </RevealItem>
    </Reveal>
  );
}
