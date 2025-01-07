import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PhoneNumber from "@ng_consult/core/components/form/PhoneNumber.vue";

describe("PhoneNumber Component", () => {
  it("renders the label correctly", () => {
    const wrapper = mount(PhoneNumber, {
      props: {
        error: "",
      },
    });

    expect(wrapper.text()).toContain("Telefone");
  });

  it("renders the placeholder correctly", () => {
    const wrapper = mount(PhoneNumber, {
      props: {
        error: "",
      },
    });

    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("(xx) xxxx-xxxx");
  });

  it("applies error styling when error prop is provided", () => {
    const wrapper = mount(PhoneNumber, {
      props: {
        error: "Número inválido",
      },
    });

    const input = wrapper.find("input");
    expect(input.classes()).toContain("border-feedback-negative-border");

    const errorElement = wrapper.find("p.text-feedback-negative-text");
    expect(errorElement.exists()).toBe(true);
    expect(errorElement.text()).toBe("Número inválido");
  });

  it("does not apply error styling when error prop is empty", () => {
    const wrapper = mount(PhoneNumber, {
      props: {
        error: "",
      },
    });

    const input = wrapper.find("input");
    expect(input.classes()).not.toContain("border-feedback-negative-border");

    const errorElement = wrapper.find("p.text-feedback-negative-text");
    expect(errorElement.exists()).toBe(false);
  });
});
