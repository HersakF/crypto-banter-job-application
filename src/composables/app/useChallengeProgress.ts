// Vue
import { ref } from "vue";

// Types
import type { AppChallenge } from "@/types/app/challenge";

export function useChallengeProgress() {
  const challenges = ref<AppChallenge[]>([]);

  function setChallenges(payload: AppChallenge[] | null): void {
    challenges.value = payload
      ? (JSON.parse(JSON.stringify(payload)) as AppChallenge[])
      : [];
  }

  function setNextTask(challengeIndex: number, dayIndex: number): void {
    const challenge = challenges.value[challengeIndex];
    const days = challenge?.days;
    const day = days?.[dayIndex];

    if (!challenge || !day?.tasks?.length) return;

    const tasks = day.tasks;
    const firstIncompleteIndex = tasks.findIndex((t) => !t.is_completed);

    if (firstIncompleteIndex === -1) return;

    tasks[firstIncompleteIndex].is_completed = true;

    const completedCount = tasks.filter((t) => t.is_completed).length;
    const totalCount = tasks.length;

    day.progress = Math.round((completedCount / totalCount) * 100);

    const allTasksDone = completedCount === totalCount;

    if (allTasksDone) {
      day.is_active = false;

      const nextDay = days?.[dayIndex + 1];
      
      if (nextDay) {
        nextDay.is_active = true;
      }
    }
  }

  return {
    challenges,
    setChallenges,
    setNextTask,
  };
}
