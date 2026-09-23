import type { BookingStepDetail } from "@/constants/Modules/Home/booking-steps";

type StepDetailListProps = {
  details: BookingStepDetail[];
};

export function StepDetailList({ details }: StepDetailListProps) {
  return (
    <dl className="mt-5 flex max-w-md flex-col gap-3 border-l border-white/20 pl-5">
      {details.map((detail) => (
        <div
          key={`${detail.label}-${detail.value}`}
          className="flex flex-wrap items-baseline gap-x-2 text-sm"
        >
          <dt className="font-medium text-white/50">{detail.label}</dt>
          <dd className="font-semibold text-white">{detail.value}</dd>
        </div>
      ))}
    </dl>
  );
}
