<template>
  <div class="search-page">
    <div class="search-page-content">
      <h1 class="text-4xl text-white">
        search
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import ky from 'ky'
import { defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'search',
  setup () {
    const route = useRoute()

    onMounted(async () => {
      await ky('http://localhost:3000/search', {
        method: 'get',
        searchParams: {
          q: route.query.q == null ? '' : Array.isArray(route.query.q) ? route.query.q.join(',') : route.query.q,
          pricerange: route.query.pricerange == null ? '' : Array.isArray(route.query.pricerange) ? route.query.pricerange.join(',') : route.query.pricerange,
          datetime: route.query.datetime == null ? '' : Array.isArray(route.query.datetime) ? route.query.datetime.join(',') : route.query.datetime
        }
      })
    })
  }
})
</script>

<style scoped lang="scss">
.search-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.search-page-content {
  @apply container mt-6;
}
</style>
