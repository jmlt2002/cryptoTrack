import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CoinListView from '../views/CoinListView.vue'

const routes = [
  { path: '/', component: HomeView},
  { path: '/coinList', component: CoinListView}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router