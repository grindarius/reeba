<template>
  <div class="developer-tools-page">
    <h1 class="page-header">
      Developer Tools
    </h1>
    <div class="mt-4">
      <div class="flex object-center flex-wrap -mx-6">
        <div class="px-6 w-full sm:w-1/2 xl:w-1/3">
          <div class="box-bg-text-header">
            <div class="mx-5">
              <h4 class="box-text-secondary">
                {{ totalUsers }}
              </h4>
              <div class="box-total">
                total users
              </div>
            </div>
          </div>
        </div>
        <div class="px-6 mt-6 w-full sm:mt-0 sm:w-1/2 xl:w-1/3">
          <div class="box-bg-text-header">
            <div class="mx-5">
              <h4 class="box-text-secondary">
                230
              </h4>
              <div class="box-total">
                total tickets sold
              </div>
            </div>
          </div>
        </div>
        <div class="px-6 mt-6 w-full sm:w-1/2 xl:mt-0 xl:w-1/3">
          <div class="box-bg-text-header">
            <div class="mx-5">
              <h4 class="box-text-secondary">
                500
              </h4>
              <div class="box-total">
                total events created
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="users-world-map-tooltip" />
    <div id="users-world-map" class="mt-8" ref="worldMapRef" />
    <div class="flex flex-col mt-8">
      <div class="overflow-x-auto py-2 -my-2 sm:px-6 sm:-mx-6 lg:px-8 lg:-mx-8">
        <div class="inline-block overflow-hidden min-w-full align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="box-bg">
                  Name
                </th>
                <th class="box-bg">
                  Title
                </th>
                <th class="box-bg">
                  Status
                </th>
                <th class="box-bg">
                  Role
                </th>
                <th class="py-3 px-6 border-b border-pale-gray bg-pale-yellow" />
              </tr>
            </thead>
            <tbody class="bg-pale-yellow">
              <tr>
                <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img class="w-10 h-10 rounded-full" src="@/assets/user.png" alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium leading-5 text-pale-gray">
                        John Doe
                      </div>
                      <div class="text-sm leading-5 text-gray-500">
                        john@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                  <div class="text-sm leading-5 text-pale-gray">
                    Software Engineer
                  </div>
                  <div class="text-sm leading-5 text-gray-500">
                    Web dev
                  </div>
                </td>
                <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                  <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                    Active
                  </span>
                </td>
                <td class="py-4 px-6 text-sm leading-5 whitespace-nowrap border-b border-pale-gray text-pale-gray">
                  Owner
                </td>
                <td class="py-4 px-6 text-sm font-medium leading-5 text-right whitespace-nowrap border-b border-pale-gray">
                  <a href="#" class="text-pale-gray hover:text-gray-hover">
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img
                        class="w-10 h-10 rounded-full"
                        src="@/assets/user.png"
                        alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium leading-5 text-pale-gray">
                        John Doe
                      </div>
                      <div class="text-sm leading-5 text-gray-500">
                        john@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                  <div class="text-sm leading-5 text-pale-gray">
                    Software Engineer
                  </div>
                  <div class="text-sm leading-5 text-gray-500">
                    Web dev
                  </div>
                </td>
                <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                  <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                </td>
                <td class="py-4 px-6 text-sm leading-5 whitespace-nowrap border-b border-pale-gray text-pale-gray">
                  Owner
                </td>
                <td class="py-4 px-6 text-sm font-medium leading-5 text-right whitespace-nowrap border-b border-pale-gray">
                  <a href="#" class="text-pale-gray hover:text-gray-hover">Edit</a>
                </td>
              </tr>
              <tr>
                <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img
                        class="w-10 h-10 rounded-full"
                        src="@/assets/user.png"
                        alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium leading-5 text-pale-gray">
                        John Doe
                      </div>
                      <div class="text-sm leading-5 text-gray-500">
                        john@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                  <div class="text-sm leading-5 text-pale-gray">
                    Software Engineer
                  </div>
                  <div class="text-sm leading-5 text-gray-500">
                    Web dev
                  </div>
                </td>
                <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                  <span
                    class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                </td>
                <td
                  class="py-4 px-6 text-sm leading-5 whitespace-nowrap border-b border-pale-gray text-pale-gray">
                  Owner
                </td>
                <td
                  class="py-4 px-6 text-sm font-medium leading-5 text-right whitespace-nowrap border-b border-pale-gray">
                  <a href="#" class="text-pale-gray hover:text-gray-hover">Edit</a>
                </td>
              </tr>
              <tr>
                <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img class="w-10 h-10 rounded-full" src="@/assets/user.png" alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium leading-5 text-pale-gray">
                        John Doe
                      </div>
                      <div class="text-sm leading-5 text-gray-500">
                        john@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                  <div class="text-sm leading-5 text-pale-gray">
                    Software Engineer
                  </div>
                  <div class="text-sm leading-5 text-gray-500">
                    Web dev
                  </div>
                </td>
                <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                  <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                </td>
                <td class="py-4 px-6 text-sm leading-5 whitespace-nowrap border-b border-pale-gray text-pale-gray">
                  Owner
                </td>
                <td class="py-4 px-6 text-sm font-medium leading-5 text-right whitespace-nowrap border-b border-pale-gray">
                  <a href="#" class="text-pale-gray hover:text-gray-hover">
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3'
import iso from 'iso-3166-1'
import * as topojson from 'topojson-client'
import { GeometryCollection, Topology } from 'topojson-specification'
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'

import countriesJson from '@/assets/world-topo.json'
import { devtoolsUsersObject } from '@/constants'

export default defineComponent({
  name: 'developer-tools',
  setup () {
    const width = 800
    const height = 600

    const worldMapRef: Ref<HTMLDivElement | undefined> = ref(undefined)
    const svg = ref() as Ref<d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>>
    const tooltip = ref()
    const projection = ref(d3.geoMercator().scale(98).center([0, 20]).translate([width / 2, height / 2]))
    const path = ref(d3.geoPath().projection(projection.value))

    const color = computed(() => {
      return d3.scaleLinear([0, Math.max(...Object.values(devtoolsUsersObject))], ['#222', '#D5A755'])
    })

    const totalUsers = computed(() => {
      return d3.format(',.2r')(Object.values(devtoolsUsersObject).reduce((total, users) => total + users, 0))
    })

    onMounted(async () => {
      svg.value = d3.select('div#users-world-map')
        .append('svg')
        .attr('id', 'users-world-map-svg')
        .attr('viewBox', `0 0 ${width} ${height}`)

      tooltip.value = d3.select('div#users-world-map-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')

      // @ts-expect-error from how json calculates their type
      const land = topojson.feature(countriesJson as Topology, countriesJson.objects.countries as GeometryCollection<{ name: string }>)

      svg.value.selectAll('svg#users-world-map-svg')
        .data(land.features)
        .enter()
        .append('path')
        .attr('d', path.value)
        .attr('stroke', '#ddd')
        .attr('stroke-width', '0.5px')
        .attr('fill', (d) => color.value(iso.whereNumeric(d.id ?? '') == null ? 0 : devtoolsUsersObject[(iso.whereNumeric(d.id ?? '') ?? {}).alpha2 ?? ''] ?? 0))
        .on('mouseover', () => {
          tooltip.value.style('visibility', 'visible')
        })
        .on('mousemove', (event, d) => {
          const xy = d3.pointer(event, d3.select('svg#users-world-map-svg'))
          const alpha2Key = iso.whereNumeric(d.id ?? '')?.alpha2 ?? ''

          tooltip.value.style('top', `${xy[1] + 10}px`)
            .style('left', `${xy[0] + 10}px`)
            .html(`
              <div class="py-1 px-4 h-16 rounded-lg bg-pale-yellow">
                <h3 class="font-mono">${iso.whereAlpha2(alpha2Key)?.country ?? 'No data'}</h3>
                <h3 :style="{ visibility: iso.whereAlpha(alpha2Key)?.country == null ? 'hidden' : 'visible' }" class="font-mono text-xl">${devtoolsUsersObject[alpha2Key] == null ? 'No data' : devtoolsUsersObject[alpha2Key] + ' users'}</h3>
              </div>
            `)
        })
        .on('mouseleave', () => {
          tooltip.value.style('visibility', 'hidden')
        })
    })

    return {
      worldMapRef,
      totalUsers
    }
  }
})
</script>

<style scoped lang="scss">
.page-header {
  @apply text-4xl font-semibold text-white;
}

.box-bg {
  @apply py-3 px-6 text-xs font-medium tracking-wider leading-4 text-left uppercase border-b border-pale-gray bg-pale-yellow text-pale-gray;
}

.box-bg-text-header {
  @apply flex items-center py-6 px-5 rounded-md shadow-sm bg-pale-yellow text-pale-gray;
}

.box-text-secondary {
  @apply text-2xl font-semibold text-pale-gray;
}

.box-total {
  @apply uppercase text-pale-gray;
}
</style>
