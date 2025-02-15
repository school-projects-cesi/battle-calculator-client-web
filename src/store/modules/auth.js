// imports
import service from '@/services/auth.service'

// data
const state = {
	user: null,
}

// main
const getters = {
	isAuthenticated: (currentState) => !!currentState.user,
	StateUser: (currentState) => currentState.user,
}

const actions = {
	async Register({ commit }, user) {
		const response = await service.register(user)
		await commit('setUser', response.data?.result?.token)
	},

	async LogIn({ commit }, user) {
		const response = await service.login(user)
		await commit('setUser', response.data?.result?.token)
	},

	async LogOut({ commit }) {
		commit('logout', null)
	},
}

const mutations = {
	setUser(currentState, username) {
		currentState.user = username
	},

	logout(currentState, user) {
		currentState.user = user
	},
}

// exports
export default {
	state,
	getters,
	actions,
	mutations,
}
