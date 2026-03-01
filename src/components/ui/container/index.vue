<script setup lang="ts" name="UIContainer"></script>

<template>
  <div class="ui-container">
    <slot />
  </div>
</template>

<style scoped>
@reference "@/assets/style/main.css";

.ui-container {
  @apply grid gap-4 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8;
}
</style>
