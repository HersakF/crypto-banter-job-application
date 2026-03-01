<script setup lang="ts" name="AppChallenges">
// Components
import UIContainer from "@/components/ui/container/index.vue";
import UIHeadline from "@/components/ui/headline/index.vue";
import UICard from "@/components/ui/card/index.vue";
import AppChallengesDay from "@/components/app/day/index.vue";

// Types
import type { AppChallenge } from "@/types/app/challenge";

// Composables
import { useAppChallenges } from "@/composables/app/challenges/useChallenges";

const { getId, getTitle, getDescription, getDays } = useAppChallenges();

// Props
defineProps<{
  challenges: AppChallenge[];
}>();

// Emits
const emit = defineEmits<{ onNext: [challengeIndex: number, dayIndex: number] }>();

// Methods
function onDayNext(challengeIndex: number, dayIndex: number): void {
  emit("onNext", challengeIndex, dayIndex);
}
</script>

<template>
  <UIContainer>
    <UIHeadline title="Challenges" />
    <UICard>
      <div class="challenges">
        <div
          v-for="(challenge, challengeIndex) in challenges"
          :key="getId(challenge)"
          class="challenge"
        >
          <div class="challenge__header">
            <h2 class="challenge__header-title">{{ getTitle(challenge) }}</h2>
            <p class="challenge__header-description">{{ getDescription(challenge) }}</p>
          </div>
          <div class="challenge__days">
            <AppChallengesDay
              v-for="(day, dayIndex) in getDays(challenge)"
              :key="day.id"
              :index="dayIndex"
              :day="day"
              @on-next="onDayNext(challengeIndex, dayIndex)"
            />
          </div>
        </div>
      </div>
    </UICard>
  </UIContainer>
</template>

<style scoped>
@reference "@/assets/style/main.css";

.challenges {
  @apply grid gap-2;

  .challenge {
    @apply grid gap-6 px-4 py-4;

    .challenge__header {
      @apply grid gap-1;

      .challenge__header-title {
        @apply text-base text-stone-800 font-bold;
      }

      .challenge__header-description {
        @apply text-sm text-stone-600;
      }
    }

    .challenge__days {
      @apply grid gap-2 md:grid-cols-2 md:gap-4;
    }
  }
}
</style>
