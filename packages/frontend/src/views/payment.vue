<template>
<div class="payment-page">
  <div class="payment-section">
    <div class="payment-card">
      <h1 class="text-4xl font-medium">
        BTS WORLD TOUR 'LOVE YOURSELF' BANGKOK
      </h1>
      <div class="payment-details">
        <div class="payment-channels">
          <h1 class="text-2xl font-sans mb-6">Payment details</h1>
          <div class="payment-selectors">
            <div class="payment-type-selections">
              <h1 class="text-xl font-sans text-white">Payment types</h1>
              <div class="payment-types">
                <div class="payment-method">
                  <v-mdi name="mdi-wallet" fill="#D5A755" size="32"></v-mdi>
                  <h1 class="text-md font-sans text-white">Credit card</h1>
                </div>
                <div class="payment-method">
                  <v-mdi name="mdi-wallet" fill="#D5A755" size="32"></v-mdi>
                  <h1 class="text-md font-sans text-white">Google Pay</h1>
                </div>
                <div class="payment-method">
                  <v-mdi name="mdi-wallet" fill="#D5A755" size="32"></v-mdi>
                  <h1 class="text-md font-sans text-white">Paypal</h1>
                </div>
              </div>
            </div>
          <div class="selected-payment">
            <div class="credit-card-payment">
              <label for="card-number-input" class="text-sm font-sans text-white inline-block mt-2">Card number</label>
              <input type="text" name="card-number-input" id="card-number-input" placeholder="**** **** **** ****">
              <label for="card-name-input" class="text-sm font-sans text-white inline-block mt-2">Card name</label>
              <input type="text" name="card-name-input" id="card-name-input" placeholder="Tom Holland">
              <div class="mt-2 grid grid-cols-2 gap-6">
                <div class="card-expiration-date-section">
                  <label for="card-expiration-date" class="text-sm font-sans text-white">Expiration date</label>
                  <input type="text" name="card-expiration-date-input" id="card-expiration-date-input" placeholder="MM/YY">
                </div>
                <div class="card-cvc-section">
                  <label for="card-cvc-input" class="text-sim font-sans text-white">CVC</label>
                  <input type="text" name="card-cvc-input" id="card-cvc-input" placeholder="***">
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div class="receipt">
          <h1 class="text-2xl font-sans mb-6">Payment receipt</h1>
          <div class="payment-small-receipt">
            <h1 class="text-xl font-sans text-white mb-2">Ticket type</h1>
              <div class="ticket-type">
                <h1 class="text-white">C4-C09</h1>
                <h1 class="text-white">THB 6,400.00</h1>
              </div>
              <h1 class="text-s font-sans text-gray-400">(THB 6,400.00 × 1)</h1>
              <div class="subtotal-detail text-white text-l font-sans">
                <h1>Subtotal</h1>
                <h1>THB 6,400.00</h1>
              </div>
              <div class="service-fee-detail text-white font-sans">
                <h1 class="text-l">Service Fee</h1>
                <h1 class="text-l">THB 40.00</h1>
              </div>
              <div class="credit-fee-detail text-white font-sans text-l">
                <h1>Credit Card Fee (VAT incl.)</h1>
                <h1>THB 5.00</h1>
              </div>
          </div>
          <div class="total-detail text-black font-sans text-2xl">
            <h1>Total</h1>
            <h1 class="text-gray-600">THB 6,445.00</h1>
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
  name: 'payment'
})
</script>

<style lang="scss">
.payment-page {
  @apply bg-pale-gray min-h-screen w-full flex flex-row justify-center;
}

.payment-section {
  @apply py-14 container;
}

.payment-channels {
  @apply col-span-2;
}

.payment-card {
  @apply bg-white rounded-xl w-full p-6;
}

.payment-details {
  @apply grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 justify-center;
}

.payment-selectors, .payment-small-receipt {
  @apply bg-gray-800 rounded-lg p-6;
}

.payment-types {
  @apply flex flex-row justify-center mt-4;
}

.payment-method {
  @apply w-32 text-center;
}

.payment-receipt {
  @apply flex flex-row justify-center mt-4;
}

.selected-payment {
  @apply mt-8;
}

.ticket-seat {
  @apply flex flex-row justify-center mt-4;
}

.ticket-type {
  @apply flex justify-between
}

.subtotal-detail {
  @apply flex mt-2 justify-between
}

.service-fee-detail {
  @apply flex mt-2 justify-between
}

.credit-fee-detail {
  @apply flex mt-2 justify-between
}

.total-detail {
  @apply flex mt-2 justify-between
}

#card-number-input, #card-name-input, #card-expiration-date-input, #card-cvc-input {
  @apply w-full h-9 bg-gray-800 outline-none text-white border-b border-gray-600 font-sans;
}
</style>
