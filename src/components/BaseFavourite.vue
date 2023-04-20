<template>
  <div class="favourite" @click="toggleFavourite">
    <IconHeart v-if="isFavourited" class="favourite__icon favourite__icon--active" />
    <IconHeartOutline v-else class="favourite__icon" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import IconHeart from './IconHeart.vue';
import IconHeartOutline from './IconHeartOutline.vue';

const props = defineProps({
  isFavourited: Boolean
});

const emit = defineEmits(['toggle']);

const isFavourited = ref(props.isFavourited);

watchEffect(() => {
  isFavourited.value = props.isFavourited;
});

function toggleFavourite() {
  isFavourited.value = !isFavourited.value;
  emit('toggle');
}
</script>

<style lang="scss" scoped>
.favourite {
  cursor: pointer;

  &__icon {
    height: 20px;
    width: 20px;

    &:hover,
    &--active {
      color: #f04d4d;
    }
  }
}
</style>
