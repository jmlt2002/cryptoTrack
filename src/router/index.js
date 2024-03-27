import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CoinList from '../views/CoinListView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/coinList', component: CoinList}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router