"use client";

import { type ComponentProps, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

type TextFieldProps = Omit<ComponentProps<"input">, "id"> & {
  label: string;
  hint?: string;
  error?: string;
  id?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hint, error, className, id, required, ...props },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-blue-950">
          {label}
          {required && (
            <span aria-hidden className="text-blue-950/40">
              {" "}
              *
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={cn(
            "h-12 w-full rounded-xl bg-white px-4 text-base text-blue-950 ring-1 ring-blue-950/15 transition-shadow placeholder:text-blue-950/35 focus:outline-none focus:ring-2 focus:ring-blue-900 disabled:bg-blue-50 disabled:text-blue-950/50 aria-invalid:ring-2 aria-invalid:ring-red-500",
            className,
          )}
          {...props}
        />

        {error ? (
          <p id={errorId} role="alert" className="text-sm text-red-600">
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="text-xs text-blue-950/55">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

type TextAreaFieldProps = Omit<ComponentProps<"textarea">, "id"> & {
  label: string;
  hint?: string;
  error?: string;
  id?: string;
};

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
>(function TextAreaField({ label, hint, error, className, id, ...props }, ref) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-blue-950">
        {label}
      </label>

      <textarea
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={cn(
          "min-h-28 w-full resize-y rounded-xl bg-white px-4 py-3 text-base text-blue-950 ring-1 ring-blue-950/15 transition-shadow placeholder:text-blue-950/35 focus:outline-none focus:ring-2 focus:ring-blue-900 aria-invalid:ring-2 aria-invalid:ring-red-500",
          className,
        )}
        {...props}
      />

      {error ? (
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-blue-950/55">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
