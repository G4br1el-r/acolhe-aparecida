import type { AppNotification } from "@/@types/Modules/Conta/user";
import { groupNotifications } from "./group-notifications";

function buildNotification(id: string, isRead: boolean): AppNotification {
  return {
    id,
    userId: "usr-teste",
    kind: "evento",
    title: `Notificação ${id}`,
    body: "Corpo",
    createdAt: "2026-09-01T10:00:00.000Z",
    isRead,
  };
}

describe("groupNotifications", () => {
  it("returns empty groups for an empty list", () => {
    expect(groupNotifications([])).toEqual({ unread: [], read: [] });
  });

  it("splits unread and read keeping the original order", () => {
    const first = buildNotification("1", false);
    const second = buildNotification("2", true);
    const third = buildNotification("3", false);

    expect(groupNotifications([first, second, third])).toEqual({
      unread: [first, third],
      read: [second],
    });
  });
});
