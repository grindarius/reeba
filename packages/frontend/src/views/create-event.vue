<template>
  <div class="create-event-page">
    <div class="container mt-12 px-6 lg:px-0">
      <h3 class="font-medium text-4xl text-white">
        Create event
      </h3>
      <div class="flex flex-wrap mt-6  py-4 rounded-lg">
        <!-- Event Name --><!-- Note: Full-width first row simplifies top-margin on mobile -->
        <div class="flex w-full">
          <div class="flex-grow">
            <label class="block font-bold py-2 text-white text-xs tracking-wide uppercase" for="event-name">Event Name</label>
            <input id="event-name" class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 leading-tight px-4 py-3 rounded w-full" type="text" placeholder="Name" maxlength="50">
          </div>
          <div class="flex-none font-mono mb-2.5 mt-auto px-3 text-white text-md">0/50 </div>
        </div>

        <!-- Website -->
        <div class="mt-6 w-full">
          <label class="block font-bold py-2 text-white text-xs tracking-wide uppercase" for="event-url">Website</label>
          <input id="event-url" class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 leading-tight px-4 py-3 rounded w-full" type="url" placeholder="https://reebAwebsite.com">
        </div>

        <!-- Date -->
        <div class="md:w-1/2 mt-6 w-full pr-3">
        <label class="block font-bold py-2 text-white text-xs tracking-wide uppercase" for="date">Date</label>
          <input id="date" class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 leading-tight px-4 py-3 rounded w-full" type="date">
        </div>

        <!-- Time Start -->
        <div class="md:w-2/4 mt-6 w-full pl-3">
          <label class="block font-bold py-2 text-white text-xs tracking-wide uppercase" for="time-start">Time Start</label>
          <input id="time-start" class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 leading-tight px-4 py-3 rounded w-full" type="time">
        </div>

        <!-- Location -->
        <div class="md:w-1/4 mt-6 pr-3 w-full">
          <label class="block font-bold py-2 text-white text-xs tracking-wide uppercase" for="location">Location</label>
          <input id="location" class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 leading-tight px-4 py-3 rounded w-full" type="text" placeholder="Rajamangkhala National Stadium">
        </div>

        <!-- Map -->
        <div class="md:w-3/4 mt-6 pl-3 w-full">
          <label class="block font-bold py-2 text-white text-xs tracking-wide uppercase" for="location-map">Google map link</label>
          <input id="location-map" class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 leading-tight px-4 py-3 rounded w-full" type="text" placeholder="Hua Mak, Bang Kapi, Bangkok,Thailand">
        </div>
        <hr class="border border-brand-blue-900 mt-8 mx-3 w-full">

        <!--v-if--><!-- Name -->
        <div class="md:w-1/2 mt-6 pr-3 w-full">
          <label class="block font-bold py-2 text-white text-xs tracking-wide uppercase" for="contact-name">Who to contact</label>
          <input id="contact-name" class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 leading-tight px-4 py-3 rounded w-full" type="text" placeholder="Bhattarapong Somwong">
        </div>

        <!-- Contact -->
        <div class="md:w-1/2 mt-6 pl-3 w-full">
          <label class="block font-bold py-2 text-white text-xs tracking-wide uppercase" for="contact-id">Contact credentials</label>
          <input id="contact-id" class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 leading-tight px-4 py-3 rounded w-full" type="text" placeholder="LINE, Facebook, Email, Tel">
        </div>

        <div class="mt-8 py-3 w-full">
          <button type="submit" class="bg-pale-yellow block border border-transparent disabled:text-gray-900 focus:ring-2
          focus:ring-pale-gray focus:ring-offset-2 font-semibold hover:bg-amber-200 justify-center mb-2 px-10 py-2 rounded-md shadow-sm text-sm text-pale-gray tracking-wide uppercase w-full">
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'create-event'
})
</script>

<style lang="scss">
.create-event-page {
  @apply bg-pale-gray h-screen w-full flex flex-row justify-center;
}
</style>
