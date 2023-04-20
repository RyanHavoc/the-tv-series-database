<template>
  <div class="card">
    <a class="card__link" :href="externalUrl" target="_blank" rel="noopener noreferrer">
      <aside class="card__aside">
        <img class="card__image" :src="coverImage" />
      </aside>
      <div class="card__container">
        <header class="card__header">
          <div class="card__meta">
            <h2 class="card__title" v-text="title" />
            <p class="card__rating" v-text="score" />
          </div>
        </header>
        <footer class="card__footer">
          <p class="card__genre" v-text="genres" />
        </footer>
      </div>
    </a>
    <BaseFavourite
      class="card__favourite"
      :is-favourited="isFavourited"
      @toggle="toggleFavourite"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseFavourite from './BaseFavourite.vue';

const props = defineProps({
  details: {
    type: Object,
    required: true
  },
  isFavourited: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['toggleFavourite']);

const externalUrl = computed(() => {
  return props.details.url;
});
const title = computed(() => {
  return props.details.name;
});
const score = computed(() => {
  return (props.details.rating && props.details.rating.average) || null;
});
const coverImage = computed(() => {
  if (props.details.image && props.details.image.medium) return props.details.image.medium;

  return 'https://placehold.co/150x200?text=????';
});
const genres = computed(() => {
  return props.details.genres && props.details.genres.join(' | ');
});

function toggleFavourite() {
  emit('toggleFavourite', props.details);
}
</script>

<style lang="scss" scoped>
.card {
  $self: &;
  position: relative;
  width: 100%;

  + #{$self} {
    margin-top: 12px;
  }

  &__link {
    color: #2c3e50;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    display: flex;
    font-size: 14px;
    height: 122px;
    padding: 8px;
    text-decoration: none;
  }

  &__aside {
    margin-right: 8px;
  }
  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__image {
    display: block;
    border-radius: 4px;
    max-width: 75px;
  }
  &__header {
    width: 100%;
  }
  &__title {
    font-size: 22px;
    line-height: 1;
    padding-right: 36px;
  }
  &__favourite {
    position: absolute;
    right: 8px;
    top: 8px;
  }
  &__footer {
    margin-top: auto;
  }
}
</style>
