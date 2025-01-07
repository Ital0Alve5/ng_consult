import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SearchHotelName from "@ng_consult/hotels/components/SearchHotelName.vue";

describe("SearchHotelName Component", () => {
  it("renders the input with placeholder and search icon", () => {
    const wrapper = mount(SearchHotelName);

    const input = wrapper.find("input");
    const icon = wrapper.find("span");

    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("Procure pelo nome do hotel");
    expect(icon.exists()).toBe(true);
    expect(icon.find(".lucide-search-icon").exists()).toBe(true);
  });

  it("applies the correct class to the input", () => {
    const wrapper = mount(SearchHotelName);

    const input = wrapper.find("input");
    expect(input.classes()).toContain("pl-10");
  });
});
