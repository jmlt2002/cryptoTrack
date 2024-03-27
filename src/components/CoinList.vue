<template>
  <div class="m-8 font-bold text-center">
    <p class="text-3xl">List of available coins</p>
    <p class="text-xs mt-3">provided by CoinGecko</p>
  </div>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th class="w-1/4 sm:w-auto">Rank</th>
          <th class="w-1/4 sm:w-auto">ID</th>
          <th class="w-1/4 sm:w-auto">Symbol</th>
          <th class="w-1/4 sm:w-auto">Name</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through data and generate table rows -->
        <tr v-for="(coin, index) in coins" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ coin.id }}</td>
          <td>{{ coin.symbol }}</td>
          <td>{{ coin.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

export default {
  data() {
    return {
      coins: [] // Initialize coins array to hold fetched data
    }
  },
  async mounted() {
    const supabase = createClient('https://sfqpiwoexeusferirizl.supabase.co', process.env.VUE_APP_SUPABASE_API_KEY)

    try {
      const { data: coins, error } = await supabase.from('coinsList').select()

      if (error) {
        console.error(error)
      } else {
        this.coins = coins // Update coins data in the component
      }
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
