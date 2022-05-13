<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <div class="container mx-auto">
    <h1 class="mb-4 text-4xl font-semibold text-white">
      Statistics summary
    </h1>
    <div class="flex flex-row justify-center w-full">
      <div class="shadow stats stats-vertical bg-base-300 lg:stats-horizontal">
        <div class="stat">
          <div class="stat-figure text-primary">
            <v-mdi name="mdi-account-group" size="30" fill="#D5A755" />
          </div>
          <div class="stat-title">
            Total users
          </div>
          <router-link custom :to="{ name: 'Developer Users' }" v-slot="{ navigate }">
            <div class="cursor-pointer stat-value text-primary" :title="summaryResponse.totalUsers.toString() || '0'" @click="navigate">
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
            <div class="cursor-pointer stat-value text-primary" :title="summaryResponse.totalEvents.toString() || '0'" @click="navigate">
              {{ numberFormat.format(summaryResponse.totalEvents) }}
            </div>
          </router-link>
          <div class="stat-desc">
            events
          </div>
        </div>
        <div class="place-items-center stat">
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
        <div class="place-items-center stat">
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
        <div class="place-items-center stat">
          <div class="stat-title">
            Total gross income (THB)
          </div>
          <div class="stat-value text-primary" :title="summaryResponse.totalGrossIncome.toString() || '0'">
            {{ numberFormat.format(summaryResponse.totalGrossIncome) }}
          </div>
          <div class="stat-desc">
            {{ 'Pure income: ' + d3.format(',')(summaryResponse.totalPureIncome) }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-3 mt-8">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost">{{ selectedChartType }}</label>
        <ul tabindex="0" class="p-2 w-52 text-white shadow dropdown-content menu bg-base-200 rounded-box">
          <li>
            <a @click="updateWorldMapSelector('users')">Users</a>
          </li>
          <li>
            <a @click="updateWorldMapSelector('events')">Events</a>
          </li>
        </ul>
      </div>
      <h1 class="text-4xl font-semibold text-white">
        origin map between
      </h1>
      <input type="date" class="input" v-model="worldMapStartDate">
      <input type="date" class="input" v-model="worldMapEndDate">
    </div>
    <div id="world-map-tooltip" />
    <div id="world-map" ref="worldMapRef" />
    <div class="overflow-x-auto mt-8">
      <table class="table w-full table-compact" v-show="worldMapResponse[selectedChartType].length !== 0">
        <thead>
          <tr>
            <th>Country</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="selectedChartType === 'users'" v-for="(u, i) in worldMapResponse.users" :key="`world-map-users-table-${i}`">
            <th>
              {{ getCountryName(u.country) }} ({{ u.country }})
            </th>
            <td>
              {{ u.amount }}
            </td>
          </tr>
          <tr v-show="selectedChartType === 'events'" v-for="(e, i) in worldMapResponse.events" :key="`world-map-events-table-${i}`">
            <th>
              {{ getCountryName(e.country) }} ({{ e.country }})
            </th>
            <td>
              {{ e.amount }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-row gap-2 mt-8">
      <h1 class="text-4xl font-semibold text-white">
        Transactions amount between
      </h1>
      <input type="date" class="input" v-model="transactionsChartStartDate">
      <input type="date" class="input" v-model="transactionsChartEndDate">
      <h1 class="text-4xl font-semibold text-white">
        group by
      </h1>
      <div class="dropdown">
        <label tabindex="0" class="m-1 btn btn-ghost">{{ transactionsChartGroupBy }}</label>
        <ul tabindex="0" class="p-2 w-52 shadow dropdown-content menu bg-base-200 rounded-box">
          <li @click="transactionsChartGroupBy = 'day'">
            <a>Day</a>
          </li>
          <li @click="transactionsChartGroupBy = 'month'">
            <a>Month</a>
          </li>
        </ul>
      </div>
    </div>
    <div id="transaction-bar-chart" class="overflow-x-auto" />
    <div class="flex flex-row gap-2 mt-8">
      <h1 class="text-4xl font-semibold text-white">
        Registration amount between
      </h1>
      <input type="date" class="input" v-model="registrationChartStartDate">
      <input type="date" class="input" v-model="registrationChartEndDate">
      <h1 class="text-4xl font-semibold text-white">
        group by
      </h1>
      <div class="dropdown">
        <label tabindex="0" class="m-1 btn btn-ghost">{{ registrationChartGroupBy }}</label>
        <ul tabindex="0" class="p-2 w-52 shadow dropdown-content menu bg-base-200 rounded-box">
          <li @click="registrationChartGroupBy = 'day'">
            <a>Day</a>
          </li>
          <li @click="registrationChartGroupBy = 'month'">
            <a>Month</a>
          </li>
        </ul>
      </div>
    </div>
    <div id="registration-bar-chart" class="overflow-x-auto" />
    <h1 class="text-4xl font-semibold text-white">
      Tags and their event amount
    </h1>
    <table class="table mt-4 w-full table-compact">
      <thead>
        <tr>
          <th>Tag</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(t, i) in topEventTagsOfAllTimeResponse.tags" :key="`top-event-tags-table-${i}`">
          <th>
            {{ formatTagName(t.tag) }}
          </th>
          <td>
            {{ t.amount }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3'
import dayjs from 'dayjs'
import { FeatureCollection, Geometry } from 'geojson'
import i18nCountries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'
import ky from 'ky'
import * as topojson from 'topojson-client'
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
  adminGetMapsDataEndpoint,
  adminGetRegistrationSummaryEndpoint,
  adminGetStatisticsSummaryEndpoint,
  adminGetTopEventTagsOfAllTimeEndpoint,
  adminGetTransactionSummaryEndpoint
} from '@/api/endpoints'
import countriesJson from '@/assets/world-topo.json'
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
      newEventsPercentageDifferenceToLastMonth: 0,
      totalGrossIncome: 0,
      totalPureIncome: 0
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

    const selectedChartType: Ref<'users' | 'events'> = ref('users')

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
      return d3.scaleLinear([0, Math.max(...worldMapResponse.value.users.map(u => u.amount))], colorRange)
    })

    const colorEvents = computed(() => {
      return d3.scaleLinear([0, Number.isFinite(Math.max(...worldMapResponse.value.events.map(e => e.amount))) ? Math.max(...worldMapResponse.value.events.map(e => e.amount)) : 0], colorRange)
    })

    const getStatisticsSummary = async (): Promise<void> => {
      try {
        const { method, url } = adminGetStatisticsSummaryEndpoint

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
        const { method, url } = adminGetMapsDataEndpoint

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          searchParams: [
            ['start', dayjs(worldMapStartDate.value).toISOString()],
            ['end', dayjs(worldMapEndDate.value).toISOString()]
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
        const { method, url } = adminGetTransactionSummaryEndpoint

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          searchParams: [
            ['start', dayjs(transactionsChartStartDate.value).startOf(transactionsChartGroupBy.value).toISOString()],
            ['end', dayjs(transactionsChartEndDate.value).startOf(transactionsChartGroupBy.value).toISOString()],
            ['group', transactionsChartGroupBy.value]
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
        const { method, url } = adminGetRegistrationSummaryEndpoint

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          searchParams: [
            ['start', dayjs(registrationChartStartDate.value).startOf(registrationChartGroupBy.value).toISOString()],
            ['end', dayjs(registrationChartEndDate.value).startOf(registrationChartGroupBy.value).toISOString()],
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
        const { method, url } = adminGetTopEventTagsOfAllTimeEndpoint

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
          if (selectedChartType.value === 'users') {
            // * d.id is iso-3166 numeric
            const alpha2 = i18nCountries.numericToAlpha2(d.id ?? '')

            if (alpha2 == null || alpha2 === '') {
              return colorUsers.value(0)
            }

            const countryInResponse = worldMapResponse.value.users.find(u => u.country === alpha2)

            if (countryInResponse == null) {
              return colorUsers.value(0)
            }

            return colorUsers.value(countryInResponse.amount)
          }

          if (selectedChartType.value === 'events') {
            const alpha2 = i18nCountries.numericToAlpha2(d.id ?? '')

            if (alpha2 == null || alpha2 === '') {
              return colorEvents.value(0)
            }

            const countryInResponse = worldMapResponse.value.events.find(e => e.country === alpha2)

            if (countryInResponse == null) {
              return colorEvents.value(0)
            }

            return colorEvents.value(countryInResponse.amount)
          }

          return colorUsers.value(0)
        })
        .on('mouseover', () => {
          tooltip.value.style('visibility', 'visible')
        })
        .on('mousemove', (event, d) => {
          const xy = d3.pointer(event, d3.select('svg#world-map-svg'))
          const alpha2 = i18nCountries.numericToAlpha2(d.id ?? '')

          const tooltipTemplate = `
            <div class="py-1 px-4 h-16 rounded-lg bg-base-300">
              <h3 class="font-mono text-white opacity-70">$1</h3>
              <h3 class="font-mono text-xl text-white opacity-70">$2</h3>
            </div>
          `

          if (alpha2 == null || alpha2 === '') {
            tooltip.value
              .style('top', `${xy[1] + 10}px`)
              .style('left', `${xy[0] + 10}px`)
              .html(tooltipTemplate.replace('$1', 'Unknown').replace('$2', 'No data'))
            return
          }

          if (selectedChartType.value === 'users') {
            const countryInResponse = worldMapResponse.value.users.find(u => u.country === alpha2)

            if (countryInResponse == null) {
              tooltip.value
                .style('top', `${xy[1] + 10}px`)
                .style('left', `${xy[0] + 10}px`)
                .html(tooltipTemplate.replace('$1', i18nCountries.getName(alpha2, 'en')).replace('$2', 'No data'))
              return
            }

            tooltip.value
              .style('top', `${xy[1] + 10}px`)
              .style('left', `${xy[0] + 10}px`)
              .html(tooltipTemplate.replace('$1', i18nCountries.getName(alpha2, 'en')).replace('$2', countryInResponse.amount.toString()))
            return
          }

          if (selectedChartType.value === 'events') {
            const countryInResponse = worldMapResponse.value.events.find(e => e.country === alpha2)

            if (countryInResponse == null) {
              tooltip.value
                .style('top', `${xy[1] + 10}px`)
                .style('left', `${xy[0] + 10}px`)
                .html(tooltipTemplate.replace('$1', i18nCountries.getName(alpha2, 'en')).replace('$2', 'No data'))
              return
            }

            tooltip.value
              .style('top', `${xy[1] + 10}px`)
              .style('left', `${xy[0] + 10}px`)
              .html(tooltipTemplate.replace('$1', i18nCountries.getName(alpha2, 'en')).replace('$2', countryInResponse.amount.toString()))
            return
          }

          tooltip.value
            .style('top', `${xy[1] + 10}px`)
            .style('left', `${xy[0] + 10}px`)
            .html(tooltipTemplate.replace('$1', 'Unknown').replace('$2', 'No data'))
        })
        .on('mouseleave', () => {
          tooltip.value.style('visibility', 'hidden')
        })
    }

    const barChartMargins = {
      top: 30,
      right: 30,
      bottom: 50,
      left: 80
    }

    const transactionChartWidth = 1530 - barChartMargins.left - barChartMargins.right
    const transactionChartHeight = 500 - barChartMargins.top - barChartMargins.bottom

    const transactionChartSVG = ref() as Ref<d3.Selection<SVGGElement, unknown, HTMLElement, unknown>>
    const transactionChartX = ref() as Ref<d3.ScaleBand<string>>
    const transactionChartY = ref() as Ref<d3.ScaleLinear<number, number, never>>
    const transactionChartXAxis = ref() as Ref<d3.Selection<SVGGElement, unknown, HTMLElement, unknown>>
    const transactionChartYAxis = ref() as Ref<d3.Selection<SVGGElement, unknown, HTMLElement, unknown>>

    const createTransactionChart = (): void => {
      transactionChartSVG.value = d3.select('div#transaction-bar-chart')
        .append('svg')
        .attr('id', 'transaction-bar-chart-svg')
        .attr('width', transactionChartWidth + barChartMargins.left + barChartMargins.right)
        .attr('height', transactionChartHeight + barChartMargins.top + barChartMargins.bottom)
        .append('g')
        .attr('transform', `translate(${barChartMargins.left}, ${barChartMargins.top})`)

      transactionChartX.value = d3.scaleBand()
        .range([0, transactionChartWidth]).domain(transactionsSummaryResponse.value.transactions.map(t => t.date)).padding(0.5)

      transactionChartY.value = d3.scaleLinear([0, Number.isFinite(Math.max(...transactionsSummaryResponse.value.transactions.map(t => t.amount))) ? Math.max(...transactionsSummaryResponse.value.transactions.map(t => t.amount)) : 0], [transactionChartHeight, 0])

      transactionChartXAxis.value = transactionChartSVG.value.append('g')
        .classed('transaction-chart-x-axis', true)
        .attr('transform', `translate(0, ${transactionChartHeight})`)
      transactionChartYAxis.value = transactionChartSVG.value.append('g')
        .classed('transaction-chart-x-axis', true)

      updateTransactionChart()
    }

    const updateTransactionChart = (): void => {
      transactionChartX.value.domain(transactionsSummaryResponse.value.transactions.map(t => t.date))
      transactionChartY.value.domain([0, Number.isFinite(Math.max(...transactionsSummaryResponse.value.transactions.map(t => t.amount))) ? Math.max(...transactionsSummaryResponse.value.transactions.map(t => t.amount)) : 0])

      transactionChartXAxis.value.call(d3.axisBottom(transactionChartX.value))
      transactionChartYAxis.value.call(d3.axisLeft(transactionChartY.value))

      transactionChartSVG.value.selectAll('rect.transaction-bar-chart')
        .data(transactionsSummaryResponse.value.transactions)
        .join('rect')
        .classed('transaction-bar-chart', true)
        .attr('x', d => transactionChartX.value(d.date) ?? 0)
        .attr('y', d => transactionChartY.value(d.amount))
        .attr('width', transactionChartX.value.bandwidth())
        .attr('height', d => transactionChartHeight - transactionChartY.value(d.amount))
        .attr('fill', () => '#d5a755')
    }

    const registrationChartWidth = 1530 - barChartMargins.left - barChartMargins.right
    const registrationChartHeight = 500 - barChartMargins.top - barChartMargins.bottom

    const registrationChartSVG = ref() as Ref<d3.Selection<SVGGElement, unknown, HTMLElement, unknown>>
    const registrationChartX = ref() as Ref<d3.ScaleBand<string>>
    const registrationChartY = ref() as Ref<d3.ScaleLinear<number, number, never>>
    const registrationChartXAxis = ref() as Ref<d3.Selection<SVGGElement, unknown, HTMLElement, unknown>>
    const registrationChartYAxis = ref() as Ref<d3.Selection<SVGGElement, unknown, HTMLElement, unknown>>

    const createRegistrationHistoryChart = (): void => {
      registrationChartSVG.value = d3.select('div#registration-bar-chart')
        .append('svg')
        .attr('id', 'registration-bar-chart-svg')
        .attr('width', registrationChartWidth + barChartMargins.left + barChartMargins.right)
        .attr('height', registrationChartHeight + barChartMargins.top + barChartMargins.bottom)
        .append('g')
        .attr('transform', `translate(${barChartMargins.left}, ${barChartMargins.top})`)

      registrationChartX.value = d3.scaleBand()
        .range([0, registrationChartWidth]).domain(registrationsSummaryResponse.value.registrations.map(r => r.date)).padding(0.5)

      registrationChartY.value = d3.scaleLinear([0, Number.isFinite(Math.max(...registrationsSummaryResponse.value.registrations.map(r => r.amount))) ? Math.max(...registrationsSummaryResponse.value.registrations.map(r => r.amount)) : 0], [registrationChartHeight, 0])

      registrationChartXAxis.value = registrationChartSVG.value.append('g')
        .classed('registration-chart-x-axis', true)
        .attr('transform', `translate(0, ${registrationChartHeight})`)
      registrationChartYAxis.value = registrationChartSVG.value.append('g')
        .classed('registration-chart-x-axis', true)

      updateRegistrationChart()
    }

    const updateRegistrationChart = (): void => {
      registrationChartX.value.domain(registrationsSummaryResponse.value.registrations.map(r => r.date))
      registrationChartY.value.domain([0, Number.isFinite(Math.max(...registrationsSummaryResponse.value.registrations.map(r => r.amount))) ? Math.max(...registrationsSummaryResponse.value.registrations.map(r => r.amount)) : 0])

      registrationChartXAxis.value.call(d3.axisBottom(registrationChartX.value))
      registrationChartYAxis.value.call(d3.axisLeft(registrationChartY.value))

      registrationChartSVG.value.selectAll('rect.registration-bar-chart')
        .data(registrationsSummaryResponse.value.registrations)
        .join('rect')
        .classed('registration-bar-chart', true)
        .attr('x', d => registrationChartX.value(d.date) ?? 0)
        .attr('y', d => registrationChartY.value(d.amount))
        .attr('width', registrationChartX.value.bandwidth())
        .attr('height', d => registrationChartHeight - registrationChartY.value(d.amount))
        .attr('fill', () => '#d5a755')
    }

    const updateWorldMapSelector = (type: 'users' | 'events'): void => {
      selectedChartType.value = type
      updateWorldMap()
    }

    const getCountryName = (name: string): string => {
      return i18nCountries.getName(name, 'en') ?? 'unknown'
    }

    watch([worldMapStartDate, worldMapEndDate], async () => {
      await getWorldMapData()
      updateWorldMap()
    })

    watch([transactionsChartStartDate, transactionsChartEndDate, transactionsChartGroupBy], async () => {
      await getTransactionsData()
      updateTransactionChart()
    })

    watch([registrationChartStartDate, registrationChartEndDate, registrationChartGroupBy], async () => {
      await getRegistrationsData()
      updateRegistrationChart()
    })

    onMounted(async () => {
      await Promise.all([
        getStatisticsSummary(),
        getWorldMapData(),
        getTransactionsData(),
        getRegistrationsData(),
        getTopEventTagsOfAllTime()
      ])

      createWorldMap()
      createTransactionChart()
      updateTransactionChart()
      createRegistrationHistoryChart()
    })

    const formatTagName = (tagKey: string): string => {
      const spaced = tagKey.replaceAll('-', ' ')
      return spaced.charAt(0).toUpperCase() + spaced.slice(1)
    }

    return {
      worldMapRef,
      d3,
      now,
      startOfNow,
      selectedChartType,
      numberFormat,
      summaryResponse,
      worldMapStartDate,
      topEventTagsOfAllTimeResponse,
      worldMapEndDate,
      transactionsChartStartDate,
      transactionsSummaryResponse,
      transactionsChartEndDate,
      transactionsChartGroupBy,
      registrationChartStartDate,
      registrationChartEndDate,
      worldMapResponse,
      getCountryName,
      updateWorldMapSelector,
      registrationChartGroupBy,
      registrationsSummaryResponse,
      formatTagName
    }
  }
})
</script>
