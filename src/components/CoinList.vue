<template>
  <div class="m-8 font-bold text-center">
    <p class="text-3xl">List of available coins</p>
  </div>
  <div class="flex justify-center">
    <button id="prev" @click="prev" :disabled="currentPage === 0" class="btn rounded-badge mb-5 ml-5 mr-5"><span class="text-xl mb-1" aria-hidden="true">&larr;</span>Back</button>
    <button id="next" @click="next" :disabled="currentPage === maxPage" class="btn rounded-badge mb-5 ml-5 mr-5">Next<span class="text-xl mb-1" aria-hidden="true">&rarr;</span></button>
  </div>
  <div class="flex justify-center">
    <div class="w-full lg:w-1/2">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right table-fixed">
          <thead class="text-xs text-gray-200 uppercase bg-teal-950">
            <tr>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                Symbol
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(coin) in coins" :key="coin.id" class="bg-base-200 text-base-content">
              <td class="px-6 py-4">{{ coin.id }}</td>
              <!-- capitalize the coin.symbol before adding it-->
              <td class="px-6 py-4" v-text="coin.symbol.toUpperCase()"></td>
              <td class="px-6 py-4">{{ coin.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="flex justify-center">
    <button id="prev" @click="prev" :disabled="currentPage === 0" class="btn rounded-badge m-5"><span class="text-xl mb-1" aria-hidden="true">&larr;</span>Back</button>
    <button id="next" @click="next" :disabled="currentPage === maxPage" class="btn rounded-badge m-5">Next<span class="text-xl mb-1" aria-hidden="true">&rarr;</span></button>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

export default {
  data() {
    return {
      coins: [], // Initialize coins array to hold fetched data
      currentPage: 0,
      maxPage: 2,
    }
  },
  async mounted() {
    this.fetchCoinsData()
  },
  methods: {
    async fetchCoinsData() {
      const supabase = createClient('https://sfqpiwoexeusferirizl.supabase.co', process.env.VUE_APP_SUPABASE_API_KEY)

      try {
        // Fetch data from the coinsList table where id >= currentPage * 1000
        const { data: coins, error } = await supabase.from('coinsList').select().range(this.currentPage * 1000, (this.currentPage + 1) * 1000)

        if (error) {
          console.error(error)
        } else {
          this.coins = coins // Update coins data in the component
        }
      } catch (error) {
        console.error(error)
      }
    },
    next() {
      if (this.currentPage === this.maxPage) return
      this.currentPage += 1
      this.fetchCoinsData()
    },
    prev() {
      if (this.currentPage === 0) return
      this.currentPage -= 1
      this.fetchCoinsData()
    },
  },
}
</script>
