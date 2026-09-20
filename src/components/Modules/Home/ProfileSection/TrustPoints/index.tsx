import { Headset, MapPin, ShieldCheck } from "lucide-react";

const TRUST_POINTS = [
  {
    icon: MapPin,
    title: "Perto do Santuário",
    description: "Mais tempo para o que realmente importa.",
  },
  {
    icon: ShieldCheck,
    title: "Reserva segura",
    description: "Do início ao fim, tudo pela plataforma.",
  },
  {
    icon: Headset,
    title: "Suporte de verdade",
    description: "Antes, durante e depois da sua estadia.",
  },
];

export function TrustPoints() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {TRUST_POINTS.map((point) => (
        <div key={point.title} className="flex items-start gap-3">
          <point.icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-900" />
          <div>
            <h3 className="text-sm font-semibold text-blue-950">
              {point.title}
            </h3>
            <p className="mt-0.5 text-sm text-blue-950/60">
              {point.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
