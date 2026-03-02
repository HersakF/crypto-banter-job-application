import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import UIApp from "@/components/ui/app/index.vue";

describe("UIApp", () => {
  it("renders slot content", () => {
    const wrapper = mount(UIApp, {
      slots: { default: "App content" },
    });

    expect(wrapper.text()).toBe("App content");
  });
});
