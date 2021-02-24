// imports
import axios from 'axios'

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
		await axios.post('/auth/register', form)
		const UserForm = new FormData()
		UserForm.append('username', form.username)
		UserForm.append('password', form.password)
		await dispatch('LogIn', UserForm)
	},

	async LogIn({ commit }, user) {
		const response = await axios.post('/auth/login', user)
		if (response.status !== 200) throw new Error('Une erreur est survenue')

		await commit('setUser', response.data?.result?.token)
	},

	async LogOut({ commit }) {
		const user = null
		commit('logout', user)
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
