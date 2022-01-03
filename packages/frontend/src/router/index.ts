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
    path: '/login',
    name: 'Login',
    component: Page.Login
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
        component: Page.DeveloperTools
      }
    ]
  },
  {
    path: '/receipt',
    name: 'Receipt',
    component: Page.Receipt
  },
  {
    path: '/create-event',
    name: 'Create Event',
    component: Page.CreateEvent
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
