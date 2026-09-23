import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const brandButtonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-blue-950 text-white shadow-sm hover:bg-blue-900",
        accent:
          "bg-cta text-white shadow-md hover:bg-cta-hover hover:shadow-lg",
        secondary: "bg-blue-50 text-blue-950 hover:bg-blue-100",
        outline:
          "bg-white text-blue-950 ring-1 ring-blue-950/15 hover:bg-blue-50",
        ghost: "text-blue-950 hover:bg-blue-950/5",
        danger: "bg-red-50 text-red-700 hover:bg-red-100",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-base",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type BrandButtonProps = ComponentProps<"button"> &
  VariantProps<typeof brandButtonVariants> & {
    isLoading?: boolean;
    loadingLabel?: string;
  };

export function BrandButton({
  className,
  variant,
  size,
  fullWidth,
  isLoading = false,
  loadingLabel,
  children,
  disabled,
  type = "button",
  ...props
}: BrandButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        brandButtonVariants({ variant, size, fullWidth }),
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          {loadingLabel ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
}

type BrandLinkProps = ComponentProps<typeof Link> &
  VariantProps<typeof brandButtonVariants> & {
    children: ReactNode;
  };

export function BrandLink({
  className,
  variant,
  size,
  fullWidth,
  children,
  ...props
}: BrandLinkProps) {
  return (
    <Link
      className={cn(
        brandButtonVariants({ variant, size, fullWidth }),
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
