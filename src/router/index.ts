import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Favourites from '@/pages/Favourites.vue';
import Search from '@/pages/Search.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: Favourites
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
});

export default router;
