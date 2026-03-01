import type { AppTask } from "@/types/app/task";

export interface AppDay {
  id: number;
  challenge_id: number;
  title: string;
  description: string;
  is_active: boolean;
  progress: number;
  created_at: string;
  updated_at: string;
  tasks?: AppTask[];
}
