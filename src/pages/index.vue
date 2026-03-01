<script setup lang="ts" name="HomeIndex">
// Vue
import { onMounted, watch } from "vue";

// Components
import AppChallenges from "@/components/app/challenge/index.vue";
import UIButton from "@/components/ui/button/index.vue";
import UIError from "@/components/ui/error/index.vue";
import UILoading from "@/components/ui/loading/index.vue";

// Types
import type { AppChallenge } from "@/types/app/challenge";

// Composables
import { useApi } from "@/composables/api/useApi";
import { useApiExchange } from "@/composables/api/useApiExchange";
import { useChallengeProgress } from "@/composables/app/useChallengeProgress";

const { data, loading, error, onRequestGet } = useApi<AppChallenge[]>();
const { challenges, setChallenges, setNextTask } = useChallengeProgress();
const {
  exchangeError,
  exchangeLoading,
  exchangeMessage,
  hasCompletedFirstNext,
  runFirstNext,
  retry,
} = useApiExchange(setNextTask);

// Watcher
watch(data, (value) => {
  if (value) {
    setChallenges(value);
  }
});

// Methods
async function onDayNext(challengeIndex: number, dayIndex: number): Promise<void> {
  if (hasCompletedFirstNext.value) {
    setNextTask(challengeIndex, dayIndex);
    return;
  }

  await runFirstNext(challengeIndex, dayIndex);
}

// Lifecycle hooks
onMounted(() => {
  onRequestGet("/api/v1/challenges");
});
</script>

<template>
  <div>
    <template v-if="loading">
      <UILoading message="Loading challenges..." />
    </template>
    <template v-else-if="error">
      <UIError :message="error.message" />
    </template>
    <template v-else-if="exchangeLoading">
      <UILoading :message="exchangeMessage" />
    </template>
    <template v-else-if="exchangeError">
      <UIError :message="exchangeError.message">
        <UIButton severity="primary" :disabled="exchangeLoading" @on-click="retry">
          Retry
        </UIButton>
      </UIError>
    </template>
    <template v-else-if="challenges.length > 0">
      <AppChallenges :challenges="challenges" @on-next="onDayNext" />
    </template>
  </div>
</template>
