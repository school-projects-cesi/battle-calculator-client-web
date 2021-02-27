// imports
import axios from 'axios'
import authConfig from '@/common/connection'

// config
const url = '/games'

// main
const best = (level) => axios.get(`${url}/best/${level}`, authConfig())

// exports
const service = { best }
export default service
