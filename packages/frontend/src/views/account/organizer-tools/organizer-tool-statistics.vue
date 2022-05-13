<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <h1 class="text-4xl font-semibold text-white">
    Overview
  </h1>
  <div class="flex flex-col gap-4 mt-6 lg:flex-row">
    <div class="p-4 rounded-lg shadow-md basis-1/5 bg-base-200">
      <h1 class="text-2xl font-bold">
        Total tickets sold
      </h1>
      <div class="flex flex-row justify-evenly place-items-center">
        <div class="mt-5 radial-progress" :style="`--value: ${Math.round(overviewResponse?.seatFullnessPercentage ?? 0)};`">
          {{ Math.round(overviewResponse?.seatFullnessPercentage ?? 0) }}%
        </div>
        <div class="text-xl">
          {{ d3.format(',')(overviewResponse?.totalTakenSeats ?? 0) }} / {{ d3.format(',')(overviewResponse?.totalSeats ?? 0) }}
        </div>
      </div>
    </div>
    <div class="p-4 rounded-lg shadow-md grow bg-base-200">
      <div class="text-2xl font-bold">
        Sales summary
      </div>
      <div class="grid grid-cols-2 gap-y-3">
        <h1 class="text-xl font-bold">
          Gross ticket sales
        </h1>
        <h1 class="text-xl">
          {{ d3.format(',')(overviewResponse?.grossTicketSales ?? 0) }} THB
        </h1>
        <div class="text-xl font-bold">
          ReebA ticket fee
        </div>
        <h1 class="text-xl">
          {{ d3.format(',')(overviewResponse?.reebaTicketFees ?? 0) }} THB
        </h1>
        <h1 class="text-xl font-bold">
          Net payout
        </h1>
        <h1 class="text-xl">
          {{ d3.format(',')(overviewResponse?.netPayout ?? 0) }} THB
        </h1>
      </div>
    </div>
  </div>
  <h1 class="my-4 text-3xl font-bold">
    Users map
  </h1>
  <div id="organizer-world-map" />
  <div class="overflow-x-auto">
    <table class="table w-full table-compact">
      <thead>
        <tr>
          <th>
            Country
          </th>
          <th>
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in usersMapOverviewResponse.users" :key="`users-map-overview-data-table-${u.country}`">
          <td>
            {{ i18nCountries.getName(u.country, 'en') }}
          </td>
          <td>
            {{ u.amount }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3'
import { FeatureCollection, Geometry } from 'geojson'
import * as i18nCountries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'
import ky from 'ky'
import * as topojson from 'topojson-client'
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'

import {
  GetOrganizerEventStatisticsReply,
  GetOrganizerEventUsersMapReply
} from '@reeba/common'

import { getOrganizerEventStatisticsEndpoint, getOrganizerEventUsersMapEndpoint } from '@/api/endpoints'
import countriesJson from '@/assets/world-topo.json'
import { useAuthStore } from '@/store/use-auth-store'

i18nCountries.registerLocale(en)

export default defineComponent({
  name: 'organizer-tool-statistics',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()

    const width = 1000
    const height = 500

    const land = ref({}) as Ref<FeatureCollection<Geometry, { name: string }>>
    const svg = ref() as Ref<d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>>
    const projection = ref(d3.geoMercator().scale(100).center([0, 20]).translate([width / 2, height / 2]))
    const path = ref(d3.geoPath().projection(projection.value))

    const overviewResponse = ref<GetOrganizerEventStatisticsReply | undefined>(undefined)
    const usersMapOverviewResponse = ref<GetOrganizerEventUsersMapReply>({ users: [] })

    useMeta(computed(() => {
      return {
        title: overviewResponse.value?.name ?? 'Organizer statistics'
      }
    }))

    const getOverviewData = async (): Promise<void> => {
      try {
        const { method, url } = getOrganizerEventStatisticsEndpoint({ username: authStore.userData.username, eventId: route.params.eventId as string ?? '' })

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          }
        }).json<GetOrganizerEventStatisticsReply>()

        overviewResponse.value = response
      } catch (error) {
        // @ts-expect-error error is unknown
        const resp = error?.response

        if (resp.status == null) {
          router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
          return
        }

        if (resp.status === 401) {
          router.push({ name: 'Signin' })
          return
        }

        if (resp.status === 403) {
          router.push({ name: 'Home' })
          return
        }

        router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
      }
    }

    const getUserMaps = async (): Promise<void> => {
      try {
        const { method, url } = getOrganizerEventUsersMapEndpoint({ username: authStore.userData.username, eventId: route.params.eventId as string ?? '' })

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          }
        }).json<GetOrganizerEventUsersMapReply>()

        usersMapOverviewResponse.value = response
      } catch (error) {
        // @ts-expect-error error is unknown
        const resp = error?.response

        if (resp.status == null) {
          router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
          return
        }

        if (resp.status === 401) {
          router.push({ name: 'Signin' })
          return
        }

        if (resp.status === 403) {
          router.push({ name: 'Home' })
          return
        }

        router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
      }
    }

    const createWorldMap = (): void => {
      svg.value = d3.select('div#organizer-world-map')
        .append('svg')
        .attr('id', 'organizer-world-map-svg')
        .attr('viewBox', `0 0 ${width} ${height}`)

      // @ts-expect-error from how json calculates their type
      land.value = topojson.feature(countriesJson, countriesJson.objects.countries)
      updateWorldMap()
    }

    const updateWorldMap = (): void => {
      svg.value.selectAll('path.world-map-path')
        .data(land.value.features)
        .join('path')
        .attr('d', path.value)
        .attr('class', 'world-map-path')
        .attr('stroke', '#ddd')
        .attr('stroke-width', '0.5px')
        .attr('fill', (d) => {
          const alpha2 = i18nCountries.numericToAlpha2(d.id ?? '')

          if (alpha2 == null || alpha2 === '') {
            return '#222'
          }

          const countriesToMap = usersMapOverviewResponse.value.users.find(u => u.country === alpha2)
          if (countriesToMap == null) {
            return '#222'
          }

          return '#d5a755'
        })
    }

    onMounted(async () => {
      await Promise.all([
        getOverviewData(),
        getUserMaps()
      ])

      createWorldMap()
    })

    return {
      createWorldMap,
      d3,
      i18nCountries,
      getUserMaps,
      overviewResponse,
      usersMapOverviewResponse
    }
  }
})
</script>
