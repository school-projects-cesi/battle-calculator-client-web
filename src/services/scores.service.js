// imports
import axios from 'axios'
import authConfig from '@/common/connection'

// config
const url = '/games'
const urlSecond = '/scores'

// main
const add = (game, score, data) =>
	axios.patch(`${url}/${game}${urlSecond}/${score}`, data, authConfig())

// exports
const service = { add }
export default service
