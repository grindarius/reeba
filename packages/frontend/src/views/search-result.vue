<template>
  <div class="search-page">
    <div class="search-page-content">
      <div class="flex flex-row">
        <div class="flex-none w-56">
          Filter
          <div class="mt-3 divide-y overflow-y-auto pt-4 rounded text-pale-gray bg-pale-yellow">
            <div class="text-xl font-bold text-left pl-4 pb-2">
              Type
            </div>
            <div class="py-4 text-xl text-pale-gray text-center font-bold dark:hover:bg-yellow-hover cursor-pointer">
              Official
            </div>

            <div class="py-4 text-xl text-pale-gray text-center font-bold dark:hover:bg-yellow-hover cursor-pointer">
              Local
            </div>
          </div>
          <div class="mt-3 divide-y overflow-y-auto py-4 rounded text-pale-gray bg-pale-yellow">
            <div class="text-xl font-bold text-left pl-4 pb-2">
              Price range
            </div>
            <div class="flex flex-col p-2 px-3 py-6 ">
              <input type="range" class="w-full" min="1" max="4" step="1">
              <ul class="flex justify-between text-sm px-[10px]">
                <li class="flex justify-center relative">
                  <span class="absolute" value="200">>200</span>
                </li>
                <li class="flex justify-center relative">
                  <span class="absolute" value="500">500</span>
                </li>
                <li class="flex justify-center relative">
                  <span class="absolute" value="1000">1000</span>
                </li>
                <li class="flex justify-center relative">
                  <span class="absolute" value="2000">>2000</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-3 divide-y overflow-y-auto py-4 rounded text-pale-gray bg-pale-yellow">
            <div class="text-xl font-bold text-left pl-4 pb-2">
              Date
            </div>
            <div class="pt-4 text-center relative">
              <select class="bg-white rounded">
                <option>All Dates</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
                <option>Next Week</option>
                <option>Next Month</option>
                <option>Next Year</option>
              </select>
            </div>
          </div>
          <div class="mt-3 divide-y overflow-y-auto py-4 rounded text-pale-gray bg-pale-yellow">
            <div class="text-xl font-bold text-left pl-4 pb-2">
              Type
            </div>
            <div class="flex items-center py-2 px-3 dark:hover:bg-yellow-hover" v-for="(tag, i) in eventTagsSelectors" :key="`event-tag-list-checkbox-${i}`">
              <input :id="`event-tag-checkbox-input-${tag.tag}`" type="checkbox" class="cursor-pointer mr-10 w-4 h-4 rounded" :value="tag.tag" v-model="eventTags">
              <label :for="`event-tag-checkbox-input-${tag.tag}`" class="cursor-pointer font-light text-pale-gray">{{ tag.name }}</label>
            </div>
          </div>
        </div>
        <div class="grow pl-20">
          12 repository results
          <div class="mt-3 divide-y overflow-y-auto py-4 px-4 rounded text-pale-gray bg-pale-yellow">
            <div class=" text-xl font-bold text-left pl-4 pb-2">
              Name
              <div class=" text-sm font-medium pl-3">
                Date
              </div>
            </div>
            <div class="text-base pl-3 break-all whitespace-pre-line text-ellipsis truncate">
              Description
              <div class="text-sm pl-4">
                location
              </div>
            </div>
          </div>
          <div class="px-4 py-4">
            <div class="flex items-center space-x-1">
              <a href="#" class="flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md">
                Previous
              </a>

              <a href="#" class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
                1
              </a>
              <a href="#" class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
                2
              </a>
              <a href="#" class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
                3
              </a>
              <a href="#" class="px-4 py-2 font-bold text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white">
                Next
              </a>
            </div>
          </div>
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
