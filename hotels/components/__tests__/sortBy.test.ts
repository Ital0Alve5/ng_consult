import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SortBy from "@ng_consult/hotels/components/SortBy.vue";

describe("SortBy Component", () => {
  it("renders the select with placeholder and all items", () => {
    const wrapper = mount(SortBy);

    const trigger = wrapper.find('selecttrigger');
    expect(trigger.exists()).toBe(true);

    const value = wrapper.find('selectvalue');
    expect(value.exists()).toBe(true);
    expect(value.attributes("placeholder")).toBe("Ordenação");

    const items = wrapper.findAll("lazyselectitem");
    expect(items.length).toBe(5);

    const expectedItems = [
      "Sugestões",
      "Maior preço",
      "Menor preço",
      "Maiores avaliações",
      "Menores avaliações",
    ];
    items.forEach((item, index) => {
      expect(item.text().trim()).toBe(expectedItems[index]);
    });
  });

  it("renders the correct group and label", () => {
    const wrapper = mount(SortBy);

    const group = wrapper.find("lazyselectgroup");
    expect(group.exists()).toBe(true);

    const label = wrapper.find("lazyselectlabel");
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe("Ordenar por");
  });
});
