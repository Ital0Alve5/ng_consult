import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FullName from "@ng_consult/core/components/form/FullName.vue";

describe("FullName Component", () => {
  it("renders the label correctly", () => {
    const wrapper = mount(FullName, {
      props: {
        error: "",
      },
    });

    expect(wrapper.text()).toContain("Nome completo");
  });

  it("renders the placeholder correctly", () => {
    const wrapper = mount(FullName, {
      props: {
        error: "",
      },
    });

    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("Digite seu nome completo");
  });

  it("applies error styling when error prop is provided", () => {
    const wrapper = mount(FullName, {
      props: {
        error: "Nome inválido",
      },
    });

    const input = wrapper.find("input");
    expect(input.classes()).toContain("border-feedback-negative-border");

    const errorElement = wrapper.find("p.text-feedback-negative-text");
    expect(errorElement.exists()).toBe(true);
    expect(errorElement.text()).toBe("Nome inválido");
  });

  it("does not apply error styling when error prop is empty", () => {
    const wrapper = mount(FullName, {
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
