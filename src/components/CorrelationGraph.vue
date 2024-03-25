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
      <select id="interval" class="select select-bordered w-full border-teal-950 rounded-badge" v-model="interval">
        <option value="" disabled selected>Interval</option>
        <option value="m1">1 min</option>
        <option value="m5">5 min</option>
        <option value="m30">30 min</option>
        <option value="h1">1 hour</option>
        <option value="h6">6 hours</option>
        <option value="d1">1 day</option>
      </select>
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
      if (!this.coin1 || !this.coin2 || !this.interval) {
        document.querySelector('#emptyFields').showModal();
        return;
      }
      this.generateChart();
    },
    toggleValues() {
      [this.coin1, this.coin2] = [this.coin2, this.coin1];
    },
    async generateChart() {
      try {
        // Clear the previous chart
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }

        // get value of dropdown bars until the first space
        let coin1 = document.querySelector('#coin1').value.split(' ')[0];
        let coin2 = document.querySelector('#coin2').value.split(' ')[0];
        let interval = document.querySelector('#interval').value;
        
        // Fetch data from the API
        const response1 = await fetch(`https://api.coincap.io/v2/assets/${coin1}/history?interval=${interval}`);
        const { data: data1 } = await response1.json();
        const response2 = await fetch(`https://api.coincap.io/v2/assets/${coin2}/history?interval=${interval}`);
        const { data: data2 } = await response2.json();
         
        // Ensure data1 and data2 have the same length
        const minDataLength = Math.min(data1.length, data2.length);
        const timestamps = [];
        const prices = [];

        // Calculate the division between coin1 and coin2 prices
        for (let i = 0; i < minDataLength; i++) {
          const timestamp = new Date(data1[i].time);
          const price1 = parseFloat(data1[i].priceUsd);
          const price2 = parseFloat(data2[i].priceUsd);
          if (timestamp.getMinutes() % 5 != 0) {
            timestamps.push('')
          } else {
            timestamps.push(timestamp.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' , hour: 'numeric', minute: 'numeric'}));
          }
          prices.push(price1 / price2);
        }
        console.log(timestamps);

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
          options: {
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  unit: 'minute',
                  displayFormats: {
                    minute: 'MMM D, YYYY, h:mm a'
                  },
                  tooltipFormat: 'MMM D, YYYY, h:mm a'
                }
              }]
            },
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  }
};
</script>

<style>
.custom-height{
  height: 700;
}
</style>