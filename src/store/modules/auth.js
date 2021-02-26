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
	async Register({ dispatch }, form) {
		await service.register(form)
		const UserForm = new FormData()
		UserForm.append('username', form.username)
		UserForm.append('password', form.password)
		await dispatch('LogIn', UserForm)
	},

	async LogIn({ commit }, user) {
		const response = await service.login(user)
		if (!response || response.status !== 200) throw new Error('Une erreur est survenue')
		// TODO: changer le throw
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
