import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "../Header/index.vue";

const mockLogout = vi.fn();
vi.mock("@ng_consult/auth/store/useAuth", () => ({
  useAuthStore: () => ({
    user: { name: "João" },
    logout: mockLogout,
  }),
}));

describe("Header Component", () => {
  it("renders the user name from the store", () => {
    const wrapper = mount(Header);

    expect(wrapper.text()).toContain("Olá, João");
  });
});
