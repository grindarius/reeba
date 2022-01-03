<template>
<div class="edit-user-settings-page">
  <div class="edit-user-settings-page-content">
    <h1 class="text-white text-4xl">edit-user-settings</h1>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'edit-user-settings'
})
</script>

<style scoped lang="scss">
.edit-user-settings-page {
  @apply w-full min-h-screen flex flex-row justify-center bg-pale-gray;
}

.edit-user-settings-page-content {
  @apply mt-6 container;
}
</style>
