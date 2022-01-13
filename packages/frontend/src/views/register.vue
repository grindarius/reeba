<template>
  <div class="register-page">
    <div class="register-page-content">
      <h1 class="text-4xl text-white">
        register
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'register'
})
</script>

<style scoped lang="scss">
.register-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.register-page-content {
  @apply container mt-6;
}
</style>
