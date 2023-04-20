<template>
  <UtilVirtualScroller
    v-if="items.length"
    :items="items"
    :item-height="130"
    class="app-show-listing"
    @bottom-reached="emit('bottomReached')"
  >
    <template #default="{ item }">
      <BaseCard
        :details="item"
        :is-favourited="isFavourited(item)"
        class="app-show-listing__item"
        @toggle-favourite="toggleFavourite"
      />
    </template>
  </UtilVirtualScroller>
</template>

<script setup lang="ts">
import UtilVirtualScroller from '@/components/UtilVirtualScroller.vue';
import BaseCard from '../components/BaseCard.vue';
import { useFavourites } from '@/stores/favourites';
import { toRefs } from 'vue';

const props = defineProps<{
  items: any[];
}>();
const emit = defineEmits(['bottomReached']);

const { items } = toRefs(props);

const { toggleFavourite, isFavourited } = useFavourites();
</script>

<style lang="scss" scoped>
.app-show-listing {
  height: 804px;
  padding: 8px 24px 8px 8px;

  &__item {
    margin-bottom: 12px;
  }

  &__loading {
    text-align: center;
    width: 100%;
  }
}
</style>
