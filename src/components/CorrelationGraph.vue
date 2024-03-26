<template>
  <div class="flex flex-wrap justify-center items-center">
    <div class="label mt-4 mr-2">
      <span class="label-text-alt text-sm">ID of the coin in lower case (e.g. 'btc', 'eth', 'unfi')</span>
    </div>
    <div class="form-control mt-4 mr-2">
      <input type="text" id="coin1" placeholder="Coin 1" class="input input-bordered w-40 border-teal-950 rounded-badge" v-model="coin1" />
    </div>
    <div class="form-control mt-4 mr-2">
      <input type="text" id="coin2" placeholder="Coin 2" class="input input-bordered w-40 border-teal-950 rounded-badge" v-model="coin2" />
    </div>
    <div class="form-control mt-4 mr-2">
      <input id="interval" placeholder="Days of data(<365)" class="input input-bordered w-44 border-teal-950 rounded-badge" v-model="interval" />
    </div>
    <div class="mt-4 mr-2">
      <button class="btn btn-outline border-teal-950 hover:bg-teal-600 hover:border-teal-600 rounded-badge" @click="toggleValues">Toggle</button>
    </div>
    <div class="mt-4">
      <button class="btn btn-outline bg-teal-600 hover:bg-teal-600 hover:border-teal-600 text-white rounded-badge" @click="go">Go!</button>
    </div>
  </div>
  <div class="flex justify-center h-700 m-5">
    <canvas id="chartCanvas"></canvas>
  </div>
  <dialog id="emptyFields" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="font-bold text-xl">All of the fields need to be filled out!</h3>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn rounded-badge">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  data() {
    return {
      coin1: '',
      coin2: '',
      interval: ''
    };
  },
  methods: {
    go() {
      // check if any of the fields are empty
      if (!this.coin1 || !this.coin2 || !this.interval || this.coin1 === this.coin2 || isNaN(this.interval)) {
        document.querySelector('#emptyFields').showModal();
        return;
      }
      this.generateChart();
    },
    toggleValues() {
      [this.coin1, this.coin2] = [this.coin2, this.coin1];
    },
    async generateChart() {
      let coin1 = this.coin1;
      let coin2 = this.coin2;
      let interval = this.interval;
      let { timestamps, prices } = await this.calculateValues(coin1, coin2, interval);

      // Destroy the previous chart instance
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      
      // Chart.js configuration
      const ctx = document.getElementById('chartCanvas').getContext('2d');
      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: timestamps,
          datasets: [{
            label: `${coin1}/${coin2} price ratio`,
            data: prices,
            borderColor: '#4CCD99',
            borderWidth: 1,
            fill: false,
            pointRadius: 0
          }]
        },
      });
    },
    async calculateValues(coin1, coin2, interval) {
      try {
        // Fetch data from the API
        const url1 = `https://api.coingecko.com/api/v3/coins/${coin1}/market_chart?vs_currency=eur&days=${interval}`;
        const url2 = `https://api.coingecko.com/api/v3/coins/${coin2}/market_chart?vs_currency=eur&days=${interval}`;
        const headers = {
          'x_cg_demo_api_key': process.env.COINGECKO_API_KEY
        };

        const response1 = await fetch(url1, {
          headers: headers
        });
        const response2 = await fetch(url2, {
          headers: headers
        });

        const values1 = response1.json();
        const values2 = response2.json();
        // values1 and values2 are promises, access the prices array and divide the price of coin1 by the price of coin2
        values1.prices = (await values1).prices;
        values2.prices = (await values2).prices;
        
        // divide the values of the two coins, the values are stores in the 'prices' array from the json response
        let prices = [];
        let timestamps = [];
        for (let i = 0; i < values1.prices.length; i++) {
          prices.push(values1.prices[i][1] / values2.prices[i][1]);
          // timestamps are in unix format, convert them to day, month and year, i dont need the hours and minutes
          timestamps.push(new Date(values1.prices[i][0]).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }));
        }
        return { timestamps, prices };
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  }
};
</script>