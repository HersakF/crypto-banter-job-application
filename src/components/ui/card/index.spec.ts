import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import UICard from "@/components/ui/card/index.vue";

describe("UICard", () => {
  it("renders slot content", () => {
    const wrapper = mount(UICard, {
      slots: { default: "Card content" },
    });

    expect(wrapper.text()).toBe("Card content");
  });
});
