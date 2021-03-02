// imports
import axios from 'axios'
import authConfig from '@/common/connection'

// config
const url = '/games'

// main
const best = (level) => axios.get(`${url}/best/${level}`, authConfig())
const post = (create) => axios.post(url, create, authConfig())

// exports
const service = { post, best }
export default service
