import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Email from "@ng_consult/core/components/form/Email.vue";

describe("Email Component", () => {
  it("renders the label correctly", () => {
    const wrapper = mount(Email, {
      props: {
        error: "",
      },
    });

    expect(wrapper.text()).toContain("E-mail");
  });

  it("renders the placeholder correctly", () => {
    const wrapper = mount(Email, {
      props: {
        error: "",
      },
    });

    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("Digite seu E-mail");
  });

  it("applies error styling when error prop is provided", () => {
    const wrapper = mount(Email, {
      props: {
        error: "E-mail inválido",
      },
    });

    const input = wrapper.find("input");
    expect(input.classes()).toContain("border-feedback-negative-border");

    const errorElement = wrapper.find("p.text-feedback-negative-text");
    expect(errorElement.exists()).toBe(true);
    expect(errorElement.text()).toBe("E-mail inválido");
  });

  it("does not apply error styling when error prop is empty", () => {
    const wrapper = mount(Email, {
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
