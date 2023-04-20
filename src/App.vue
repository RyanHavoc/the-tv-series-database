<template>
  <main class="app">
    <AppHeader class="app__header" />
    <div class="app__body">
      <RouterView />
    </div>
  </main>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
</script>

<style lang="scss" scoped>
.app {
  margin: 0 auto 36px;
  width: 814px;

  &__header {
    padding-left: 8px;
    padding-right: 24px;
  }
}
</style>
