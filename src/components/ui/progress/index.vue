<script setup lang="ts" name="UIProgress">
// Props
defineProps<{
  value: number;
}>();
</script>

<template>
  <div
    class="ui-progress"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="value"
  >
    <div class="ui-progress__bar" :style="{ width: `${Math.min(100, Math.max(0, value))}%` }" />
  </div>
</template>

<style scoped>
@reference "@/assets/style/main.css";

.ui-progress {
  @apply h-2 w-full overflow-hidden rounded-full bg-gray-200;
}

.ui-progress__bar {
  @apply h-full rounded-full bg-blue-600 transition-all duration-300;
}
</style>
