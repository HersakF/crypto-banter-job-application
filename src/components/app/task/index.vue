<script setup lang="ts" name="AppChallengesTask">
// Types
import type { AppTask } from "@/types/app/task";

// Composables
import { useAppTasks } from "@/composables/app/tasks/useTasks";

// Composables Methods
const { getTitle, getDescription, getType, getIsCompleted } = useAppTasks();

// Props
defineProps<{
  task: AppTask;
}>();
</script>

<template>
  <div class="challenge-task" :class="{ 'challenge-task--is-completed': getIsCompleted(task) }">
    <div class="status" :class="{ 'status--is-completed': getIsCompleted(task) }">
      <template v-if="getIsCompleted(task)">
        <span class="icon-check" aria-hidden="true">✓</span>
      </template>
      <template v-else>
        <span class="icon-dot" aria-hidden="true" />
      </template>
    </div>
    <div class="content">
      <span class="type">{{ getType(task) }}</span>
      <h3 class="title">{{ getTitle(task) }}</h3>
      <p class="description">{{ getDescription(task) }}</p>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/style/main.css";

.challenge-task {
  @apply flex gap-2 px-2 py-2 rounded-lg border border-stone-200 bg-white;

  .status {
    @apply flex items-center justify-center w-6 h-6 shrink-0 rounded-full border border-stone-300 bg-white;

    &.status--is-completed {
      @apply border-green-200 bg-green-50;

      span {
        @apply text-green-600 text-sm font-bold;
      }
    }
  }

  .icon-dot {
    @apply w-2 h-2 rounded-full bg-stone-400;
  }

  .content {
    @apply grid gap-1;

    .type {
      @apply text-xs font-medium uppercase text-stone-500;
    }

    .title {
      @apply text-sm font-medium text-stone-800;
    }

    .description {
      @apply text-sm text-stone-600;
    }
  }
}
</style>
