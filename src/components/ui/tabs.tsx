"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TabItem<Value extends string> = {
  value: Value;
  label: string;
  count?: number;
};

type SegmentedTabsProps<Value extends string> = {
  value: Value;
  onValueChange: (value: Value) => void;
  items: TabItem<Value>[];
  ariaLabel: string;
  className?: string;
  children?: ReactNode;
};

export function SegmentedTabs<Value extends string>({
  value,
  onValueChange,
  items,
  ariaLabel,
  className,
  children,
}: SegmentedTabsProps<Value>) {
  return (
    <TabsPrimitive.Root
      value={value}
      onValueChange={(next) => onValueChange(next as Value)}
      className={className}
    >
      <TabsPrimitive.List
        aria-label={ariaLabel}
        className="relative inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-blue-50 p-1 scrollbar-none"
      >
        {items.map((item) => (
          <TabsPrimitive.Tab
            key={item.value}
            value={item.value}
            className="relative z-10 flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-blue-950/70 transition-colors data-active:text-white hover:text-blue-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            {item.label}
            {item.count !== undefined && (
              <span className="rounded-full bg-blue-950/10 px-1.5 text-xs tabular-nums data-active:bg-white/20">
                {item.count}
              </span>
            )}
          </TabsPrimitive.Tab>
        ))}
        <TabsPrimitive.Indicator className="absolute top-1 left-0 z-0 h-[calc(100%-0.5rem)] w-(--active-tab-width) translate-x-(--active-tab-left) rounded-full bg-blue-950 transition-all duration-250 ease-out" />
      </TabsPrimitive.List>
      {children}
    </TabsPrimitive.Root>
  );
}

export function TabPanel({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <TabsPrimitive.Panel
      value={value}
      className={cn("outline-none", className)}
    >
      {children}
    </TabsPrimitive.Panel>
  );
}
