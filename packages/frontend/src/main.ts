import { createPinia } from 'pinia'
import { createApp } from 'vue'
// @ts-expect-error
import VueMdi from 'vue-mdijs'
import { createMetaManager } from 'vue-meta'
import Toast, { PluginOptions as ToastOptions, POSITION } from 'vue-toastification'

import * as mdi from '@mdi/js'

import App from './App.vue'
import Router from './router'

import 'vue-toastification/dist/index.css'
import './globals.scss'

VueMdi.add(mdi)

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
