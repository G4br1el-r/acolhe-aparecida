"use client";

import { BellOff, CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { AppNotification } from "@/@types/Modules/Conta/user";
import { NotificationItem } from "@/components/Modules/Conta/Notificacoes/NotificationItem";
import { ContaPageHeading } from "@/components/Modules/Conta/Shared/ContaPageHeading";
import { BrandButton, BrandLink } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
} from "@/hooks/Modules/Conta/use-notifications";
import { groupNotifications } from "@/lib/Modules/Conta/group-notifications";

export function NotificationsList() {
  const router = useRouter();
  const {
    data: notifications,
    isPending,
    isError,
    refetch,
  } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const groups = groupNotifications(notifications ?? []);
  const hasUnread = groups.unread.length > 0;

  function handleOpen(notification: AppNotification) {
    if (!notification.isRead) {
      markRead.mutate(notification.id);
    }

    if (notification.href) {
      router.push(notification.href);
    }
  }

  function handleMarkAll() {
    markAllRead.mutate(undefined, {
      onSuccess: () => toast.success("Tudo lido por aqui."),
      onError: (error) => toast.error(error.message),
    });
  }

  return (
    <section aria-labelledby="notificacoes-title">
      <ContaPageHeading
        title="Notificações"
        description="Avisos sobre sua reserva, pagamento, check-in e datas importantes em Aparecida."
        action={
          hasUnread ? (
            <BrandButton
              variant="secondary"
              size="sm"
              onClick={handleMarkAll}
              isLoading={markAllRead.isPending}
              loadingLabel="Marcando"
            >
              <CheckCheck className="h-4 w-4" aria-hidden />
              Marcar todas como lidas
            </BrandButton>
          ) : undefined
        }
      />

      {isPending ? (
        <div aria-busy className="mt-8 flex flex-col gap-3">
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
        </div>
      ) : isError ? (
        <EmptyState
          icon={BellOff}
          tone="error"
          title="Não conseguimos carregar suas notificações"
          description="Tente de novo em instantes."
          action={
            <BrandButton variant="outline" onClick={() => refetch()}>
              Tentar novamente
            </BrandButton>
          }
          className="mt-8"
        />
      ) : notifications && notifications.length === 0 ? (
        <EmptyState
          icon={BellOff}
          title="Nada por enquanto"
          description="Quando você reservar, avisamos por aqui sobre pagamento, check-in e o que acontece na cidade nas suas datas."
          action={
            <BrandLink href="/hospedagens" variant="secondary">
              Ver hospedagens
            </BrandLink>
          }
          className="mt-8"
        />
      ) : (
        <div className="mt-8 flex flex-col gap-10">
          {hasUnread && (
            <div>
              <h3 className="px-4 text-xs font-semibold uppercase tracking-wide text-blue-900/60">
                Novas
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {groups.unread.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onOpen={handleOpen}
                  />
                ))}
              </ul>
            </div>
          )}

          {groups.read.length > 0 && (
            <div>
              <h3 className="px-4 text-xs font-semibold uppercase tracking-wide text-blue-950/45">
                Anteriores
              </h3>
              <ul className="mt-3 flex flex-col divide-y divide-blue-950/8">
                {groups.read.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onOpen={handleOpen}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
