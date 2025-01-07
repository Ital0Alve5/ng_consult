import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Cvv from "@ng_consult/core/components/form/CreditCardCvc.vue";

describe("Cvv Component", () => {
  it("renders the label and input correctly", () => {
    const wrapper = mount(Cvv);

    expect(wrapper.text()).toContain("CVV");

    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("xxx");
  });

  it("renders the error message when error prop is provided", () => {
    const errorMessage = "CVV inválido";
    const wrapper = mount(Cvv, {
      props: {
        error: errorMessage,
      },
    });

    expect(wrapper.text()).toContain(errorMessage);

    const input = wrapper.find("input");
    expect(input.classes()).toContain("border-feedback-negative-border");
  });

  it("does not render the error message when error prop is empty", () => {
    const wrapper = mount(Cvv);

    const error = wrapper.find("p.text-feedback-negative-text");
    expect(error.exists()).toBe(false);
  });
});
