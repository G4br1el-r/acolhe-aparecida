import { Headset, MapPin, ShieldCheck, Users } from "lucide-react";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { TrustItem } from "./TrustItem";

const TRUST_ITEMS = [
  {
    icon: MapPin,
    title: "Só Aparecida",
    description: "Hospedagens na melhor localização.",
  },
  {
    icon: ShieldCheck,
    title: "Reserva garantida",
    description: "Do check-in ao check-out, tudo pela plataforma.",
  },
  {
    icon: Users,
    title: "Feito para grupos e romarias",
    description: "Soluções para vans, ônibus e famílias grandes.",
  },
  {
    icon: Headset,
    title: "Suporte durante a viagem",
    description: "Acompanhamento próximo antes e durante sua estadia.",
  },
];

export function TrustBar() {
  return (
    <div className="bg-white px-6 pt-2 pb-20 md:px-10">
      <Reveal
        trigger="inView"
        className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-blue-950/10"
      >
        {TRUST_ITEMS.map((item) => (
          <RevealItem key={item.title} className="lg:px-6 lg:first:pl-0">
            <TrustItem
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          </RevealItem>
        ))}
      </Reveal>
    </div>
  );
}
