import type { AppDay } from "@/types/app/day";
import { taskItem, taskItemCompleted } from "@test/fixtures/task";

export const dayItem: AppDay = {
  id: 1,
  challenge_id: 1,
  title: "Day title",
  description: "Day description",
  is_active: true,
  progress: 0,
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z",
  tasks: [taskItem, taskItemCompleted],
};

export const dayItemDefault: AppDay = {
  ...dayItem,
  id: 2,
  is_active: false,
  progress: 0,
  tasks: [],
};

export const dayItemInProgress: AppDay = {
  ...dayItem,
  id: 3,
  is_active: true,
  progress: 50,
  tasks: [taskItemCompleted, { ...taskItem, is_completed: false }],
};

export const dayItemCompleted: AppDay = {
  ...dayItem,
  id: 4,
  is_active: false,
  progress: 100,
  tasks: [taskItemCompleted, { ...taskItemCompleted, id: 2 }],
};
