// imports
import axios from 'axios'

// config
const url = '/auth'

// main
const register = (credentials) => axios.post(`${url}/register`, credentials)
const login = (credentials) => axios.post(`${url}/login`, credentials)
const checkUsername = (username) => axios.post(`${url}/check/username`, username)
const checkEmail = (email) => axios.post(`${url}/check/email`, email)

// exports
const service = { login, register, checkUsername, checkEmail }
export default service
