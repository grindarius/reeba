import { createPinia } from 'pinia'
import { createApp } from 'vue'
// @ts-expect-error
import VueMdi from 'vue-mdijs'

import * as mdi from '@mdi/js'

import App from './App.vue'
import Router from './router'

import './globals.scss'

VueMdi.add(mdi)

const app = createApp(App)
app.use(Router)
app.use(VueMdi)
app.use(createPinia())
app.mount('#app')
