<template>
<div class="upload-page">
  <div class="upload-page-content">
    <h1 class="text-white text-4xl">upload</h1>
    <input type="file" class="text-white text-xl" name="avatar-image-input" id="avatar-image-input" @change="onFileUploaded">
    <button class="w-16 h-9 bg-pale-yellow text-white rounded-xl" @click="uploadFile">Upload</button>
  </div>
</div>
</template>

<script lang="ts">
import ky from 'ky'
import { defineComponent, onMounted, ref } from 'vue'

import { postAvatar } from '@/api/endpoints'

export default defineComponent({
  name: 'upload',
  setup () {
    const file = ref<File | null>(null)

    const onFileUploaded = (event: Event): void => {
      const inputtedFile = (event.target as HTMLInputElement).files

      file.value = inputtedFile == null ? null : inputtedFile[0]
    }

    const uploadFile = async (): Promise<void> => {
      const response = await ky(postAvatar.url, {
        method: postAvatar.method,
        json: {
          hello: 'hello'
        }
      }).json<{ hello: string }>()

      console.log('world', response)
    }

    onMounted(() => {
      console.log(import.meta.env)
    })

    return {
      onFileUploaded,
      uploadFile
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
