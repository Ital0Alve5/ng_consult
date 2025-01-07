import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import NotificationComponent from "../Header/Notification.vue";

const mockRemoveNotification = vi.fn();
let notificationsMock: {
  id: number;
  roomName: string;
  message: string;
  date: string;
}[] = [];

vi.mock("@/store/useNotificationStore", () => ({
  useNotificationStore: () => ({
    notifications: notificationsMock,
    removeNotification: mockRemoveNotification,
  }),
}));

describe("NotificationComponent", () => {
  beforeEach(() => {
    notificationsMock = [];
    mockRemoveNotification.mockClear();
  });

  it("renders the BellDot icon when there are notifications", () => {
    notificationsMock = [
      {
        id: 1,
        roomName: "Quarto 101",
        message: "Novo hóspede chegou.",
        date: "06/01/2025 15:30",
      },
    ];

    const wrapper = mount(NotificationComponent);
    const bellDotIcon = wrapper.find(".lucide-bell-dot-icon");
    expect(bellDotIcon.exists()).toBe(true);
  });

  it("renders the Bell icon when there are no notifications", () => {
    notificationsMock = [];

    const wrapper = mount(NotificationComponent);

    const bellIcon = wrapper.find(".lucide-bell-icon");
    expect(bellIcon.exists()).toBe(true);
  });
});
