import { describe, it, expect } from "vitest";
import { useAppDays } from "@/composables/app/days/useDays";
import { dayItem, dayItemDefault, dayItemInProgress, dayItemCompleted } from "@test/fixtures/day";

describe("useAppDays", () => {
  it("returns getId and getChallengeId from day", () => {
    const { getId, getChallengeId } = useAppDays();

    expect(getId(dayItem)).toBe(1);
    expect(getChallengeId(dayItem)).toBe(1);
    expect(getId({} as Parameters<typeof getId>[0])).toBe(0);
    expect(getChallengeId({} as Parameters<typeof getChallengeId>[0])).toBe(0);
  });

  it("returns getTitle and getDescription from day", () => {
    const { getTitle, getDescription } = useAppDays();

    expect(getTitle(dayItem)).toBe("Day title");
    expect(getDescription(dayItem)).toBe("Day description");
    expect(getTitle({} as Parameters<typeof getTitle>[0])).toBe("-");
    expect(getDescription({} as Parameters<typeof getDescription>[0])).toBe("-");
  });

  it("returns getIsActive and getProgress from day", () => {
    const { getIsActive, getProgress } = useAppDays();

    expect(getIsActive(dayItem)).toBe(true);
    expect(getIsActive(dayItemDefault)).toBe(false);
    expect(getProgress(dayItem)).toBe(0);
    expect(getProgress(dayItemInProgress)).toBe(50);
    expect(getProgress(dayItemCompleted)).toBe(100);
    expect(getIsActive({} as Parameters<typeof getIsActive>[0])).toBe(false);
    expect(getProgress({} as Parameters<typeof getProgress>[0])).toBe(0);
  });

  it("returns getCreatedAt and getUpdatedAt from day", () => {
    const { getCreatedAt, getUpdatedAt } = useAppDays();

    expect(getCreatedAt(dayItem)).toBe("2025-01-01T00:00:00Z");
    expect(getUpdatedAt(dayItem)).toBe("2025-01-01T00:00:00Z");
    expect(getCreatedAt({} as Parameters<typeof getCreatedAt>[0])).toBe(null);
    expect(getUpdatedAt({} as Parameters<typeof getUpdatedAt>[0])).toBe(null);
  });

  it("returns getTasks from day", () => {
    const { getTasks } = useAppDays();
    
    expect(getTasks(dayItem)).toHaveLength(2);
    expect(getTasks(dayItemDefault)).toEqual([]);
    expect(getTasks({} as Parameters<typeof getTasks>[0])).toEqual([]);
  });
});
