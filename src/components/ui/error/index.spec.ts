import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import UIError from "@/components/ui/error/index.vue";

describe("UIError", () => {
  it("renders message prop", () => {
    const wrapper = mount(UIError, {
      props: { message: "Something went wrong" },
    });

    expect(wrapper.text()).toContain("Something went wrong");
  });

  it("has role alert", () => {
    const wrapper = mount(UIError, {
      props: { message: "Error" },
    });

    expect(wrapper.find("[role='alert']").exists()).toBe(true);
  });

  it("renders slot content", () => {
    const wrapper = mount(UIError, {
      props: { message: "Error" },
      slots: { default: "<button>Retry</button>" },
    });
    
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.text()).toContain("Retry");
  });
});
