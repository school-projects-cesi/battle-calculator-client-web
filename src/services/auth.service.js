// imports
import axios from 'axios'

// config
const url = '/auth'

// main
const register = (credentials) => axios.post(`${url}/register`, credentials)
const login = (credentials) => axios.post(`${url}/login`, credentials)

// exports
const service = { login, register }
export default service
