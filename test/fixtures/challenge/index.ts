import type { AppChallenge } from "@/types/app/challenge";
import { dayItem, dayItemDefault } from "@test/fixtures/day";

export const challengeItem: AppChallenge = {
  id: 1,
  title: "Challenge title",
  description: "Challenge description",
  duration: "5 days",
  is_active: false,
  is_completed: false,
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z",
  days: [dayItem, dayItemDefault],
};

export const challengeItemDefault: AppChallenge = {
  id: 2,
  title: "",
  description: "",
  duration: "",
  is_active: false,
  is_completed: false,
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z",
};

export const challengeItems: AppChallenge[] = [challengeItem, challengeItemDefault];
