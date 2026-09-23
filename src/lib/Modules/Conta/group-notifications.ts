import type { AppNotification } from "@/@types/Modules/Conta/user";

export type GroupedNotifications = {
  unread: AppNotification[];
  read: AppNotification[];
};

export function groupNotifications(
  notifications: AppNotification[],
): GroupedNotifications {
  return notifications.reduce<GroupedNotifications>(
    (groups, notification) => {
      if (notification.isRead) {
        groups.read.push(notification);
      } else {
        groups.unread.push(notification);
      }

      return groups;
    },
    { unread: [], read: [] },
  );
}
