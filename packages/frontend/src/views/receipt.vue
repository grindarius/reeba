<template>
  <div class="flex justify-center bg-pale-gray w-full min-h-screen">
    <div class="container">
      <div class="flex justify-center px-32 py-10">
        <div class="w-full h-full bg-zinc-600 rounded-md">
          <div class="justify-center px-8 py-8">
            <div><p class="text-right block font-bold text-[25px] text-white text-xl" for="receipt">Payment Receipt</p></div><div class="py-4"></div>
            <div class="flex justify-between">
              <div><p class="font-bold text-white text-xl leading-loose" for="event-name">Event Name</p></div>
              <div class="grid grid-cols-[500px] rounded-lg bg-white text-base leading-loose"></div>
            </div><div class="py-2"></div>
            <div class="flex justify-between">
              <div><p class="font-bold text-white text-xl leading-loose" for="venue">Venue</p></div>
              <div class="grid grid-cols-[500px] rounded-lg bg-white text-base leading-loose"></div>
            </div><div class="py-2"></div>
            <div class="flex justify-between">
              <div><p class="font-bold text-white text-xl leading-loose" for="date&time">Date & Time</p></div>
              <div class="grid grid-cols-[500px] rounded-lg bg-white text-base leading-loose"></div>
            </div><div class="py-2"></div>
            <div class="flex justify-between">
              <div><p class="font-bold text-white text-xl leading-loose" for="zone">Zone</p></div>
              <div class="grid grid-cols-[500px] rounded-lg bg-white text-base leading-loose"></div>
            </div><div class="py-2"></div>
            <div class="flex justify-between">
              <div><p class="font-bold text-white text-xl leading-loose" for="seat-number">Seat NO</p></div>
              <div class="grid grid-cols-[500px] rounded-lg bg-white text-base leading-loose"></div>
            </div><div class="py-2"></div>
            <div class="flex justify-between">
              <div><p class="font-bold text-white text-xl leading-loose" for="reserve-id">Reserve ID</p></div>
              <div class="grid grid-cols-[500px] rounded-lg bg-white text-base leading-loose"></div>
            </div><div class="py-2"></div>
            <div class="flex justify-between">
              <div><p class="font-bold text-white text-xl leading-loose" for="quantity">Quantity</p></div>
              <div class="grid grid-cols-[500px] rounded-lg bg-white text-base leading-loose"></div>
            </div><div class="py-2"></div>
            <div class="flex justify-between">
              <div><p class="font-bold text-white text-xl leading-loose" for="unit-price">Unit Price (Baht)</p></div>
              <div class="grid grid-cols-[500px] rounded-lg bg-white text-base leading-loose"></div>
            </div><div class="py-2"></div>
            <div class="flex justify-between">
              <div><p class="font-bold text-white text-xl leading-loose" for="discount">Discount</p></div>
              <div class="grid grid-cols-[500px] rounded-lg bg-white text-base leading-loose"></div>
            </div><div class="py-2"></div>
            <div class="flex justify-between">
              <div><p class="font-bold text-white text-xl leading-loose" for="service-fee">Service Fee (40 Baht per ticket)</p></div>
              <div class="grid grid-cols-[500px] rounded-lg bg-white text-base leading-loose"></div>
            </div><div class="py-2"></div>
            <div class="flex justify-between">
              <div><p class="font-bold text-white text-xl leading-loose" for="shipping">Shipping (Baht)</p></div>
              <div class="grid grid-cols-[500px] rounded-lg bg-white text-base leading-loose"></div>
            </div><div class="py-2"></div>
            <div class="flex justify-between">
              <div><p class="font-bold text-white text-xl leading-loose" for="credit-card-fee">Credit Card Fee (Baht)</p></div>
              <div class="grid grid-cols-[500px] rounded-lg bg-white text-base leading-loose"></div>
            </div><div class="py-2"></div>
            <div class="flex justify-between">
              <div><p class="font-bold text-white text-xl leading-loose" for="shipping-information">Shipping Information</p></div>
              <div class="grid grid-cols-[500px] rounded-lg bg-white text-base leading-loose"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'receipt'
})
</script>
