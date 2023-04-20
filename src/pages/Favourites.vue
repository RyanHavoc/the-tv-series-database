<template>
  <AppShowListing v-if="favourites.length" :items="favourites" class="favourites" />
  <div v-else class="favourites__none">
    <IconHeartOutline class="favourites__icon" />
    <h3 class="favourites__message">Not a lot of love yet.<br />Favourite some shows!</h3>
  </div>
</template>

<script setup lang="ts">
import AppShowListing from '@/components/AppShowListing.vue';
import IconHeartOutline from '@/components/IconHeartOutline.vue';
import { useFavourites } from '@/stores/favourites';
import { toRefs } from 'vue';

const favouritesStore = useFavourites();
const { favourites } = toRefs(favouritesStore);
</script>

<style lang="scss" scoped>
.favourites {
  &__none {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 48px;
  }
  &__icon {
    color: #f04d4d;
    height: 200px;
    opacity: 0.75;
    width: 200px;
  }
  &__message {
    text-align: center;
  }
}
</style>
