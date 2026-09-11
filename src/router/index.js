import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import MjHomeView from '../views/mj/MjHomeView.vue'
import PlayerHomeView from '../views/player/PlayerHomeView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mj',
      name: 'mj',
      component: MjHomeView
    },
    {
      path: '/player',
      name: 'player',
      component: PlayerHomeView
    }
  ]
})

export default router