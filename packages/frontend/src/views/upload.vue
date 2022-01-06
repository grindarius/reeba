<template>
<div class="upload-page">
  <div class="upload-page-content">
    <h1 class="text-white text-4xl">upload</h1>
    <input type="file" class="text-white text-xl" name="avatar-image-input" id="avatar-image-input" @change="onFileSelected">
    <button class="w-16 h-9 bg-pale-yellow text-white rounded-xl" @click="uploadFileAsync">Upload (async/await)</button>
    <router-link to="/event" class="pointer-events-none cursor-not-allowed">Come here now</router-link>
  </div>
</div>
</template>

<script lang="ts">
import ky from 'ky'
import { defineComponent, Ref, ref } from 'vue'

export default defineComponent({
  name: 'upload',
  setup () {
    const userAvatar: Ref<File | null> = ref(null)

    const uploadFileAsync = async (): Promise<void> => {
      if (userAvatar.value != null) {
        const body = new FormData()
        body.append('image', userAvatar.value, userAvatar.value.name)

        try {
          await ky.post('http://localhost:3000/avatars', {
            body
          })
        } catch (error) {
          console.error(error)
        }
      }
    }

    const onFileSelected = (e: Event): void => {
      console.log((e.target as HTMLInputElement).files)
      const files = e.target as HTMLInputElement
      userAvatar.value = files.files == null ? null : files.files[0]
    }

    return {
      onFileSelected,
      uploadFileAsync
    }
  }
})
</script>

<style scoped lang="scss">
.upload-page {
  @apply w-full min-h-screen flex flex-row justify-center bg-pale-gray;
}

.upload-page-content {
  @apply mt-6 container;
}
</style>
