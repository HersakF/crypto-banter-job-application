import { describe, it, expect } from "vitest";
import { useChallengeProgress } from "@/composables/app/useChallengeProgress";
import type { AppChallenge } from "@/types/app/challenge";
import { challengeItem } from "@test/fixtures/challenge";
import { dayItem } from "@test/fixtures/day";
import { taskItem } from "@test/fixtures/task";

describe("useChallengeProgress", () => {
  it("setChallenges with null sets challenges to empty array", () => {
    const { challenges, setChallenges } = useChallengeProgress();

    setChallenges(null);
    expect(challenges.value).toEqual([]);
  });

  it("setChallenges with empty array sets challenges to empty", () => {
    const { challenges, setChallenges } = useChallengeProgress();

    setChallenges([]);
    expect(challenges.value).toEqual([]);
  });

  it("setChallenges with data deep-clones and sets challenges", () => {
    const { challenges, setChallenges } = useChallengeProgress();

    setChallenges([challengeItem]);
    expect(challenges.value).toHaveLength(1);
    expect(challenges.value[0].title).toBe(challengeItem.title);
    expect(challenges.value[0]).not.toBe(challengeItem);
  });

  it("setNextTask marks first incomplete task completed and updates progress", () => {
    const dayWithTwoIncomplete = {
      ...dayItem,
      id: 10,
      tasks: [
        { ...taskItem, id: 1, is_completed: false },
        { ...taskItem, id: 2, is_completed: false },
      ],
    };
    const challenge: AppChallenge = {
      ...challengeItem,
      id: 1,
      days: [dayWithTwoIncomplete],
    };
    const { challenges, setChallenges, setNextTask } = useChallengeProgress();

    setChallenges([challenge]);
    setNextTask(0, 0);

    const day = challenges.value[0].days?.[0];

    expect(day?.tasks?.[0].is_completed).toBe(true);
    expect(day?.tasks?.[1].is_completed).toBe(false);
    expect(day?.progress).toBe(50);
    expect(day?.is_active).toBe(true);
  });

  it("setNextTask when all tasks done deactivates day and activates next", () => {
    const day1 = {
      ...dayItem,
      id: 1,
      is_active: true,
      progress: 0,
      tasks: [
        { ...taskItem, id: 1, is_completed: false },
        { ...taskItem, id: 2, is_completed: false },
      ],
    };
    const day2 = {
      ...dayItem,
      id: 2,
      is_active: false,
      progress: 0,
      tasks: [{ ...taskItem, id: 3, is_completed: false }],
    };
    const challenge: AppChallenge = {
      ...challengeItem,
      id: 1,
      days: [day1, day2],
    };
    const { challenges, setChallenges, setNextTask } = useChallengeProgress();

    setChallenges([challenge]);
    setNextTask(0, 0);
    setNextTask(0, 0);

    const firstDay = challenges.value[0].days?.[0];
    const secondDay = challenges.value[0].days?.[1];

    expect(firstDay?.progress).toBe(100);
    expect(firstDay?.is_active).toBe(false);
    expect(secondDay?.is_active).toBe(true);
  });

  it("setNextTask is no-op when day has no tasks", () => {
    const dayNoTasks = { ...dayItem, id: 1, tasks: [] };
    const challenge: AppChallenge = { ...challengeItem, id: 1, days: [dayNoTasks] };
    const { challenges, setChallenges, setNextTask } = useChallengeProgress();

    setChallenges([challenge]);
    setNextTask(0, 0);
    expect(challenges.value[0].days?.[0].progress).toBe(0);
  });

  it("setNextTask is no-op when all tasks already completed", () => {
    const dayAllDone = {
      ...dayItem,
      id: 1,
      progress: 100,
      tasks: [
        { ...taskItem, id: 1, is_completed: true },
        { ...taskItem, id: 2, is_completed: true },
      ],
    };
    const challenge: AppChallenge = { ...challengeItem, id: 1, days: [dayAllDone] };
    const { challenges, setChallenges, setNextTask } = useChallengeProgress();

    setChallenges([challenge]);
    setNextTask(0, 0);
    expect(challenges.value[0].days?.[0].progress).toBe(100);
  });
});
