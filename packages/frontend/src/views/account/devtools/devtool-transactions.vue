<template>
  <div class="devtool-transactions-page">
    <div class="devtool-transactions-page-content">
      <h1 class="text-4xl text-white">
        devtool-transactions
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'devtool-transactions'
})
</script>

<style scoped lang="scss">
.devtool-transactions-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.devtool-transactions-page-content {
  @apply container mt-6;
}
</style>
