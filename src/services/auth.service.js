// imports
import axios from 'axios'
import store from '../store'

// config
const url = '/auth'

// main
const login = (credentials) => axios.get(`${url}/login`, credentials)

const authConfig = () => ({
	headers: {
		Authorization: `Bearer ${store.getters.StateUser}`,
	},
})

// exports
const service = { login, authConfig }
export default service
