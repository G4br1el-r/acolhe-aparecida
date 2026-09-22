import type { ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/ui/reveal";

const VIEWPORT_AMOUNT = 0.1;
const VIEWPORT_MARGIN = "0px 0px -5% 0px";

type DetailSectionProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  hasDivider?: boolean;
};

export function DetailSection({
  title,
  description,
  action,
  children,
  hasDivider = true,
}: DetailSectionProps) {
  return (
    <Reveal
      trigger="inView"
      amount={VIEWPORT_AMOUNT}
      margin={VIEWPORT_MARGIN}
      className={`py-9 ${hasDivider ? "border-b border-blue-950/10" : ""}`}
    >
      <RevealItem>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-blue-950 sm:text-2xl">
            {title}
          </h2>
          {action}
        </div>

        {description && (
          <p className="mt-2 max-w-prose text-sm text-blue-950/60">
            {description}
          </p>
        )}
      </RevealItem>

      <RevealItem className="mt-6">{children}</RevealItem>
    </Reveal>
  );
}
