// imports
import axios from 'axios'
import authConfig from '@/common/connection'

// config
const url = '/games'

// main
const get = (id) => axios.get(`${url}/${id}`, authConfig())
const best = (level) => axios.get(`${url}/best/${level}`, authConfig())
const post = (create) => axios.post(url, create, authConfig())

// exports
const service = { get, post, best }
export default service
