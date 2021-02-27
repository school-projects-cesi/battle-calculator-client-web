// imports
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import AppPaths from '@/router/paths'

// main
const configureAxios = () => {
	axios.defaults.baseURL = '/api'
	axios.defaults.headers = {
		'Content-type': 'application/json',
	}
	axios.defaults.responseType = 'json'
	// axios.defaults.withCredentials = true

	// interceptors
	const responseInterceptor = [
		undefined,
		(error) => {
			if (error) {
				const originalRequest = error.config
				if (error.response.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true
					store.dispatch('LogOut')
					return router.push(AppPaths.LOGIN)
				}
			}
			throw error
		},
	]

	axios.defaults.interceptors = {
		response: responseInterceptor,
	}
	axios.interceptors.response.use(...responseInterceptor)
}

// exports
export default configureAxios
