<template>
  <div class="devtool-summary-page">
    <h1 class="page-header">
      Statistics summary
    </h1>
    <div class="mt-8">
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
                new events this month
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
                new users this month
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-3 mt-8">
      <h1 class="page-header">
        Where
      </h1>
      <r-dropdown :values="['users', 'events']" v-model:selected-value="selectedChartType" />
      <h1 class="page-header">
        came from
      </h1>
    </div>
    <div id="world-map-tooltip" />
    <div id="world-map" ref="worldMapRef" />
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3'
import { FeatureCollection, Geometry } from 'geojson'
import iso from 'iso-3166-1'
import * as topojson from 'topojson-client'
import { GeometryCollection, Topology } from 'topojson-specification'
import { computed, defineComponent, onMounted, Ref, ref, watch } from 'vue'

import countriesJson from '@/assets/world-topo.json'
import RDropdown from '@/components/r-dropdown.vue'
import { devtoolsEventsObject, devtoolsUsersObject } from '@/constants'

export default defineComponent({
  name: 'devtool-summary',
  components: {
    'r-dropdown': RDropdown
  },
  setup () {
    const width = 800
    const height = 600
    const colorRange: [string, string] = ['#222', '#D5A755']

    const selectedChartType = ref('users')

    const worldMapRef: Ref<HTMLDivElement | undefined> = ref(undefined)
    const land = ref({}) as Ref<FeatureCollection<Geometry, { name: string }>>
    const svg = ref() as Ref<d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>>
    const tooltip = ref()
    const projection = ref(d3.geoMercator().scale(115).center([0, 20]).translate([width / 2, height / 2]))
    const path = ref(d3.geoPath().projection(projection.value))

    const colorUsers = computed(() => {
      return d3.scaleLinear([0, Math.max(...Object.values(devtoolsUsersObject))], colorRange)
    })

    const colorEvents = computed(() => {
      return d3.scaleLinear([0, Math.max(...Object.values(devtoolsEventsObject))], colorRange)
    })

    const totalUsers = computed(() => {
      return d3.format(',.2r')(Object.values(devtoolsUsersObject).reduce((total, users) => total + users, 0))
    })

    const createChart = (): void => {
      svg.value = d3.select('div#world-map')
        .append('svg')
        .attr('id', 'world-map-svg')
        .attr('viewBox', `0 0 ${width} ${height}`)

      tooltip.value = d3.select('div#world-map-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')

      // @ts-expect-error from how json calculates their type
      land.value = topojson.feature(countriesJson as Topology, countriesJson.objects.countries as GeometryCollection<{ name: string }>)
      updateChart()
    }

    const updateChart = (): void => {
      // d3.select('svg#world-map-svg').selectAll('path').remove()

      svg.value.selectAll('svg#world-map-svg')
        .data(land.value.features)
        .join('path')
        .attr('d', path.value)
        .attr('stroke', '#ddd')
        .attr('stroke-width', '0.5px')
        .attr('fill', (d) => {
          if (selectedChartType.value === 'users') {
            return colorUsers.value(iso.whereNumeric(d.id ?? '') == null ? 0 : devtoolsUsersObject[(iso.whereNumeric(d.id ?? '') ?? {}).alpha2 ?? ''] ?? 0)
          }

          return colorEvents.value(iso.whereNumeric(d.id ?? '') == null ? 0 : devtoolsEventsObject[(iso.whereNumeric(d.id ?? '') ?? {}).alpha2 ?? ''] ?? 0)
        })
        .on('mouseover', () => {
          tooltip.value.style('visibility', 'visible')
        })
        .on('mousemove', (event, d) => {
          const xy = d3.pointer(event, d3.select('svg#world-map-svg'))
          const alpha2Key = iso.whereNumeric(d.id ?? '')?.alpha2 ?? ''

          const usersHTMLString = `
            <div class="py-1 px-4 h-16 rounded-lg bg-pale-yellow">
              <h3 class="font-mono">${iso.whereAlpha2(alpha2Key)?.country ?? 'No data'}</h3>
              <h3 :style="{ visibility: iso.whereAlpha(alpha2Key)?.country == null ? 'hidden' : 'visible' }" class="font-mono text-xl">${devtoolsUsersObject[alpha2Key] == null ? 'No data' : devtoolsUsersObject[alpha2Key] + ' users'}</h3>
            </div>
          `

          const eventsHTMLString = `
            <div class="py-1 px-4 h-16 rounded-lg bg-pale-yellow">
              <h3 class="font-mono">${iso.whereAlpha2(alpha2Key)?.country ?? 'No data'}</h3>
              <h3 :style="{ visibility: iso.whereAlpha(alpha2Key)?.country == null ? 'hidden' : 'visible' }" class="font-mono text-xl">${devtoolsEventsObject[alpha2Key] == null ? 'No data' : devtoolsEventsObject[alpha2Key] + ' events'}</h3>
            </div>
          `

          tooltip.value.style('top', `${xy[1] + 10}px`)
            .style('left', `${xy[0] + 10}px`)
            .html(selectedChartType.value === 'users' ? usersHTMLString : eventsHTMLString)
        })
        .on('mouseleave', () => {
          tooltip.value.style('visibility', 'hidden')
        })
    }

    onMounted(async () => {
      createChart()
    })

    watch(selectedChartType, (value) => {
      console.log(value)
      updateChart()
    })

    return {
      worldMapRef,
      totalUsers,
      selectedChartType
    }
  }
})
</script>

<style scoped lang="scss">
.page-header {
  @apply text-4xl font-semibold text-white;
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
