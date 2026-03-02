import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AppChallengesDay from "@/components/app/day/index.vue";
import { dayItem, dayItemDefault, dayItemInProgress, dayItemCompleted } from "@test/fixtures/day";

describe("AppChallengesDay", () => {
  it("renders day title and description", () => {
    const wrapper = mount(AppChallengesDay, {
      props: { day: dayItem, index: 0 },
    });

    expect(wrapper.text()).toContain("Day title");
    expect(wrapper.text()).toContain("Day description");
  });

  it("shows Start when day is active with no progress", () => {
    const wrapper = mount(AppChallengesDay, {
      props: { day: dayItem, index: 0 },
    });

    expect(wrapper.text()).toContain("Start");
  });

  it("shows Continue when day is in progress", () => {
    const wrapper = mount(AppChallengesDay, {
      props: { day: dayItemInProgress, index: 0 },
    });

    expect(wrapper.text()).toContain("Continue");
  });

  it("shows Completed when day is completed", () => {
    const wrapper = mount(AppChallengesDay, {
      props: { day: dayItemCompleted, index: 0 },
    });

    expect(wrapper.text()).toContain("Completed");
  });

  it("shows Locked when day is locked", () => {
    const wrapper = mount(AppChallengesDay, {
      props: { day: dayItemDefault, index: 1 },
    });

    expect(wrapper.text()).toContain("Locked");
  });

  it("applies challenge-day--is-active and index--is-active when day is active", () => {
    const wrapper = mount(AppChallengesDay, {
      props: { day: dayItem, index: 0 },
    });

    expect(wrapper.find(".challenge-day--is-active").exists()).toBe(true);
    expect(wrapper.find(".index--is-active").exists()).toBe(true);
  });

  it("does not apply challenge-day--is-active and index--is-active when day is locked", () => {
    const wrapper = mount(AppChallengesDay, {
      props: { day: dayItemDefault, index: 1 },
    });

    expect(wrapper.find(".challenge-day--is-active").exists()).toBe(false);
    expect(wrapper.find(".index--is-active").exists()).toBe(false);
  });

  it("emits onNext when action button is clicked", async () => {
    const wrapper = mount(AppChallengesDay, {
      props: { day: dayItem, index: 0 },
    });

    await wrapper.find("button").trigger("click");
    
    expect(wrapper.emitted("onNext")).toHaveLength(1);
  });
});
