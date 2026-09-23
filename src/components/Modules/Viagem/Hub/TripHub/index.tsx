"use client";

import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { BrandButton } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { SegmentedTabs, TabPanel } from "@/components/ui/tabs";
import {
  TRIP_TAB_LABELS,
  TRIP_TAB_ORDER,
} from "@/constants/Modules/Viagem/trip";
import { useReservations } from "@/hooks/Modules/Reserva/use-reservations";
import {
  groupReservations,
  type ReservationGroupId,
} from "@/lib/Modules/Viagem/group-reservations";
import { findAccommodationBySlug } from "@/mocks/Modules/Hospedagens/accommodations";
import { NextTripHero } from "../NextTripHero";
import { ReservationList } from "../ReservationList";
import { TripHubSkeleton } from "../TripHubSkeleton";

export function TripHub() {
  const { data: reservations, isPending, isError, refetch } = useReservations();
  const [selectedTab, setSelectedTab] = useState<ReservationGroupId | null>(
    null,
  );

  if (isPending) return <TripHubSkeleton />;

  if (isError) {
    return (
      <EmptyState
        tone="error"
        icon={CircleAlert}
        title="Não conseguimos carregar suas viagens"
        description="Tente de novo em instantes. Suas reservas continuam garantidas."
        action={
          <BrandButton variant="primary" onClick={() => refetch()}>
            Tentar novamente
          </BrandButton>
        }
      />
    );
  }

  const groups = groupReservations(reservations);
  const defaultTab: ReservationGroupId =
    TRIP_TAB_ORDER.find((group) => groups[group].length > 0) ?? "proximas";
  const activeTab = selectedTab ?? defaultTab;
  const nextTripAccommodation = groups.nextTrip
    ? findAccommodationBySlug(groups.nextTrip.accommodationSlug)
    : undefined;

  const tabs = TRIP_TAB_ORDER.map((group) => ({
    value: group,
    label: TRIP_TAB_LABELS[group],
    count: groups[group].length,
  }));

  return (
    <Reveal className="flex flex-col gap-10">
      {groups.nextTrip && nextTripAccommodation && (
        <RevealItem>
          <NextTripHero
            reservation={groups.nextTrip}
            accommodation={nextTripAccommodation}
          />
        </RevealItem>
      )}

      <RevealItem>
        <SegmentedTabs
          value={activeTab}
          onValueChange={setSelectedTab}
          items={tabs}
          ariaLabel="Filtrar reservas"
        >
          {TRIP_TAB_ORDER.map((group) => (
            <TabPanel key={group} value={group} className="mt-6">
              <ReservationList group={group} reservations={groups[group]} />
            </TabPanel>
          ))}
        </SegmentedTabs>
      </RevealItem>
    </Reveal>
  );
}
