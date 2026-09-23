"use client";

import { ChevronRight } from "lucide-react";
import type { AppNotification } from "@/@types/Modules/Conta/user";
import { NotificationKindIcon } from "@/components/Modules/Conta/Notificacoes/NotificationKindIcon";
import { formatRelativeTime } from "@/lib/Modules/Conta/format-relative-time";
import { cn } from "@/lib/utils";

type NotificationItemProps = {
  notification: AppNotification;
  onOpen: (notification: AppNotification) => void;
};

export function NotificationItem({
  notification,
  onOpen,
}: NotificationItemProps) {
  const isUnread = !notification.isRead;

  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(notification)}
        className={cn(
          "flex w-full cursor-pointer items-start gap-4 rounded-2xl px-4 py-4 text-left transition-colors hover:bg-blue-50/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900",
          isUnread
            ? "bg-white shadow-sm ring-1 ring-blue-950/8"
            : "bg-transparent",
        )}
      >
        <NotificationKindIcon kind={notification.kind} />

        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-3">
            <span
              className={cn(
                "text-sm text-blue-950",
                isUnread ? "font-semibold" : "font-medium",
              )}
            >
              {notification.title}
              {isUnread && <span className="sr-only"> (não lida)</span>}
            </span>
            <span className="shrink-0 text-xs text-blue-950/50">
              {formatRelativeTime(notification.createdAt)}
            </span>
          </span>
          <span className="mt-1 block text-sm text-blue-950/65">
            {notification.body}
          </span>
        </span>

        {notification.href && (
          <ChevronRight
            className="mt-2.5 h-4 w-4 shrink-0 text-blue-950/35"
            aria-hidden
          />
        )}
      </button>
    </li>
  );
}
