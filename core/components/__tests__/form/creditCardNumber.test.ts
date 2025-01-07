import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CreditCardNumber from "@ng_consult/core/components/form/CreditCardNumber.vue";

describe("CreditCardNumber Component", () => {
  it("renders the label correctly", () => {
    const wrapper = mount(CreditCardNumber, {
      props: {
        error: "",
      },
    });

    expect(wrapper.text()).toContain("Número do cartão");
  });

  it("renders the placeholder correctly", () => {
    const wrapper = mount(CreditCardNumber, {
      props: {
        error: "",
      },
    });

    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("Digite o número do cartão");
  });

  it("applies error styling when error prop is provided", () => {
    const wrapper = mount(CreditCardNumber, {
      props: {
        error: "Número do cartão inválido",
      },
    });

    const input = wrapper.find("input");
    expect(input.classes()).toContain("border-feedback-negative-border");

    const errorElement = wrapper.find("p.text-feedback-negative-text");
    expect(errorElement.exists()).toBe(true);
    expect(errorElement.text()).toBe("Número do cartão inválido");
  });

  it("does not apply error styling when error prop is empty", () => {
    const wrapper = mount(CreditCardNumber, {
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
