import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import UIContainer from "@/components/ui/container/index.vue";

describe("UIContainer", () => {
  it("renders slot content", () => {
    const wrapper = mount(UIContainer, {
      slots: { default: "Container content" },
    });

    expect(wrapper.text()).toBe("Container content");
  });
});
