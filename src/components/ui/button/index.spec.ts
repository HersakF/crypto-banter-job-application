import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import UIButton from "@/components/ui/button/index.vue";

describe("UIButton", () => {
  it("renders slot content", () => {
    const wrapper = mount(UIButton, {
      slots: { default: "Click me" },
    });

    expect(wrapper.text()).toBe("Click me");
  });

  it("emits onClick when clicked", async () => {
    const wrapper = mount(UIButton, {
      slots: { default: "Submit" },
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("onClick")).toHaveLength(1);
  });

  it("applies size and severity classes", () => {
    const wrapper = mount(UIButton, {
      props: { size: "sm", severity: "primary" },
      slots: { default: "Test" },
    });

    const button = wrapper.find("button");

    expect(button.classes()).toContain("ui-button--sm");
    expect(button.classes()).toContain("ui-button--solid-primary");
  });
});
