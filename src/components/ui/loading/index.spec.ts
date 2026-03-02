import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import UILoading from "@/components/ui/loading/index.vue";

describe("UILoading", () => {
  it("renders message prop", () => {
    const wrapper = mount(UILoading, {
      props: { message: "Loading challenges..." },
    });

    expect(wrapper.text()).toContain("Loading challenges...");
  });

  it("has role status and aria-live polite", () => {
    const wrapper = mount(UILoading, {
      props: { message: "Loading" },
    });
    const status = wrapper.find("[role='status']");
    
    expect(status.exists()).toBe(true);
    expect(status.attributes("aria-live")).toBe("polite");
  });
});
