<template>
  <div class="search-page">
    <div class="search-page-content">
      <div class="flex flex-row">
        <div class="flex-none">
          Filter
          <div class="mt-3 divide-y overflow-y-auto py-4 rounded dark:bg-gray-800">
            <div>
              <a href="#" class="flex items-center p-2 text-xl font-bold text-gray-900 dark:text-white dark:hover:bg-gray-700">
                <span class="ml-3">Official</span>
              </a>
            </div>

            <div>
              <a href="#" class="flex items-center p-2 text-xl font-bold text-gray-900 dark:text-white dark:hover:bg-gray-700">
                <span class="ml-3">Local</span>
              </a>
            </div>
          </div>
          <div class="mt-3 divide-y overflow-y-auto px-3 py-6 rounded text-white dark:bg-gray-800">
            <div class="flex flex-col p-2">
              <input type="range" class="w-full" min="1" max="4" step="1">
              <ul class="flex justify-between px-[10px]">
                <li class="flex justify-center relative">
                  <span class="absolute">>200</span>
                </li>
                <li class="flex justify-center relative">
                  <span class="absolute">500</span>
                </li>
                <li class="flex justify-center relative">
                  <span class="absolute">1000</span>
                </li>
                <li class="flex justify-center relative">
                  <span class="absolute">>2000</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-3 divide-y overflow-y-auto py-4 rounded dark:bg-gray-800">
            <div class="flex items-center py-2 px-3 dark:hover:bg-gray-700" v-for="(tag, i) in eventTagsSelectors" :key="`event-tag-list-checkbox-${i}`">
              <input :id="`event-tag-checkbox-input-${tag.tag}`" type="checkbox" class="cursor-pointer mr-10 w-4 h-4 rounded" :value="tag.tag" v-model="eventTags">
              <label :for="`event-tag-checkbox-input-${tag.tag}`" class="cursor-pointer font-light text-white">{{ tag.name }}</label>
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
