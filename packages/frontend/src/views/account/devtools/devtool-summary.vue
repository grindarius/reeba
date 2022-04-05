<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <div class="container mx-auto">
    <h1 class="text-4xl font-semibold text-white mb-4">
      Statistics summary
    </h1>
    <div class="w-full flex flex-row justify-center">
      <div class="stats stats-vertical lg:stats-horizontal shadow bg-base-300">
        <div class="stat">
          <div class="stat-figure text-primary">
            <v-mdi name="mdi-account-group" size="30" fill="#D5A755" />
          </div>
          <div class="stat-title">
            Total users
          </div>
          <router-link custom :to="{ name: 'Developer Users' }" v-slot="{ navigate }">
            <div class="stat-value text-primary cursor-pointer" :title="summaryResponse.totalUsers.toString() || '0'" @click="navigate">
              {{ numberFormat.format(summaryResponse.totalUsers) }}
            </div>
          </router-link>
          <div class="stat-desc">
            users
          </div>
        </div>
        <div class="stat">
          <div class="stat-figure text-primary">
            <v-mdi name="mdi-calendar" size="30" fill="#D5A755" />
          </div>
          <div class="stat-title">
            Total events
          </div>
          <router-link custom :to="{ name: 'Developer Events' }" v-slot="{ navigate }">
            <div class="stat-value text-primary cursor-pointer" :title="summaryResponse.totalEvents.toString() || '0'" @click="navigate">
              {{ numberFormat.format(summaryResponse.totalEvents) }}
            </div>
          </router-link>
          <div class="stat-desc">
            events
          </div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">
            New users this month ({{ startOfNow }} - {{ now }})
          </div>
          <div class="stat-value text-primary" :title="summaryResponse.newUsersThisMonth.toString() || '0'">
            {{ numberFormat.format(summaryResponse.newUsersThisMonth) }}
          </div>
          <div class="stat-desc" :title="`last month: ${summaryResponse.newUsersPastMonth}`">
            {{ d3.format('+0.4')(summaryResponse.newUsersPercentageDifferenceToLastMonth) }}% from last month
          </div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">
            New events this month ({{ startOfNow }} - {{ now }})
          </div>
          <div class="stat-value text-primary" :title="summaryResponse.newEventsThisMonth.toString() || '0'">
            {{ numberFormat.format(summaryResponse.newEventsThisMonth) }}
          </div>
          <div class="stat-desc" :title="`last month: ${summaryResponse.newEventsPastMonth}`">
            {{ d3.format('+0.4')(summaryResponse.newEventsPercentageDifferenceToLastMonth) }}% from last month
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-3 mt-8">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost">{{ selectedChartType }}</label>
        <ul tabindex="0" class="p-2 w-52 text-white shadow dropdown-content menu bg-base-200 rounded-box">
          <li>
            <a @click="selectedChartType = 'users'">Users</a>
          </li>
          <li>
            <a @click="selectedChartType = 'events'">Events</a>
          </li>
        </ul>
      </div>
      <h1 class="page-header">
        origin map between
      </h1>
      <input type="date" class="input" v-model="worldMapStartDate">
      <input type="date" class="input" v-model="worldMapEndDate">
    </div>
    <div id="world-map-tooltip" />
    <div id="world-map" ref="worldMapRef" />
    <h1 class="mt-8 page-header">
      Transaction amount past 6 months (THB)
    </h1>
    <div id="transaction-bar-chart" />
    <h1 class="mt-8 page-header">
      Registration amount past 6 months (people)
    </h1>
    <div id="registration-bar-chart" />
    <h1 class="mt-8 page-header">
      Popular events this month
    </h1>
    <div id="pie-chart" class="max-w-4xl" />
  </div>
</template>

<script lang="ts">
import { countries } from 'countries-list'
import * as d3 from 'd3'
import dayjs from 'dayjs'
import { FeatureCollection, Geometry } from 'geojson'
import i18nCountries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'
import ky from 'ky'
import * as topojson from 'topojson-client'
import { GeometryCollection, Topology } from 'topojson-specification'
import { computed, defineComponent, onMounted, Ref, ref, watch } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'

import {
  AdminGetMapsDataReply,
  AdminGetRegistrationSummaryReply,
  AdminGetStatisticsSummaryReply,
  AdminGetSummaryDataGroupByOption,
  AdminGetTopEventTagsOfAllTimeReply,
  AdminGetTransactionSummaryReply
} from '@reeba/common'

import {
  adminGetMapsData,
  adminGetRegistrationSummary,
  adminGetStatisticsSummary,
  adminGetTopEventTagsOfAllTime,
  adminGetTransactionSummary
} from '@/api/endpoints'
import countriesJson from '@/assets/world-topo.json'
import { devtoolsEventsObject, devtoolsUsersObject, popularEventTypes, registrationsPastSixMonths, transactionsPastSixMonths } from '@/constants'
import { useAuthStore } from '@/store/use-auth-store'

i18nCountries.registerLocale(en)

export default defineComponent({
  name: 'devtool-summary',
  setup () {
    const width = 800
    const height = 600
    const colorRange: [string, string] = ['#222', '#D5A755']

    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()

    const numberFormat = ref(Intl.NumberFormat('en', { notation: 'compact' }))

    const worldMapStartDate = ref(dayjs().subtract(1, 'week').startOf('day').format('YYYY-MM-DD'))
    const worldMapEndDate = ref(dayjs().startOf('day').format('YYYY-MM-DD'))

    const transactionsChartStartDate = ref(dayjs().subtract(1, 'week').startOf('day').format('YYYY-MM-DD'))
    const transactionsChartEndDate = ref(dayjs().startOf('day').format('YYYY-MM-DD'))
    const transactionsChartGroupBy = ref<AdminGetSummaryDataGroupByOption>('day')

    const registrationChartStartDate = ref(dayjs().subtract(1, 'week').startOf('day').format('YYYY-MM-DD'))
    const registrationChartEndDate = ref(dayjs().startOf('day').format('YYYY-MM-DD'))
    const registrationChartGroupBy = ref<AdminGetSummaryDataGroupByOption>('day')

    const now = computed(() => {
      return dayjs().format('D MMM')
    })

    const startOfNow = computed(() => {
      return dayjs().startOf('month').format('D MMM')
    })

    const summaryResponse: Ref<AdminGetStatisticsSummaryReply> = ref({
      totalUsers: 0,
      newUsersThisMonth: 0,
      newUsersPastMonth: 0,
      newUsersPercentageDifferenceToLastMonth: 0,
      totalEvents: 0,
      newEventsThisMonth: 0,
      newEventsPastMonth: 0,
      newEventsPercentageDifferenceToLastMonth: 0
    })

    const worldMapResponse: Ref<AdminGetMapsDataReply> = ref({
      users: [],
      events: []
    })

    const transactionsSummaryResponse: Ref<AdminGetTransactionSummaryReply> = ref({
      transactions: []
    })

    const registrationsSummaryResponse: Ref<AdminGetRegistrationSummaryReply> = ref({
      registrations: []
    })

    const topEventTagsOfAllTimeResponse: Ref<AdminGetTopEventTagsOfAllTimeReply> = ref({
      tags: []
    })

    const selectedChartType = ref('users')

    useMeta({
      title: 'Developer tools: Summary'
    })

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

    const getStatisticsSummary = async (): Promise<void> => {
      try {
        const { method, url } = adminGetStatisticsSummary

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          }
        }).json<AdminGetStatisticsSummaryReply>()

        summaryResponse.value = response
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

    const getWorldMapData = async (): Promise<void> => {
      try {
        const { method, url } = adminGetMapsData

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          searchParams: [
            ['start', dayjs(worldMapStartDate.value).toISOString()],
            ['end', dayjs(worldMapEndDate.value).toISOString()],
            ['group', 'day']
          ]
        }).json<AdminGetMapsDataReply>()

        worldMapResponse.value = response
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

    const getTransactionsData = async (): Promise<void> => {
      try {
        const { method, url } = adminGetTransactionSummary

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          searchParams: [
            ['start', dayjs(transactionsChartStartDate.value).toISOString()],
            ['end', dayjs(transactionsChartEndDate.value).toISOString()],
            ['group', 'day']
          ]
        }).json<AdminGetTransactionSummaryReply>()

        transactionsSummaryResponse.value = response
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

    const getRegistrationsData = async (): Promise<void> => {
      try {
        const { method, url } = adminGetRegistrationSummary

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          searchParams: [
            ['start', dayjs(registrationChartStartDate.value).toISOString()],
            ['end', dayjs(registrationChartEndDate.value).toISOString()],
            ['group', registrationChartGroupBy.value]
          ]
        }).json<AdminGetRegistrationSummaryReply>()

        registrationsSummaryResponse.value = response
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

    const getTopEventTagsOfAllTime = async (): Promise<void> => {
      try {
        const { method, url } = adminGetTopEventTagsOfAllTime

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          searchParams: [
            ['top', 10]
          ]
        }).json<AdminGetTopEventTagsOfAllTimeReply>()

        topEventTagsOfAllTimeResponse.value = response
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
      svg.value = d3.select('div#world-map')
        .append('svg')
        .attr('id', 'world-map-svg')
        .attr('viewBox', `0 0 ${width} ${height}`)

      tooltip.value = d3.select('div#world-map-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')

      // @ts-expect-error from how json calculates their type
      land.value = topojson.feature(countriesJson as Topology, countriesJson.objects.countries as GeometryCollection<{ name: string }>)
      updateWorldMap()
    }

    const updateWorldMap = (): void => {
      svg.value.selectAll('svg#world-map-svg')
        .data(land.value.features)
        .join('path')
        .attr('d', path.value)
        .attr('stroke', '#ddd')
        .attr('stroke-width', '0.5px')
        .attr('fill', (d) => {
          if (selectedChartType.value === 'users') {
            // * d.id is iso-3166 numeric
            return colorUsers.value(countries[i18nCountries.numericToAlpha2(d.id ?? '') as keyof typeof countries] == null ? 0 : devtoolsUsersObject[i18nCountries.numericToAlpha2(d.id ?? '') ?? ''] ?? 0)
          }

          return colorEvents.value(countries[i18nCountries.numericToAlpha2(d.id ?? '') as keyof typeof countries] == null ? 0 : devtoolsEventsObject[i18nCountries.numericToAlpha2(d.id ?? '') ?? ''] ?? 0)
        })
        .on('mouseover', () => {
          tooltip.value.style('visibility', 'visible')
        })
        .on('mousemove', (event, d) => {
          const xy = d3.pointer(event, d3.select('svg#world-map-svg'))
          const alpha2Key = i18nCountries.numericToAlpha2(d.id ?? '')

          const usersHTMLString = `
            <div class="py-1 px-4 h-16 rounded-lg bg-pale-yellow">
              <h3 class="font-mono">${countries[alpha2Key as keyof typeof countries].name ?? 'No data'}</h3>
              <h3 :style="{ visibility: countries[alpha2Key as keyof typeof countries].name == null ? 'hidden' : 'visible' }" class="font-mono text-xl">${devtoolsUsersObject[alpha2Key] == null ? 'No data' : devtoolsUsersObject[alpha2Key] + ' users'}</h3>
            </div>
          `

          const eventsHTMLString = `
            <div class="py-1 px-4 h-16 rounded-lg bg-pale-yellow">
              <h3 class="font-mono">${countries[alpha2Key as keyof typeof countries].name ?? 'No data'}</h3>
              <h3 :style="{ visibility: countries[alpha2Key as keyof typeof countries].name == null ? 'hidden' : 'visible' }" class="font-mono text-xl">${devtoolsEventsObject[alpha2Key] == null ? 'No data' : devtoolsEventsObject[alpha2Key] + ' events'}</h3>
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

    const piesvg = ref() as Ref<d3.Selection<SVGGElement, unknown, HTMLElement, unknown>>

    const pieWidth = 350
    const pieHeight = 350
    const pieMargin = 30
    const radius = Math.min(pieWidth, pieHeight) / 2 - pieMargin

    const pieColor = computed(() => {
      return d3.scaleSequential(d3.interpolateInferno)
        .domain([0, Math.max(...Object.values(popularEventTypes))])
    })

    const createPieChart = (): void => {
      d3.select('svg#pie-chart-svg').remove()

      piesvg.value = d3.select('div#pie-chart')
        .append('svg')
        .attr('id', 'pie-chart-svg')
        .attr('viewBox', `0 0 ${pieWidth} ${pieHeight}`)
        .append('g')
        .attr('transform', `translate(${pieWidth / 2}, ${pieHeight / 2.8})`)

      const pie = d3.pie<Array<[string, number]>, [string, number]>().sort(null).value(d => d[1])
      // @ts-expect-error missing generics
      const loadedPie = pie(Object.entries(popularEventTypes))
      const arc = d3.arc<d3.PieArcDatum<[string, number]>>().innerRadius(radius * 0.4).outerRadius(radius * 0.6)
      const outerArc = d3.arc().innerRadius(radius * 0.7).outerRadius(radius * 0.7)

      piesvg.value
        .selectAll('allSlices')
        .data(loadedPie)
        .join('path')
        // eslint-disable-next-line
        .attr('d', arc as unknown as any)
        .attr('fill', d => pieColor.value(d.data[1]))
        .attr('stroke', 'white')
        .style('stroke-width', '0.5px')
        .style('opacity', 0.7)

      piesvg.value
        .selectAll('allPolylines')
        .data(loadedPie)
        .join('polyline')
        .attr('stroke', 'white')
        .style('fill', 'none')
        .attr('stroke-width', '0.5px')
        // @ts-expect-error type error
        .attr('points', (d) => {
          const posA = arc.centroid(d)
          // @ts-expect-error type error
          const posB = outerArc.centroid(d)
          // @ts-expect-error type error
          const posC = outerArc.centroid(d)
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          posC[0] = radius * 0.66 * (midangle < Math.PI ? 1 : -1)
          return [posA, posB, posC]
        })

      piesvg.value
        .selectAll('allLabels')
        .data(loadedPie)
        .join('text')
        .text(d => `${d.data[0]} (${d.data[1]})`)
        .attr('transform', function (d) {
        // @ts-expect-error type error
          const pos = outerArc.centroid(d)
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          pos[0] = radius * 0.7 * (midangle < Math.PI ? 1 : -1)
          return `translate(${pos})`
        })
        .style('text-anchor', function (d) {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          return (midangle < Math.PI ? 'start' : 'end')
        })
        .style('fill', '#fff')
        .style('font-size', '8px')
    }

    const createTransactionsHistoryChart = (): void => {
      d3.select('svg#transaction-bar-chart-svg').remove()

      const margins = {
        top: 30,
        right: 30,
        bottom: 50,
        left: 80
      }
      const width = 1000 - margins.left - margins.right
      const height = 500 - margins.top - margins.bottom

      const color = d3.scaleLinear([0, Math.max(...Object.values(transactionsPastSixMonths))], colorRange)

      const svg = d3.select('div#transaction-bar-chart')
        .append('svg')
        .attr('id', 'transaction-bar-chart-svg')
        .attr('preserveAspectRatio', 'xMidYMin slice')
        .attr('viewBox', `0 0 ${width + margins.left + margins.right} ${height + margins.top + margins.bottom}`)
        .append('g')
        .attr('transform', `translate(${margins.left}, ${margins.top})`)

      const x = d3.scaleBand().range([0, width]).domain(Object.keys(transactionsPastSixMonths).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())).padding(0.5)

      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .classed('x-axis', true)
        .call(d3.axisBottom(x))

      const y = d3.scaleLinear([0, Math.max(...Object.values(transactionsPastSixMonths))], [height, 0])
      svg.append('g')
        .classed('y-axis', true)
        .call(d3.axisLeft(y))

      svg.selectAll('svg#transaction-bar-chart-svg')
        .data(Object.entries(transactionsPastSixMonths).map((a) => { return { time: a[0], money: a[1] } }).sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()))
        .join('rect')
        .attr('x', d => x(d.time) ?? 0)
        .attr('y', d => y(d.money))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.money))
        .attr('fill', d => color(d.money))
    }

    const createRegistrationHistoryChart = (): void => {
      d3.select('svg#registration-bar-chart-svg').remove()

      const margins = {
        top: 30,
        right: 30,
        bottom: 50,
        left: 80
      }
      const width = 1000 - margins.left - margins.right
      const height = 500 - margins.top - margins.bottom

      const color = d3.scaleLinear([0, Math.max(...Object.values(registrationsPastSixMonths))], colorRange)

      const svg = d3.select('div#registration-bar-chart')
        .append('svg')
        .attr('id', 'registration-bar-chart-svg')
        .attr('preserveAspectRatio', 'xMidYMin slice')
        .attr('viewBox', `0 0 ${width + margins.left + margins.right} ${height + margins.top + margins.bottom}`)
        .append('g')
        .attr('transform', `translate(${margins.left}, ${margins.top})`)

      const x = d3.scaleBand().range([0, width]).domain(Object.keys(registrationsPastSixMonths).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())).padding(0.5)

      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .classed('x-axis', true)
        .call(d3.axisBottom(x))

      const y = d3.scaleLinear([0, Math.max(...Object.values(registrationsPastSixMonths))], [height, 0])
      svg.append('g')
        .classed('y-axis', true)
        .call(d3.axisLeft(y))

      svg.selectAll('svg#registration-bar-chart-svg')
        .data(Object.entries(registrationsPastSixMonths).map((a) => { return { time: a[0], money: a[1] } }).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()))
        .join('rect')
        .attr('x', d => x(d.time) ?? 0)
        .attr('y', d => y(d.money))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.money))
        .attr('fill', d => color(d.money))
    }

    onMounted(async () => {
      await Promise.all([
        getStatisticsSummary(),
        getWorldMapData(),
        getTransactionsData(),
        getRegistrationsData(),
        getTopEventTagsOfAllTime()
      ])

      createWorldMap()
      createPieChart()
      createTransactionsHistoryChart()
      createRegistrationHistoryChart()
    })

    watch(selectedChartType, () => {
      updateWorldMap()
    })

    return {
      worldMapRef,
      d3,
      now,
      startOfNow,
      selectedChartType,
      numberFormat,
      summaryResponse,
      worldMapStartDate,
      worldMapEndDate,
      transactionsChartStartDate,
      transactionsSummaryResponse,
      transactionsChartEndDate,
      transactionsChartGroupBy,
      registrationChartStartDate,
      registrationChartEndDate,
      registrationChartGroupBy,
      registrationsSummaryResponse
    }
  }
})
</script>

<style scoped lang="scss">
.page-header {
  @apply text-4xl font-semibold text-white;
}
</style>
