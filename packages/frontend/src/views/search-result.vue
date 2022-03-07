<template>
  <div class="search-page">
    <div class="search-page-content">
      <div class="flex flex-row">
        <div class="flex-none">
          Filter
          <div class="pt-6" id="filter-section-mobile-0">
            <div class="space-y-6">
              <div class="flex items-center">
                <input id="filter-mobile-color-0" name="color[]" value="white" type="checkbox" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
                <label for="filter-mobile-color-0" class="ml-3 min-w-0 flex-1 text-black"> White </label>
              </div>

              <div class="flex items-center">
                <input id="filter-mobile-color-1" name="color[]" value="beige" type="checkbox" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
                <label for="filter-mobile-color-1" class="ml-3 min-w-0 flex-1 text-black"> Beige </label>
              </div>

              <div class="flex items-center">
                <input
                  id="filter-mobile-color-2" name="color[]"
                  value="blue" type="checkbox"
                  checked
                  class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
                <label for="filter-mobile-color-2" class="ml-3 min-w-0 flex-1 text-black"> Blue </label>
              </div>

              <div class="flex items-center">
                <input id="filter-mobile-color-3" name="color[]" value="brown" type="checkbox" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
                <label for="filter-mobile-color-3" class="ml-3 min-w-0 flex-1 text-black"> Brown </label>
              </div>

              <div class="flex items-center">
                <input id="filter-mobile-color-4" name="color[]" value="green" type="checkbox" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
                <label for="filter-mobile-color-4" class="ml-3 min-w-0 flex-1 text-black"> Green </label>
              </div>

              <div class="flex items-center">
                <input id="filter-mobile-color-5" name="color[]" value="purple" type="checkbox" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
                <label for="filter-mobile-color-5" class="ml-3 min-w-0 flex-1 text-black"> Purple </label>
              </div>
            </div>
          </div>
        </div>
        <div class="grow pl-20">
          12 repository results
        </div>
      </div>
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
