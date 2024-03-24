<template>
  <div class="flex justify-center align-middle">
    <div class="label mt-4 mr-2">
      <span class="label-text-alt text-sm">ID of the coin in lower case (e.g. 'btc', 'eth', 'unfi')</span>
    </div>
    <div class="form-control flex mt-4 mr-4">
      <input type="text" placeholder="Coin 1" class="input input-bordered border-teal-950 rounded-badge" v-model="coin1" />
    </div>
    <div class="form-control flex mt-4 mr-4">
      <input type="text" placeholder="Coin 2" class="input input-bordered border-teal-950 rounded-badge" v-model="coin2" />
    </div>
    <div class="form-control mr-4 mt-4">
      <select class="select select-bordered w-full max-w-xs border-teal-950 rounded-badge" v-model="interval">
        <option value="" disabled selected>Interval</option>
        <option value="m1">1 min</option>
        <option value="m5">5 min</option>
        <option value="m30">30 min</option>
        <option value="h1">1 hour</option>
        <option value="h6">6 hours</option>
        <option value="d1">1 day</option>
      </select>
    </div>
    <div class="mt-4 mr-4">
      <button class="btn btn-outline border-teal-950 hover:bg-teal-600 hover:border-teal-600 rounded-badge" @click="toggleValues">Toggle</button>
    </div>
    <div class="mt-4 mr-4">
      <button class="btn btn-outline bg-teal-600 hover:bg-teal-600 hover:border-teal-600 text-white rounded-badge" @click="go">Go!</button>
    </div>
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

      // Emit an event to pass data to the parent component
      this.$emit('go', { coin1: this.coin1, coin2: this.coin2, interval: this.interval });
    },
    toggleValues() {
      [this.coin1, this.coin2] = [this.coin2, this.coin1];
    }
  }
};
</script>