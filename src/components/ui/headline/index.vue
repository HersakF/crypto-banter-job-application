<script setup lang="ts" name="UIHeadline">
// Props
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="ui-headline">
    <h2 class="ui-headline__title">
      {{ title }}
    </h2>
    <template v-if="description">
      <p class="ui-headline__description">
        {{ description }}
      </p>
    </template>
  </div>
</template>

<style scoped>
@reference "@/assets/style/main.css";

.ui-headline {
  @apply space-y-1;
}

.ui-headline__title {
  @apply text-xl font-semibold text-gray-900;
}

.ui-headline__description {
  @apply text-sm text-gray-600;
}
</style>
