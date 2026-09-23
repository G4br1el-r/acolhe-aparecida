"use client";

import { ChevronDown } from "lucide-react";
import { type ComponentProps, forwardRef, useId } from "react";
import {
  CONTACT_SUBJECT_IDS,
  CONTACT_SUBJECTS,
} from "@/constants/Modules/Suporte/contact-subjects";
import { cn } from "@/lib/utils";

type SubjectSelectProps = Omit<ComponentProps<"select">, "id" | "children"> & {
  label: string;
  error?: string;
};

export const SubjectSelect = forwardRef<HTMLSelectElement, SubjectSelectProps>(
  function SubjectSelect({ label, error, className, ...props }, ref) {
    const selectId = useId();
    const errorId = `${selectId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={selectId} className="text-sm font-medium text-blue-950">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "h-12 w-full cursor-pointer appearance-none rounded-xl bg-white pr-11 pl-4 text-base text-blue-950 ring-1 ring-blue-950/15 transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-900 aria-invalid:ring-2 aria-invalid:ring-red-500",
              className,
            )}
            {...props}
          >
            <option value="">Escolha um assunto</option>
            {CONTACT_SUBJECT_IDS.map((id) => (
              <option key={id} value={id}>
                {CONTACT_SUBJECTS[id]}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-blue-950/50"
          />
        </div>
        {error && (
          <p id={errorId} role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);
