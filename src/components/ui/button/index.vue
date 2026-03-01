<script setup lang="ts" name="UIButton">
/* global MouseEvent */

// Imports
import { computed } from "vue";

// Types
import type { UIButtonSeverity, UIButtonSize, UIButtonVariant } from "@/types/ui/button";

// Props
const props = withDefaults(
  defineProps<{
    size?: UIButtonSize;
    severity?: UIButtonSeverity;
    variant?: UIButtonVariant;
  }>(),
  {
    size: "md",
    severity: "neutral",
    variant: "solid",
  }
);

// Emits
const emit = defineEmits<{
  onClick: [e: MouseEvent];
}>();

// Computed
const buttonClasses = computed(() => [
  "ui-button",
  `ui-button--${props.size}`,
  `ui-button--${props.variant}-${props.severity}`,
]);

// Methods
function onClick(event: MouseEvent) {
  emit("onClick", event);
}
</script>

<template>
  <button type="button" :class="buttonClasses" @click="onClick">
    <slot />
  </button>
</template>

<style scoped>
@reference "@/assets/style/main.css";

.ui-button {
  @apply rounded-lg font-medium transition-colors;
}

.ui-button--sm {
  @apply px-3 py-1.5 text-sm;
}

.ui-button--md {
  @apply px-4 py-2 text-base;
}

.ui-button--lg {
  @apply px-6 py-3 text-lg;
}

.ui-button--solid-neutral {
  @apply bg-gray-200 text-gray-900 hover:bg-gray-300;
}

.ui-button--solid-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.ui-button--solid-danger {
  @apply bg-red-600 text-white hover:bg-red-700;
}

.ui-button--outline-neutral {
  @apply border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100;
}

.ui-button--outline-primary {
  @apply border border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50;
}

.ui-button--outline-danger {
  @apply border border-red-600 bg-transparent text-red-600 hover:bg-red-50;
}

.ui-button--ghost-neutral {
  @apply bg-transparent text-gray-700 hover:bg-gray-100;
}

.ui-button--ghost-primary {
  @apply bg-transparent text-blue-600 hover:bg-blue-50;
}

.ui-button--ghost-danger {
  @apply bg-transparent text-red-600 hover:bg-red-50;
}
</style>
