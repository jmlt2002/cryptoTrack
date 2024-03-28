<template>
  <div class="m-8 font-bold text-center">
    <p class="text-3xl">List of available coins</p>
  </div>
  <div class="flex justify-center">
    <div class="w-full lg:w-3/4">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right">
          <thead class="text-xs text-gray-200 uppercase bg-teal-950">
            <tr>
              <th scope="col" class="px-6 py-3">
                Rank
              </th>
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
              v-for="(coin, index) in coins" :key="index" class="bg-base-200 text-base-content">
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">{{ coin.id }}</td>
              <td class="px-6 py-4">{{ coin.symbol }}</td>
              <td class="px-6 py-4">{{ coin.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
