<template>
  <AppShowListing v-if="results.length" :items="results" class="search" />
  <div v-else class="search__none">
    <IconSearch class="search__icon" />
    <h3 class="search__message">No shows found!</h3>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '@vueuse/core';
import AppShowListing from '@/components/AppShowListing.vue';
import IconSearch from '@/components/IconSearch.vue';

const route = useRoute();
const searchQuery = computed(() => route.query.q);

const url = computed(() => {
  return `https://api.tvmaze.com/search/shows?q=${searchQuery.value}`;
});

const { data } = useFetch(url, { refetch: true }).get();

const results = computed(() => {
  try {
    return JSON.parse(data.value as string).map((item: { show: any }) => item.show);
  } catch (e) {
    return null;
  }
});
</script>

<style lang="scss" scoped>
.search {
  &__none {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 48px;
  }
  &__icon {
    opacity: 0.5;
    height: 200px;
    width: 200px;
  }
  &__message {
    text-align: center;
  }
}
</style>
