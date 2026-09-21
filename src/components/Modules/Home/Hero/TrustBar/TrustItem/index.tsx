import type { LucideIcon } from "lucide-react";

type TrustItemProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function TrustItem({ icon: Icon, title, description }: TrustItemProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-blue-950" strokeWidth={2} />
      <div>
        <p className="text-base font-semibold text-blue-950">{title}</p>
        <p className="mt-0.5 text-sm text-blue-950">{description}</p>
      </div>
    </div>
  );
}
