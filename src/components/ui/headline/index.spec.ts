import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import UIHeadline from "@/components/ui/headline/index.vue";

describe("UIHeadline", () => {
  it("renders title", () => {
    const wrapper = mount(UIHeadline, {
      props: { title: "Test title" },
    });

    expect(wrapper.text()).toContain("Test title");
    expect(wrapper.find(".ui-headline__title").text()).toBe("Test title");
  });

  it("renders description when provided", () => {
    const wrapper = mount(UIHeadline, {
      props: { title: "Title", description: "Test description" },
    });

    expect(wrapper.find(".ui-headline__description").exists()).toBe(true);
    expect(wrapper.find(".ui-headline__description").text()).toBe("Test description");
  });

  it("does not render description when not provided", () => {
    const wrapper = mount(UIHeadline, {
      props: { title: "Title only" },
    });

    expect(wrapper.find(".ui-headline__description").exists()).toBe(false);
  });

  it("renders with ui-headline and ui-headline__title classes", () => {
    const wrapper = mount(UIHeadline, {
      props: { title: "Headline" },
    });

    expect(wrapper.find(".ui-headline").exists()).toBe(true);
    expect(wrapper.find(".ui-headline__title").exists()).toBe(true);
  });
});
