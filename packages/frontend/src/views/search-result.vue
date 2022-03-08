<template>
  <div class="search-page">
    <div class="search-page-content">
      <div class="flex flex-row">
        <div class="flex-none">
          Filter
          <div class="flex flex-col">
            <label class="inline-flex items-center mt-3">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-yellow-600" checked><span class="ml-2 text-back">lasssssssssssssssssssbel</span>
            </label>
          </div>

          <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
            <ul class="space-y-2">
              <li>
                <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span class="ml-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span class="flex-1 ml-3 whitespace-nowrap">Kanban</span>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span class="flex-1 ml-3 whitespace-nowrap">Products</span>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span class="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span class="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="flex items-center h-5" v-for="(tag, i) in eventTagsSelectors" :key="`event-tag-list-checkbox-${i}`">
            <input :id="`event-tag-checkbox-input-${tag.tag}`" type="checkbox" class="mr-10 w-4 h-4 rounded border border-gray-300 focus:border-gray-600 accent-pink-500 focus:ring-3" :value="tag.tag" v-model="eventTags">
            <label :for="`event-tag-checkbox-input-${tag.tag}`" class="font-medium text-white">{{ tag.name }}</label>
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
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'search',
  setup () {
    const route = useRoute()
    const eventTags: Ref<Array<string>> = ref([])

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
    const eventTagsSelectors: Ref<Array<{ name: string, tag: string }>> = ref([
      { name: 'Amphitheater', tag: 'amphitheater' },
      { name: 'Business', tag: 'business' },
      { name: 'Concert', tag: 'concert' },
      { name: 'Entertainment', tag: 'entertainment' },
      { name: 'Fan meet', tag: 'fan-meet' },
      { name: 'Gameshow', tag: 'gameshow' },
      { name: 'Lifestyle', tag: 'lifestyle' },
      { name: 'Live', tag: 'live' },
      { name: 'Musical', tag: 'musical' },
      { name: 'Online', tag: 'online' },
      { name: 'Opera', tag: 'opera' },
      { name: 'Seminar', tag: 'seminar' },
      { name: 'Stand up comedy', tag: 'stand-up-comedy' },
      { name: 'Technology', tag: 'technology' },
      { name: 'Variety', tag: 'variety' }
    ])
    return {
      eventTagsSelectors,
      eventTags
    }
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
