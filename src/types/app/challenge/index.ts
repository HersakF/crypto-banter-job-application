import type { AppDay } from "@/types/app/day";

export interface AppChallenge {
  id: number;
  title: string;
  description: string;
  duration: string;
  is_active: boolean;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  days?: AppDay[];
}
