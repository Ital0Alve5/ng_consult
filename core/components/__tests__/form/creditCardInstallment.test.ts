import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import formatCurrency from "@ng_consult/core/utils/format/formatCurrency";
import calculateInstallmentValue from "@ng_consult/core/utils/calc/calculateInstallmentValue";
import { FormCreditCardInstallment } from "#components";

describe("CreditCardInstallment Component", () => {
  it("renders the label and placeholder correctly", () => {
    const wrapper = mount(FormCreditCardInstallment, {
      props: {
        price: 1000,
        installments: [],
      },
    });

    expect(wrapper.text()).toContain("Parcelas");

    const selectTrigger = wrapper.find("selectvalue");

    expect(selectTrigger.exists()).toBe(true);

    const placeholder = selectTrigger.attributes("placeholder");

    expect(placeholder).toBe(
      `1x de ${formatCurrency(1000)}.Total: ${formatCurrency(1000)}`
    );
  });

  it("renders the list of installments correctly", () => {
    const installments = [
      { installment: 1, tax: 0 },
      { installment: 2, tax: 0.05 },
      { installment: 3, tax: 0.1 },
    ];

    const wrapper = mount(FormCreditCardInstallment, {
      props: {
        price: 1000,
        installments,
      },
    });

    const items = wrapper.findAll("selectitem");
    expect(items.length).toBe(installments.length);

    items.forEach((item, index) => {
      const installment = installments[index];
      expect(item.text()).toContain(
        `${installment.installment}x de ${formatCurrency(
          calculateInstallmentValue(
            1000,
            installment.tax,
            installment.installment
          )
        )}`
      );
    });
  });

  it("renders the error message when error prop is provided", () => {
    const wrapper = mount(FormCreditCardInstallment, {
      props: {
        price: 1000,
        installments: [],
        error: "Erro ao selecionar parcela",
      },
    });

    expect(wrapper.text()).toContain("Erro ao selecionar parcela");

    const errorElement = wrapper.find("p.text-red-500");
    expect(errorElement.exists()).toBe(true);
  });

  it("does not render the error message when error prop is empty", () => {
    const wrapper = mount(FormCreditCardInstallment, {
      props: {
        price: 1000,
        installments: [],
      },
    });

    const errorElement = wrapper.find("p.text-red-500");
    expect(errorElement.exists()).toBe(false);
  });
});
