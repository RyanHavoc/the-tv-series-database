<template>
  <div class="virtual-scroller" ref="scroller">
    <div
      :style="{ height: `${topPlaceholderHeight}px` }"
      class="virtual-scroller__placeholder"
    ></div>
    <div v-for="item in visibleItems" :key="item.id" class="virtual-scroller__item">
      <slot :item="item"></slot>
    </div>
    <div
      :style="{ height: `${bottomPlaceholderHeight}px` }"
      class="virtual-scroller__placeholder"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

export interface Item {
  id: number;
  [key: string]: any;
}

const props = defineProps<{
  items: Item[];
  itemHeight: number;
}>();

const emit = defineEmits(['bottomReached']);

const scroller = ref<HTMLDivElement | null>(null);
const visibleItems = ref<Item[]>([]);
const intersectionObserver = ref<IntersectionObserver | null>(null);

// We adjust the height of divs above and below the items passed
// into the slot. This maintains the scrollbar position and length.
const topPlaceholderHeight = ref(0);
const bottomPlaceholderHeight = ref(0);

// When we hit the bottom of the virtual scroller we emit an event.
// This can be used to trigger a fetch to load more items.
watch(
  () => bottomPlaceholderHeight.value,
  (newValue) => {
    if (newValue === 0) emit('bottomReached');
  }
);

// Recalculate visible items when the items prop changes.
watch(
  () => props.items,
  () => {
    computeVisibleItems();
  },
  { deep: true }
);

// eslint-disable-next-line
const observerCallback: IntersectionObserverCallback = (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      computeVisibleItems();
      break;
    }
  }
};

const computeVisibleItems = () => {
  const scrollTop = scroller.value!.scrollTop;

  // Calculate the start and end positions of the items base on the item height
  // supplied, and the viewport height to determine the which items should be visible.
  const start = Math.floor(scrollTop / props.itemHeight);
  const end = Math.min(
    start + Math.ceil(scroller.value!.clientHeight / props.itemHeight) + 1,
    props.items.length
  );

  visibleItems.value = props.items.slice(start, end);

  // Set the top and bottom placeholder div heights to fill in the gaps and maintain
  // the scrollbar height.
  topPlaceholderHeight.value = start * props.itemHeight;
  bottomPlaceholderHeight.value = (props.items.length - end) * props.itemHeight;
};

onMounted(() => {
  // Initialise an IntersectionObserver against the scroller in the template.
  intersectionObserver.value = new IntersectionObserver(observerCallback, {
    root: scroller.value,
    rootMargin: '0px',
    threshold: 0.01
  });

  // Compute the visible items straight away
  computeVisibleItems();

  // Watch for changes
  intersectionObserver.value.observe(scroller.value!);

  // Add an event listener to trigger a recompute on scroll
  scroller.value && scroller.value.addEventListener('scroll', computeVisibleItems);
});

onUnmounted(() => {
  // Disconnect the IntersectionObserver on unmount
  if (intersectionObserver.value) {
    intersectionObserver.value.disconnect();
  }

  // Remove the event listener
  scroller.value && scroller.value.removeEventListener('scroll', computeVisibleItems);
});
</script>

<style lang="scss" scoped>
.virtual-scroller {
  overflow-y: auto;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__placeholder {
    width: 100%;
  }
}
</style>
