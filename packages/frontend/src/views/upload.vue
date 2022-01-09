<template>
  <div class="upload-page">
    <div class="upload-page-content">
      <h1 class="text-4xl text-white">
        upload
      </h1>
      <input type="file" class="text-xl text-white" name="avatar-image-input" id="avatar-image-input" @change="onFileSelected">
      <button class="w-32 text-white rounded-xl h-18 bg-pale-yellow" @click="uploadFileAsync">
        Upload (async/await)
      </button>
      <div class="image">
        <img src="http://localhost:3000/avatars" alt="image">
      </div>
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
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.upload-page-content {
  @apply container mt-6;
}
</style>
