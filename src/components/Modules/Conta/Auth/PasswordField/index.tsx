"use client";

import { Eye, EyeOff } from "lucide-react";
import { type ComponentProps, forwardRef, useState } from "react";
import { TextField } from "@/components/ui/text-field";

type PasswordFieldProps = Omit<ComponentProps<typeof TextField>, "type">;

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField({ className, ...props }, ref) {
    const [isVisible, setIsVisible] = useState(false);
    const Icon = isVisible ? EyeOff : Eye;

    return (
      <div className="relative">
        <TextField
          ref={ref}
          type={isVisible ? "text" : "password"}
          className={`pr-14 ${className ?? ""}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={isVisible}
          className="absolute top-7 right-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-blue-950/55 transition-colors hover:text-blue-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          <Icon className="h-4 w-4" aria-hidden />
        </button>
      </div>
    );
  },
);
