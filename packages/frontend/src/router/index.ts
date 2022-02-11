import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import * as Page from '@/views'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Page.Home
  },
  {
    path: '/event',
    name: 'Event',
    component: Page.Event
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
            component: Page.DevtoolEvents
          },
          {
            path: 'users',
            component: Page.DevtoolUsers
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
    path: '/users',
    name: 'Users',
    component: Page.Users
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
