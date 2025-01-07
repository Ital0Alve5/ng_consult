import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Cpf from "@ng_consult/core/components/form/Cpf.vue";

describe("Cpf Component", () => {
  it("renders the label and input correctly", () => {
    const wrapper = mount(Cpf);

    expect(wrapper.text()).toContain("CPF");

    const input = wrapper.find("input");
    expect(input.exists()).toBeTruthy();
    expect(input.attributes("placeholder")).toBe("Digite seu CPF");
    expect(input.attributes("type")).toBe("text");
  });

  it("renders the error message when error prop is provided", () => {
    const errorMessage = "CPF inválido";

    const wrapper = mount(Cpf, {
      props: {
        error: errorMessage,
      },
    });

    const errorText = wrapper.find(".text-feedback-negative-text");
    expect(errorText.exists()).toBeTruthy();
    expect(errorText.text()).toBe(errorMessage);
  });
});
