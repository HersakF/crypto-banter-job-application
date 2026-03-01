// Types
import type { AppTask } from "@/types/app/task";

export function useAppTasks() {
  // Methods
  function getId(value: AppTask): number {
    return value.id ?? 0;
  }

  function getDayId(value: AppTask): number {
    return value.day_id ?? 0;
  }

  function getTitle(value: AppTask): string {
    return value.title ?? "-";
  }

  function getDescription(value: AppTask): string {
    return value.description ?? "-";
  }

  function getType(value: AppTask): string {
    return value.type ?? "-";
  }

  function getIsCompleted(value: AppTask): boolean {
    return value.is_completed ?? false;
  }

  function getCreatedAt(value: AppTask): string | null {
    return value.created_at ?? null;
  }

  function getUpdatedAt(value: AppTask): string | null {
    return value.updated_at ?? null;
  }

  return {
    getId,
    getDayId,
    getTitle,
    getDescription,
    getType,
    getIsCompleted,
    getCreatedAt,
    getUpdatedAt,
  };
}
