import axios from 'axios'
import authConfig from '@/common/connection'

// config
const url = '/users'

// main
const me = () => axios.get(`${url}/me`, authConfig())

// exports
const service = { me }
export default service
