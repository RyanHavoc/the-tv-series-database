<template>
  <header class="app-header">
    <h1 class="app-header__title">The TV Series Database</h1>

    <div class="app-header__container">
      <nav class="app-header__nav">
        <ul class="app-header__nav-items">
          <li class="app-header__nav-item">
            <RouterLink to="/" class="app-header__link" active-class="app-header__link--active"
              >TV Series</RouterLink
            >
          </li>
          <li class="app-header__nav-item">
            <RouterLink
              to="/favourites"
              class="app-header__link"
              active-class="app-header__link--active"
              >Favourites</RouterLink
            >
          </li>
        </ul>
      </nav>

      <div class="app-header__search-input">
        <input type="search" placeholder="Search…" v-model="searchQuery" @keydown.enter="search" />
        <span v-if="showNote" class="app-header__search-note">press enter</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const searchQuery = ref('');
const showNote = ref(false);

watch(
  () => route.query.q,
  (newVal) => {
    searchQuery.value = newVal as string;
  },
  { immediate: true }
);

watch(
  () => searchQuery.value,
  (newVal, oldVal) => {
    if (searchQuery.value && newVal !== oldVal) showNote.value = true;
  },
  { immediate: true }
);

function search() {
  showNote.value = false;
  router.push({ name: 'search', query: { q: searchQuery.value } });
}
</script>

<style lang="scss" scoped>
.app-header {
  padding: 40px 0 22px;

  &__title {
    margin-bottom: 22px;
  }

  &__container {
    align-items: center;
    display: flex;
    width: 100%;
  }

  &__nav-items {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__nav-item {
    display: inline-block;
    margin-right: 24px;
  }

  &__link {
    display: inline-block;
    border-bottom: 2px solid transparent;
    font-size: 22px;
    line-height: 1;
    text-decoration: none;
    color: #2c3e50;
    padding: 6px 0;

    &:hover,
    &--active {
      border-bottom: 2px solid #2c3e50;
    }
  }

  &__search-input {
    margin-left: auto;
    position: relative;

    input {
      border: 1px solid #b4b4b4;
      border-radius: 4px;
      padding: 6px 8px;
      width: 284px;
    }
  }

  &__search-note {
    display: block;
    bottom: -18px;
    position: absolute;
    right: 0;
    font-size: 12px;
    font-style: italic;
  }
}
</style>
