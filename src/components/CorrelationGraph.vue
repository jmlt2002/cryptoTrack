<template>
  <div class="flex">
    <div class="label mt-4 mr-2">
      <span class="label-text-alt text-sm">ID of the coin in lower case (e.g. 'btc', 'eth', 'unfi')</span>
    </div>
    <div class="form-control flex mt-4 mr-4">
      <input type="text" placeholder="Coin 1" class="input input-bordered border-teal-950 rounded-badge" />
    </div>
    <div class="form-control flex mt-4 mr-4">
      <input type="text" placeholder="Coin 2" class="input input-bordered border-teal-950 rounded-badge" />
    </div>
    <div class="form-control mr-4 mt-4">
      <select class="select select-bordered w-full max-w-xs border-teal-950 rounded-badge">
        <option disabled selected>Interval</option>
        <option>1 min</option>
        <option>5 min</option>
        <option>30 min</option>
        <option>1 hour</option>
        <option>6 hours</option>
        <option>1 day</option>
      </select>
    </div>
    <div class="mt-4 mr-4">
      <button class="btn btn-outline border-teal-950 hover:bg-teal-600 hover:border-teal-600 rounded-badge">Toggle</button>
    </div>
    <div class="mt-4">
      <button class="btn btn-outline bg-teal-600 hover:bg-teal-600 hover:border-teal-600 text-white rounded-badge">Go!</button>
    </div>
  </div>
</template>

<script>

</script>