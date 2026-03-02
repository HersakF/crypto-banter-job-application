import { describe, it, expect } from "vitest";
import { useAppTasks } from "@/composables/app/tasks/useTasks";
import { taskItem, taskItemCompleted } from "@test/fixtures/task";

describe("useAppTasks", () => {
  it("returns getId and getDayId from task", () => {
    const { getId, getDayId } = useAppTasks();

    expect(getId(taskItem)).toBe(1);
    expect(getDayId(taskItem)).toBe(1);
    expect(getId({} as Parameters<typeof getId>[0])).toBe(0);
    expect(getDayId({} as Parameters<typeof getDayId>[0])).toBe(0);
  });

  it("returns getTitle, getDescription and getType from task", () => {
    const { getTitle, getDescription, getType } = useAppTasks();

    expect(getTitle(taskItem)).toBe("Task title");
    expect(getDescription(taskItem)).toBe("Task description");
    expect(getType(taskItem)).toBe("video");
    expect(getTitle({} as Parameters<typeof getTitle>[0])).toBe("-");
    expect(getDescription({} as Parameters<typeof getDescription>[0])).toBe("-");
    expect(getType({} as Parameters<typeof getType>[0])).toBe("-");
  });

  it("returns getIsCompleted from task", () => {
    const { getIsCompleted } = useAppTasks();

    expect(getIsCompleted(taskItem)).toBe(false);
    expect(getIsCompleted(taskItemCompleted)).toBe(true);
    expect(getIsCompleted({} as Parameters<typeof getIsCompleted>[0])).toBe(false);
  });

  it("returns getCreatedAt and getUpdatedAt from task", () => {
    const { getCreatedAt, getUpdatedAt } = useAppTasks();
    
    expect(getCreatedAt(taskItem)).toBe("2025-01-01T00:00:00Z");
    expect(getUpdatedAt(taskItem)).toBe("2025-01-01T00:00:00Z");
    expect(getCreatedAt({} as Parameters<typeof getCreatedAt>[0])).toBe(null);
    expect(getUpdatedAt({} as Parameters<typeof getUpdatedAt>[0])).toBe(null);
  });
});
