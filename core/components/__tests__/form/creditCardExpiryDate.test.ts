import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CreditCardExpiryDate from "@ng_consult/core/components/form/CreditCardExpiryDate.vue";



describe("CreditCardExpiryDate Component", () => {
  it("renders the label and input correctly", () => {
    const wrapper = mount(CreditCardExpiryDate);

    expect(wrapper.text()).toContain("Validade");

    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("MM/AA");
  });

  it("renders the error message when error prop is provided", () => {
    const errorMessage = "Data inválida";
    const wrapper = mount(CreditCardExpiryDate, {
      props: {
        error: errorMessage,
      },
    });

    expect(wrapper.text()).toContain(errorMessage);

    const input = wrapper.find("input");
    expect(input.classes()).toContain("border-feedback-negative-border");
  });

  it("does not render the error message when error prop is empty", () => {
    const wrapper = mount(CreditCardExpiryDate);

    const error = wrapper.find("p.text-feedback-negative-text");
    expect(error.exists()).toBe(false);
  });
});
