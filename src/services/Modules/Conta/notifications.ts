import type {
  AppNotification,
  NotificationKind,
} from "@/@types/Modules/Conta/user";
import { delay, FAST_LATENCY_IN_MS } from "@/mocks/latency";
import { SEEDED_NOTIFICATIONS } from "@/mocks/Modules/Conta/notifications";
import { createMockId, readCollection, writeCollection } from "@/mocks/storage";

function readNotifications(): AppNotification[] {
  return readCollection<AppNotification>(
    "notifications",
    () => SEEDED_NOTIFICATIONS,
  );
}

export async function fetchNotifications(
  userId: string,
): Promise<AppNotification[]> {
  await delay(FAST_LATENCY_IN_MS);

  return readNotifications()
    .filter((notification) => notification.userId === userId)
    .sort((first, second) => second.createdAt.localeCompare(first.createdAt));
}

export async function markNotificationRead(
  notificationId: string,
): Promise<void> {
  await delay(FAST_LATENCY_IN_MS);

  writeCollection(
    "notifications",
    readNotifications().map((notification) =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification,
    ),
  );
}

export async function markAllNotificationsRead(userId: string): Promise<void> {
  await delay(FAST_LATENCY_IN_MS);

  writeCollection(
    "notifications",
    readNotifications().map((notification) =>
      notification.userId === userId
        ? { ...notification, isRead: true }
        : notification,
    ),
  );
}

export type PushNotificationInput = {
  userId: string;
  kind: NotificationKind;
  title: string;
  body: string;
  href?: string;
};

export function pushNotification(
  input: PushNotificationInput,
): AppNotification {
  const notification: AppNotification = {
    id: createMockId("ntf"),
    userId: input.userId,
    kind: input.kind,
    title: input.title,
    body: input.body,
    href: input.href,
    createdAt: new Date().toISOString(),
    isRead: false,
  };

  writeCollection("notifications", [notification, ...readNotifications()]);

  return notification;
}
