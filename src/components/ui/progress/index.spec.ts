import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import UIProgress from "@/components/ui/progress/index.vue";

describe("UIProgress", () => {
  it("renders with ui-progress and ui-progress__bar classes", () => {
    const wrapper = mount(UIProgress, {
      props: { value: 50 },
    });

    expect(wrapper.find(".ui-progress").exists()).toBe(true);
    expect(wrapper.find(".ui-progress__bar").exists()).toBe(true);
  });

  it("has progressbar role and aria attributes", () => {
    const wrapper = mount(UIProgress, {
      props: { value: 25 },
    });

    const root = wrapper.find(".ui-progress");

    expect(root.attributes("role")).toBe("progressbar");
    expect(root.attributes("aria-valuemin")).toBe("0");
    expect(root.attributes("aria-valuemax")).toBe("100");
    expect(root.attributes("aria-valuenow")).toBe("25");
  });

  it("sets bar width from value", () => {
    const wrapper = mount(UIProgress, {
      props: { value: 75 },
    });

    const bar = wrapper.find(".ui-progress__bar");

    expect(bar.attributes("style")).toContain("width: 75%");
  });

  it("clamps value to 0 when negative", () => {
    const wrapper = mount(UIProgress, {
      props: { value: -10 },
    });

    const bar = wrapper.find(".ui-progress__bar");

    expect(bar.attributes("style")).toContain("width: 0%");
  });

  it("clamps value to 100 when above 100", () => {
    const wrapper = mount(UIProgress, {
      props: { value: 150 },
    });

    const bar = wrapper.find(".ui-progress__bar");

    expect(bar.attributes("style")).toContain("width: 100%");
  });
});
