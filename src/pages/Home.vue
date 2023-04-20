<template>
  <AppShowListing v-if="shows" :items="shows" class="home" @bottom-reached="fetchNextPage" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFetch } from '@vueuse/core';
import AppShowListing from '@/components/AppShowListing.vue';

const currentPage = ref(0);
const shows = ref<any[]>([]);

const fetchShows = async () => {
  const { data } = await useFetch(`https://api.tvmaze.com/shows?page=${currentPage.value}`);

  try {
    return JSON.parse(data.value as string);
  } catch (e) {
    return null;
  }
};

const fetchNextPage = async () => {
  const newShows = await fetchShows();
  currentPage.value = currentPage.value + 1;
  shows.value.push(...newShows);
};

fetchNextPage();
</script>

<style lang="scss" scoped>
.home {
  &__scroller {
    height: 732px;
    padding: 8px 24px 8px 8px;
  }

  &__item {
    margin-bottom: 8px;
  }
}
</style>
