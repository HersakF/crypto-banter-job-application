import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AppChallenges from "@/components/app/challenge/index.vue";
import { challengeItem } from "@test/fixtures/challenge";

describe("AppChallenges", () => {
  it("renders Challenges heading", () => {
    const wrapper = mount(AppChallenges, {
      props: { challenges: [challengeItem] },
    });
    
    expect(wrapper.text()).toContain("Challenges");
  });

  it("renders challenge title and description", () => {
    const wrapper = mount(AppChallenges, {
      props: { challenges: [challengeItem] },
    });
    
    expect(wrapper.text()).toContain("Challenge title");
    expect(wrapper.text()).toContain("Challenge description");
  });

  it("emits onNext with challengeIndex and dayIndex when day next is clicked", async () => {
    const wrapper = mount(AppChallenges, {
      props: { challenges: [challengeItem] },
    });
    const firstDayButton = wrapper.findAll("button")[0];

    await firstDayButton.trigger("click");
    
    expect(wrapper.emitted("onNext")).toHaveLength(1);
    expect(wrapper.emitted("onNext")?.[0]).toEqual([0, 0]);
  });
});
