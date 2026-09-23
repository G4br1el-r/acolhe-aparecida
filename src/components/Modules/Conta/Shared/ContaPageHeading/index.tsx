import type { ReactNode } from "react";

type ContaPageHeadingProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function ContaPageHeading({
  title,
  description,
  action,
}: ContaPageHeadingProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-blue-950 md:text-2xl">
          {title}
        </h2>
        <p className="mt-1 max-w-xl text-sm text-blue-950/65 md:text-base">
          {description}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
