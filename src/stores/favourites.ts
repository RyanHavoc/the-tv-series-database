import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useFavourites = defineStore('favourites', () => {
  // useStorage syncs the favourites in localStorage automatically,
  // it behaves exactly like a ref() but checks for existing values
  // on a initial load/page refresh.
  const favourites = useStorage('favourites-store', [] as any[]);

  // Adds or removes a show from favourites
  function toggleFavourite(show: any) {
    const existingIndex = favourites.value.findIndex((favourite) => favourite.id === show.id);

    if (existingIndex !== -1) {
      favourites.value.splice(existingIndex, 1);
    } else {
      favourites.value.push(show);
    }
  }

  // Return boolean for if show is favourited or not
  function isFavourited(show: any) {
    return !!favourites.value.find((favourite) => favourite.id === show.id);
  }

  return { favourites, toggleFavourite, isFavourited };
});
