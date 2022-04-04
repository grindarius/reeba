import { createPinia } from 'pinia'
import { createApp } from 'vue'
// @ts-expect-error
import VueMdi from 'vue-mdijs'
import { createMetaManager } from 'vue-meta'
import Toast, { PluginOptions as ToastOptions, POSITION } from 'vue-toastification'

import {
  mdiAccountGroup,
  mdiAccountMultiplePlus,
  mdiAlarm,
  mdiArrowDownThin,
  mdiArrowLeftThin,
  mdiArrowRightThin,
  mdiArrowUpThin,
  mdiCalendar,
  mdiCalendarBlank,
  mdiCheck,
  mdiCheckDecagram,
  mdiClose,
  mdiCreditCard,
  mdiCrown,
  mdiCurrencyUsd,
  mdiDelete,
  mdiDeleteSweep,
  mdiEmailPlus,
  mdiFacebook,
  mdiGoogle,
  mdiInformationOutline,
  mdiInstagram,
  mdiMapMarkerAccount,
  mdiMenuOpen,
  mdiMinusCircle,
  mdiPlusCircle,
  mdiPlusCircleOutline,
  mdiQrcodeScan,
  mdiTicketOutline,
  mdiTwitter,
  mdiWeb
} from '@mdi/js'

import App from './App.vue'
import Router from './router'

import 'vue-toastification/dist/index.css'
import './globals.scss'

VueMdi.add({
  mdiAccountGroup,
  mdiAccountMultiplePlus,
  mdiAlarm,
  mdiArrowDownThin,
  mdiArrowLeftThin,
  mdiArrowRightThin,
  mdiArrowUpThin,
  mdiCalendar,
  mdiCalendarBlank,
  mdiCheck,
  mdiCheckDecagram,
  mdiClose,
  mdiCreditCard,
  mdiCrown,
  mdiCurrencyUsd,
  mdiDelete,
  mdiDeleteSweep,
  mdiEmailPlus,
  mdiFacebook,
  mdiGoogle,
  mdiInformationOutline,
  mdiInstagram,
  mdiMapMarkerAccount,
  mdiMenuOpen,
  mdiMinusCircle,
  mdiPlusCircle,
  mdiPlusCircleOutline,
  mdiQrcodeScan,
  mdiTicketOutline,
  mdiTwitter,
  mdiWeb
})

const options: ToastOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 2000
}

const app = createApp(App)
app.use(Router)
app.use(createMetaManager())
app.use(VueMdi)
app.use(Toast, options)
app.use(createPinia())

// eslint-disable-next-line
Router.isReady().then(() => {
  app.mount('#app')
})
