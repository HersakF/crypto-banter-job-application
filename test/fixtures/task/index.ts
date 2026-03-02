import type { AppTask } from "@/types/app/task";

export const taskItem: AppTask = {
  id: 1,
  day_id: 1,
  title: "Task title",
  description: "Task description",
  type: "video",
  is_completed: false,
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z",
};

export const taskItemDefault: AppTask = {
  id: 1,
  day_id: 1,
  title: "",
  description: "",
  type: "video",
  is_completed: false,
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z",
};

export const taskItemCompleted: AppTask = {
  ...taskItem,
  id: 2,
  is_completed: true,
};
