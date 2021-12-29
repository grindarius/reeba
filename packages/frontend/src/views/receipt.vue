<template>
  <div class="receipt-page">
    <div class="receipt-page-content">
      <div class="receipt-section">
        <div class="receipt-section-header">
          <div class="flex flex-row justify-center items-center">
            <h1 class="text-white text-4xl">Payment receipt</h1>
          </div>
          <img src="@/assets/sample-qr-code.png" alt="QR code">
        </div>
        <div class="receipt-section-description">
          <h1 class="receipt-header">
            Event name
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">BTS 'LOVE YOUR SELF'</span>
          </div>
          <h1 class="receipt-header">
            Venue
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">BTS 'LOVE YOUR SELF'</span>
          </div>
          <h1 class="receipt-header">
            Date & Time
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">BTS 'LOVE YOUR SELF'</span>
          </div>
          <h1 class="receipt-header">
            Zone
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">BTS 'LOVE YOUR SELF'</span>
          </div>
          <h1 class="receipt-header">
            Seat number
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">BTS 'LOVE YOUR SELF'</span>
          </div>
          <h1 class="receipt-header">
            Reserve ID
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">BTS 'LOVE YOUR SELF'</span>
          </div>
          <h1 class="receipt-header">
            Quantity
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">BTS 'LOVE YOUR SELF'</span>
          </div>
          <h1 class="receipt-header">
            Unit price (THB)
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">BTS 'LOVE YOUR SELF'</span>
          </div>
          <h1 class="receipt-header">
            Discount
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">BTS 'LOVE YOUR SELF'</span>
          </div>
          <h1 class="receipt-header">
            Service fee (40 THB/ticket)
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">BTS 'LOVE YOUR SELF'</span>
          </div>
          <h1 class="receipt-header">
            Shipping cost (THB)
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">BTS 'LOVE YOUR SELF'</span>
          </div>
          <h1 class="receipt-header">
            Credit card fee (THB)
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">BTS 'LOVE YOUR SELF'</span>
          </div>
          <h1 class="receipt-header">
            Shipping information
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">BTS 'LOVE YOUR SELF'</span>
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

<style lang="scss">
.receipt-page {
  @apply flex justify-center bg-pale-gray w-full min-h-screen;
}

.receipt-page-content {
  @apply container my-10;
}

.receipt-section {
  @apply w-full h-full bg-zinc-600 rounded-md p-8;
}

.receipt-section-header {
  @apply flex flex-row justify-between mb-6;
}

.receipt-section-description {
  @apply grid grid-flow-row grid-cols-3 gap-4;
}

.receipt-header {
  @apply text-white text-2xl;
}

.receipt-description-box {
  @apply bg-white leading-loose px-2 rounded-lg col-span-2;
}

.receipt-description-box-text {
  @apply text-xl leading-loose;
}
</style>
