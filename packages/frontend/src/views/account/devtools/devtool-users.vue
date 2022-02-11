<template>
  <div class="devtool-users-page">
    <div class="devtool-users-page-content">
      <h1 class="text-4xl text-white">
        devtool-users
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'devtool-users'
})
</script>

<style scoped lang="scss">
.devtool-users-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.devtool-users-page-content {
  @apply container mt-6;
}
</style>
