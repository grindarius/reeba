<script setup lang="ts">
import { ref } from 'vue'
import { navigate } from 'astro:transitions/client'

const searchTerm = ref('')

const nagivateSearch = async () => {
  const q = new URLSearchParams([['q', searchTerm.value]])
  await navigate(`/search?${q.toString()}`)
}
</script>

<template>
  <input
    type="text"
    v-model="searchTerm"
    placeholder="Search"
    class="lg:w-96 input input-ghost"
    @keyup.enter="nagivateSearch"
  />
</template>
