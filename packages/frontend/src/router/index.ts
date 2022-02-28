import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router'

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
    path: '/select-seat',
    name: 'Select Seat',
    component: Page.SelectSeat
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Page.Payment
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
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: Page.NotFound
  }
]

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => {
    return { top: 0 }
  }
})

export default router
