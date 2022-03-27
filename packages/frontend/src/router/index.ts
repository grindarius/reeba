import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import * as Page from '@/views'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Page.Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Page.Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Page.Signin
  },
  {
    path: '/account',
    name: 'Account',
    component: Page.Account,
    children: [
      {
        path: '',
        component: Page.MyTickets
      },
      {
        path: 'purchase-history',
        component: Page.PurchaseHistory
      },
      {
        path: 'edit',
        component: Page.EditUserSettings
      },
      {
        path: 'organizer',
        component: Page.OrganizerTools
      },
      {
        path: 'developer',
        component: Page.DeveloperTools,
        children: [
          {
            path: '',
            component: Page.DevtoolSummary
          },
          {
            path: 'users',
            component: Page.DevtoolUsers
          },
          {
            path: 'events',
            component: Page.DevtoolEvents
          },
          {
            path: 'transactions',
            component: Page.DevtoolTransactions
          }
        ]
      }
    ]
  },
  {
    path: '/receipt',
    name: 'Receipt',
    component: Page.Receipt
  },
  {
    path: '/create',
    name: 'Create Event',
    component: Page.CreateEvent
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Page.Upload
  },
  {
    path: '/search',
    name: 'Search',
    component: Page.SearchResult
  },
  {
    path: '/:username',
    name: 'Users',
    component: Page.Users
  },
  {
    path: '/:username/:eventId',
    name: 'Event',
    component: Page.Event
  },
  {
    path: '/:username/:eventId/:datetimeId',
    name: 'Select Seat',
    component: Page.SelectSeat
  },
  {
    path: '/:username/:eventId/:datetimeId/payment',
    name: 'Payment',
    component: Page.Payment
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: Page.NotFound
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
