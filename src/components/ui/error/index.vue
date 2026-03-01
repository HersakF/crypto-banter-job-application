<script setup lang="ts" name="UIError">
// Vue
import { computed } from "vue";

// Props
const props = defineProps<{
  message: string;
}>();

const message = computed<string>(() => props.message);
</script>

<template>
  <div class="ui-error" role="alert">
    <div class="content">
      <div class="message">
        {{ message }}
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/style/main.css";

.ui-error {
  @apply flex items-center justify-center min-h-dvh min-w-dvw gap-4;

  .content {
    @apply flex flex-col items-center justify-center gap-4;
  }
}
</style>
