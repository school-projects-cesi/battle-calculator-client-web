// imports
import axios from 'axios'

// config
const url = '/levels'

// main
const get = () => axios.get(url)

// exports
const service = { get }
export default service
