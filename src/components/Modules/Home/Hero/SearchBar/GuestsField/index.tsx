"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type GuestGroup = {
  id: string;
  label: string;
};

const GUEST_GROUPS: GuestGroup[] = [
  { id: "familia-pequena", label: "Família Pequena (até 6 pessoas)" },
  {
    id: "caravana-familia-grande",
    label: "Caravana / Família Grande (10 a 16)",
  },
  { id: "grande-romaria", label: "Grande Romaria (18 a 30 pessoas)" },
  { id: "casal-peregrino-solo", label: "Casal / Peregrino Solo" },
];

const DEFAULT_GUEST_GROUP_ID = GUEST_GROUPS[1].id;

export function GuestsField() {
  const [selectedGroupId, setSelectedGroupId] = useState(
    DEFAULT_GUEST_GROUP_ID,
  );

  const selectedGroup = GUEST_GROUPS.find(
    (group) => group.id === selectedGroupId,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-full px-4 py-2 text-left outline-none transition-colors hover:bg-black/3 focus-visible:ring-2 focus-visible:ring-blue-600">
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Hóspedes
          </span>
          <span className="truncate text-sm text-blue-950/80">
            {selectedGroup?.label}
          </span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-blue-900/60" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72">
        <DropdownMenuRadioGroup
          value={selectedGroupId}
          onValueChange={setSelectedGroupId}
        >
          {GUEST_GROUPS.map((group) => (
            <DropdownMenuRadioItem
              key={group.id}
              value={group.id}
              className="cursor-pointer"
            >
              {group.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
