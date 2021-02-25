// imports
import axios from 'axios'
import authService from './auth.service'

// config
const url = '/games'

// main
const best = (level) => axios.get(`${url}/best/${level}`, authService.authConfig())

// exports
const service = { best }
export default service
