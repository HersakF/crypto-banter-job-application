<script setup lang="ts" name="UIApp"></script>

<template>
  <div class="ui-app">
    <slot />
  </div>
</template>

<style scoped>
@reference "@/assets/style/main.css";

.ui-app {
  @apply min-h-dvh;
}
</style>
