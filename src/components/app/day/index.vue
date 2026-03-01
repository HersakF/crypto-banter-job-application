<script setup lang="ts" name="AppChallengesDay">
// Vue
import { computed } from "vue";

// Components
import AppChallengesTask from "@/components/app/task/index.vue";
import UIButton from "@/components/ui/button/index.vue";
import UIProgress from "@/components/ui/progress/index.vue";

// Types
import type { AppDay } from "@/types/app/day";

// Composables
import { useAppDays } from "@/composables/app/days/useDays";

// Composables Methods
const { getTitle, getDescription, getIsActive, getProgress, getTasks } = useAppDays();

// Props
const props = defineProps<{
  day: AppDay;
  index: number;
}>();

// Emits
const emit = defineEmits<{ onNext: [] }>();

// Computed
const dayIndex = computed<number>(() => props.index + 1);

// Computed States
const isInProgress = computed<boolean>(() =>
  Boolean(getIsActive(props.day) && getProgress(props.day) > 0)
);

const isCompleted = computed<boolean>(() =>
  Boolean(getIsActive(props.day) === false && getProgress(props.day) === 100)
);

const isLocked = computed<boolean>(() =>
  Boolean(getIsActive(props.day) === false && getProgress(props.day) === 0)
);
</script>

<template>
  <div class="challenge-day" :class="{ 'challenge-day--is-active': getIsActive(day) }">
    <div class="information">
      <div class="index" :class="{ 'index--is-active': getIsActive(day) }">
        <span>{{ dayIndex }}</span>
        <strong>Day</strong>
      </div>
      <div class="content">
        <div class="headline">
          <h2 class="headline__title">{{ getTitle(day) }}</h2>
          <p class="headline__description">{{ getDescription(day) }}</p>
        </div>
        <UIProgress :value="getProgress(day)" />
      </div>
    </div>
    <div class="tasks">
      <AppChallengesTask v-for="task in getTasks(day)" :key="task.id" :task="task" />
    </div>
    <div class="action">
      <UIButton severity="primary" size="sm" @on-click="() => emit('onNext')">
        <span>{{ isInProgress ? "Continue" : "Start" }}</span>
      </UIButton>
    </div>
    <template v-if="isCompleted">
      <div class="message message--is-completed">
        <p>Completed</p>
      </div>
    </template>
    <template v-if="isLocked">
      <div class="message message--is-locked">
        <p>Locked</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
@reference "@/assets/style/main.css";

.challenge-day {
  @apply relative grid gap-4 px-4 py-4 border border-stone-200 rounded-xl bg-stone-50 overflow-hidden;

  .information {
    @apply flex gap-2;

    .index {
      @apply flex flex-col items-center justify-center bg-stone-200 rounded w-12 h-12;

      span {
        @apply text-sm text-stone-600;
      }

      strong {
        @apply text-xs text-stone-600 uppercase;
      }

      &.index--is-active {
        @apply bg-green-100;
      }
    }

    .content {
      @apply grid gap-4;

      .headline {
        @apply flex flex-col gap-1;

        .headline__title {
          @apply text-base text-stone-800 font-medium;
        }

        .headline__description {
          @apply text-sm text-stone-600;
        }
      }
    }
  }

  .tasks {
    @apply grid gap-2;
  }

  .action {
    @apply flex justify-end;
  }

  .message {
    @apply absolute inset-0 flex items-center justify-center bg-green-500/20 backdrop-blur-xs rounded-xl;

    p {
      @apply text-sm text-stone-800 font-black uppercase;
    }

    &.message--is-completed {
      @apply bg-green-500/20;
    }

    &.message--is-locked {
      @apply bg-stone-500/20;
    }
  }
}
</style>
