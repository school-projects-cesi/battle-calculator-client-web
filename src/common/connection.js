// imports
import store from '@/store'

// main
const authConfig = () => ({
	headers: {
		Authorization: `Bearer ${store.getters.StateUser}`,
	},
})

// exports
export default authConfig
