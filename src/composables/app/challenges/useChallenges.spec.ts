import { describe, it, expect } from "vitest";
import { useAppChallenges } from "@/composables/app/challenges/useChallenges";
import { challengeItem, challengeItemDefault } from "@test/fixtures/challenge";

describe("useAppChallenges", () => {
  it("returns getId from challenge", () => {
    const { getId } = useAppChallenges();

    expect(getId(challengeItem)).toBe(1);
    expect(getId(challengeItemDefault)).toBe(2);
    expect(getId({} as Parameters<typeof getId>[0])).toBe(0);
  });

  it("returns getTitle from challenge", () => {
    const { getTitle } = useAppChallenges();

    expect(getTitle(challengeItem)).toBe("Challenge title");
    expect(getTitle(challengeItemDefault)).toBe("");
    expect(getTitle({} as Parameters<typeof getTitle>[0])).toBe("-");
  });

  it("returns getDescription from challenge", () => {
    const { getDescription } = useAppChallenges();

    expect(getDescription(challengeItem)).toBe("Challenge description");
    expect(getDescription({} as Parameters<typeof getDescription>[0])).toBe("-");
  });

  it("returns getDuration from challenge", () => {
    const { getDuration } = useAppChallenges();

    expect(getDuration(challengeItem)).toBe("5 days");
    expect(getDuration({} as Parameters<typeof getDuration>[0])).toBe("-");
  });

  it("returns getIsActive and getIsCompleted from challenge", () => {
    const { getIsActive, getIsCompleted } = useAppChallenges();

    expect(getIsActive(challengeItem)).toBe(false);
    expect(getIsCompleted(challengeItem)).toBe(false);
    expect(getIsActive({} as Parameters<typeof getIsActive>[0])).toBe(false);
    expect(getIsCompleted({} as Parameters<typeof getIsCompleted>[0])).toBe(false);
  });

  it("returns getCreatedAt and getUpdatedAt from challenge", () => {
    const { getCreatedAt, getUpdatedAt } = useAppChallenges();

    expect(getCreatedAt(challengeItem)).toBe("2025-01-01T00:00:00Z");
    expect(getUpdatedAt(challengeItem)).toBe("2025-01-01T00:00:00Z");
    expect(getCreatedAt({} as Parameters<typeof getCreatedAt>[0])).toBe(null);
    expect(getUpdatedAt({} as Parameters<typeof getUpdatedAt>[0])).toBe(null);
  });

  it("returns getDays from challenge", () => {
    const { getDays } = useAppChallenges();
    
    expect(getDays(challengeItem)).toHaveLength(2);
    expect(getDays(challengeItemDefault)).toEqual([]);
    expect(getDays({} as Parameters<typeof getDays>[0])).toEqual([]);
  });
});
