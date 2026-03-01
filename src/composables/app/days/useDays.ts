// Types
import type { AppDay } from "@/types/app/day";

export function useAppDays() {
  // Methods
  function getId(value: AppDay): number {
    return value.id ?? 0;
  }

  function getChallengeId(value: AppDay): number {
    return value.challenge_id ?? 0;
  }

  function getTitle(value: AppDay): string {
    return value.title ?? "-";
  }

  function getDescription(value: AppDay): string {
    return value.description ?? "-";
  }

  function getIsActive(value: AppDay): boolean {
    return value.is_active ?? false;
  }

  function getProgress(value: AppDay): number {
    return value.progress ?? 0;
  }

  function getCreatedAt(value: AppDay): string | null {
    return value.created_at ?? null;
  }

  function getUpdatedAt(value: AppDay): string | null {
    return value.updated_at ?? null;
  }

  function getTasks(value: AppDay): NonNullable<AppDay["tasks"]> {
    return value.tasks ?? [];
  }

  return {
    getId,
    getChallengeId,
    getTitle,
    getDescription,
    getIsActive,
    getProgress,
    getCreatedAt,
    getUpdatedAt,
    getTasks,
  };
}
