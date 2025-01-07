import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Password from "@ng_consult/core/components/form/Password.vue";

describe("Password Component", () => {
  it("renders the label correctly", () => {
    const wrapper = mount(Password, {
      props: {
        error: "",
      },
    });

    expect(wrapper.text()).toContain("Senha");
  });

  it("renders the placeholder correctly", () => {
    const wrapper = mount(Password, {
      props: {
        error: "",
      },
    });

    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("Digite sua Senha");
  });

  it("toggles password visibility when the button is clicked", async () => {
    const wrapper = mount(Password, {
      props: {
        error: "",
      },
    });

    const button = wrapper.find("button");
    const input = wrapper.find("input");

    expect(input.attributes("type")).toBe("password");

    await button.trigger("click");
    expect(input.attributes("type")).toBe("text");

    await button.trigger("click");
    expect(input.attributes("type")).toBe("password");
  });

  it("renders the Eye icon when password is hidden", () => {
    const wrapper = mount(Password, {
      props: {
        error: "",
      },
    });

    const eyeIcon = wrapper.find(".lucide-eye-icon" );
    expect(eyeIcon.exists()).toBe(true);

    const eyeOffIcon = wrapper.find(".lucide-eye-off-icon");
    expect(eyeOffIcon.exists()).toBe(false);
  });

  it("renders the EyeOff icon when password is visible", async () => {
    const wrapper = mount(Password, {
      props: {
        error: "",
      },
    });

    const button = wrapper.find("button");

    await button.trigger("click");
    const eyeOffIcon = wrapper.find(".lucide-eye-off-icon");
    expect(eyeOffIcon.exists()).toBe(true);

    const eyeIcon = wrapper.find(".lucide-eye-icon" );
    expect(eyeIcon.exists()).toBe(false);
  });

  it("applies error styling when error prop is provided", () => {
    const wrapper = mount(Password, {
      props: {
        error: "Senha inválida",
      },
    });

    const input = wrapper.find("input");
    expect(input.classes()).toContain("border-feedback-negative-border");

    const errorElement = wrapper.find("p.text-feedback-negative-text");
    expect(errorElement.exists()).toBe(true);
    expect(errorElement.text()).toBe("Senha inválida");
  });

  it("does not apply error styling when error prop is empty", () => {
    const wrapper = mount(Password, {
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
