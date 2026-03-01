// Types
import type { AppChallenge } from "@/types/app/challenge";

export function useAppChallenges() {
  // Methods
  function getId(value: AppChallenge): number {
    return value.id ?? 0;
  }

  function getTitle(value: AppChallenge): string {
    return value.title ?? "-";
  }

  function getDescription(value: AppChallenge): string {
    return value.description ?? "-";
  }

  function getDuration(value: AppChallenge): string {
    return value.duration ?? "-";
  }

  function getIsActive(value: AppChallenge): boolean {
    return value.is_active ?? false;
  }

  function getIsCompleted(value: AppChallenge): boolean {
    return value.is_completed ?? false;
  }

  function getCreatedAt(value: AppChallenge): string | null {
    return value.created_at ?? null;
  }

  function getUpdatedAt(value: AppChallenge): string | null {
    return value.updated_at ?? null;
  }

  function getDays(value: AppChallenge): NonNullable<AppChallenge["days"]> {
    return value.days ?? [];
  }

  return {
    getId,
    getTitle,
    getDescription,
    getDuration,
    getIsActive,
    getIsCompleted,
    getCreatedAt,
    getUpdatedAt,
    getDays,
  };
}
