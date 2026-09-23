import type { ReactNode } from "react";

type FilterGroupProps = {
  title: string;
  children: ReactNode;
};

export function FilterGroup({ title, children }: FilterGroupProps) {
  return (
    <fieldset className="py-5 first:pt-0 last:pb-0">
      <legend className="mb-3 text-sm font-semibold text-blue-950">
        {title}
      </legend>
      <div className="flex flex-col gap-0.5">{children}</div>
    </fieldset>
  );
}
