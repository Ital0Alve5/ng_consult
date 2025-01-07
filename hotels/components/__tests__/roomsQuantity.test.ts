import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import RoomsQuantity from "@ng_consult/hotels/components/RoomsQuantity.vue";

describe("RoomsQuantity Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the component correctly", () => {
    const wrapper = mount(RoomsQuantity, {
      props: {
        modelValue: 1,
      },
    });

    expect(wrapper.text()).toContain("Quartos");
    expect(wrapper.find("numberfieldinput").exists()).toBe(true);
    expect(wrapper.find("numberfielddecrement").exists()).toBe(true);
    expect(wrapper.find("numberfieldincrement").exists()).toBe(true);
  });
});
