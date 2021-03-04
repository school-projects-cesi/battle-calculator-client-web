// imports
import { createApp } from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

import background from '@/common/plugins/background'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import configureAxios from '@/common/http-common'

import '@/assets/styles/app.scss'

// config
configureAxios()

const alertOptions = {
	toast: true,
	position: 'top-end',
	timer: 4000,
	showConfirmButton: false,
}

// main
createApp(App)
	.use(store)
	.use(router)
	.use(VueSweetalert2, alertOptions)
	.use(background)
	.mount('#app')
