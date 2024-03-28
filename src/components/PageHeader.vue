<template>
  <header class="bg-teal-950 p-2">
    <nav class="flex items-center justify-center lg:px-4 rounded-lg" aria-label="Global">
      <div class="flex flex-1">
          <button @click="goToHome" class="inline-block ml-1 mt-1 text-3xl font-bold leading-6 text-gray-50">
            <img class="inline-block h-16 w-auto" src="../assets/logo.png" alt=""/>CryptoTrack
          </button>
        <div class="hidden lg:flex lg:flex-1 mt-1">
          <p class="inline-block ml-2 font-bold leading-6 text-gray-50 mb-1">( Powered by </p>
          <a href="https://www.coingecko.com/en/api" target="_blank" class="ml-1 mr-1">
            <img class="h-5 inline-block" src="../assets/coinGeckoLogo.png" alt="">
          </a>
          <span class="items-center inline-block font-bold leading-6 text-gray-50">and </span>
          <a href="https://vercel.com/" target="_blank" class="ml-1 mr-1">
            <img class="h-5 inline-block" src="../assets/vercelLogo.png" alt="">
          </a>
          <p class="inline-block font-bold leading-6 text-gray-50 mb-1">)</p>
        </div>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 border-teal" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6 mr-2" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <button @click="goToCoinList" class="text-sm font-semibold leading-6 text-gray-50">Coin List</button>
      </PopoverGroup>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <label class="cursor-pointer grid place-items-center mr-4">
          <input type="checkbox" value="forest" class="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"/>
          <svg class="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
          <svg class="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </label>
        <a href="https://github.com/jmlt2002" target="_blank" class="text-sm font-semibold leading-6 text-gray-50 flex items-center"> 
          <img class="h-8 m-2" src="../assets/github-white.png" alt="">
          <span class="text-xl" aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-base-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Go back to home page</span>
            <img class="h-8 w-auto" src="../assets/logo.png" alt="" />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <button @click="mobileMenuOpen = false; goToCoinList()" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Coin List</button>
            </div>
            <div class="py-6">
              <a href="https://github.com/jmlt2002" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                Creator's GitHub
                <img class="h-8 ml-2 inline-block" src="../assets/github-black.png" alt="">
              </a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/vue'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)
</script>

<script>
export default {
  methods: {
    goToCoinList() {
      this.$router.push('/coinList')
    },
    goToHome() {
      this.$router.push('/')
    },
  },
}
</script>