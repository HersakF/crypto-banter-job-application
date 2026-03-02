import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AppChallengesTask from "@/components/app/task/index.vue";
import { taskItem, taskItemCompleted } from "@test/fixtures/task";

describe("AppChallengesTask", () => {
  it("renders task title and description", () => {
    const wrapper = mount(AppChallengesTask, {
      props: { task: taskItem },
    });

    expect(wrapper.text()).toContain("Task title");
    expect(wrapper.text()).toContain("Task description");
  });

  it("renders task type", () => {
    const wrapper = mount(AppChallengesTask, {
      props: { task: taskItem },
    });

    expect(wrapper.text()).toContain("video");
  });

  it("applies completed class when task is completed", () => {
    const wrapper = mount(AppChallengesTask, {
      props: { task: taskItemCompleted },
    });

    expect(wrapper.find(".challenge-task--is-completed").exists()).toBe(true);
  });

  it("does not apply completed class when task is not completed", () => {
    const wrapper = mount(AppChallengesTask, {
      props: { task: taskItem },
    });
    
    expect(wrapper.find(".challenge-task--is-completed").exists()).toBe(false);
  });
});
