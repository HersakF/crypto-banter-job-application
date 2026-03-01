<script setup lang="ts" name="UICard"></script>

<template>
  <div class="ui-card">
    <slot />
  </div>
</template>

<style scoped>
@reference "@/assets/style/main.css";

.ui-card {
  @apply rounded-lg border border-gray-200 bg-white;
}
</style>
