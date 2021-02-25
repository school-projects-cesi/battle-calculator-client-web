// imports
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import configureAxios from './common/http-common'
import './assets/styles/app.scss'

// config
configureAxios()

// main
createApp(App).use(store).use(router).mount('#app')
