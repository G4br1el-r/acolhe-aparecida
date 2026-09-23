import { Clock, ShieldCheck } from "lucide-react";
import {
  NO_WHATSAPP_NOTICE,
  SUPPORT_CHANNELS,
  SUPPORT_HOURS,
} from "@/constants/Modules/Suporte/support-channels";

export function SupportChannels() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start gap-3">
        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-blue-900" aria-hidden />
        <div>
          <h3 className="text-base font-semibold text-blue-950">
            Atendimento {SUPPORT_HOURS.days}
          </h3>
          <p className="mt-1 text-sm text-blue-950/70">
            Das {SUPPORT_HOURS.opensAt} às {SUPPORT_HOURS.closesAt}, inclusive
            em feriados e dias de festa.
          </p>
        </div>
      </div>

      <dl className="flex flex-col gap-5">
        {SUPPORT_CHANNELS.map((channel) => (
          <div key={channel.id}>
            <dt className="flex items-center gap-2 text-sm font-semibold text-blue-950">
              {channel.title}
              {channel.isComingSoon && (
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-blue-900/70">
                  Em breve
                </span>
              )}
            </dt>
            <dd className="mt-1 text-sm text-blue-950/70">
              {channel.description}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex items-start gap-3 rounded-2xl bg-blue-50/70 p-4">
        <ShieldCheck
          className="mt-0.5 h-5 w-5 shrink-0 text-blue-900"
          aria-hidden
        />
        <p className="text-sm text-blue-950/75">{NO_WHATSAPP_NOTICE}</p>
      </div>
    </div>
  );
}
