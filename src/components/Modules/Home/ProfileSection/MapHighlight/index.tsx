import Image from "next/image";
import { HotelCard } from "./HotelCard";

export function MapHighlight() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/maps.png"
        alt="Mapa de hospedagens próximas ao Santuário Nacional de Aparecida"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white to-transparent md:h-48" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white to-transparent md:h-48" />

      <div className="absolute right-21 top-20 z-20 hidden lg:block xl:right-29 xl:top-24">
        <HotelCard />
      </div>
    </div>
  );
}
