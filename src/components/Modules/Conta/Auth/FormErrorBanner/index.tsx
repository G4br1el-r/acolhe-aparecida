import { CircleAlert } from "lucide-react";

type FormErrorBannerProps = {
  message: string | null | undefined;
};

export function FormErrorBanner({ message }: FormErrorBannerProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <p>{message}</p>
    </div>
  );
}
