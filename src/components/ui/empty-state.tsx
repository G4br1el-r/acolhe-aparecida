import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  tone?: "neutral" | "error";
  className?: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  tone = "neutral",
  className,
}: EmptyStateProps) {
  return (
    <div
      role={tone === "error" ? "alert" : undefined}
      className={cn(
        "flex flex-col items-center rounded-3xl px-6 py-12 text-center",
        tone === "error" ? "bg-red-50/60" : "bg-blue-50/60",
        className,
      )}
    >
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          tone === "error"
            ? "bg-red-100 text-red-700"
            : "bg-white text-blue-900 ring-1 ring-blue-950/10",
        )}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-blue-950">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-blue-950/65">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
