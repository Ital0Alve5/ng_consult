import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import GuestsQuantity from "@ng_consult/hotels/components/GuestsQuantity.vue";

describe("GuestsQuantity Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the component correctly", () => {
    const wrapper = mount(GuestsQuantity, {
      props: {
        modelValue: 1,
      },
    });

    expect(wrapper.text()).toContain("Hóspedes");
    expect(wrapper.find("numberfieldinput").exists()).toBe(true);
    expect(wrapper.find("numberfielddecrement").exists()).toBe(true);
    expect(wrapper.find("numberfieldincrement").exists()).toBe(true);
  });
});
