<template>
	<div>{{ isLoggedIn ? 'LOGGED' : 'PAS LOGGED' }}</div>
</template>

<script>
import AppPaths from '../router/paths'

export default {
	name: 'NavBar',
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated
		},
	},
	methods: {
		async logout() {
			await this.$store.dispatch('LogOut')
			this.$router.push(AppPaths.LOGIN)
		},
	},
}
</script>
