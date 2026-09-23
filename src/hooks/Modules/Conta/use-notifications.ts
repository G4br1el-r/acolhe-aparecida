"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/services/Modules/Conta/notifications";
import { useSessionStore } from "@/store/Modules/Conta/use-session-store";

export const NOTIFICATIONS_QUERY_KEY = "notificacoes";

export function useNotifications() {
  const userId = useSessionStore((state) => state.userId);

  return useQuery({
    queryKey: [NOTIFICATIONS_QUERY_KEY, userId],
    queryFn: () => (userId ? fetchNotifications(userId) : Promise.resolve([])),
    enabled: Boolean(userId),
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      markNotificationRead(notificationId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] }),
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  const userId = useSessionStore((state) => state.userId);

  return useMutation({
    mutationFn: () =>
      userId ? markAllNotificationsRead(userId) : Promise.resolve(),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] }),
  });
}
