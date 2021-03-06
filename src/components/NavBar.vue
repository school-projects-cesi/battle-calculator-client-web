<template>
	<div v-if="isLoggedIn" class="navbar mb-4">
		<button class="btn-icon navbar-button" @click="activateVolume()">
			<icon v-if="volume" type="volume-2" />
			<icon v-else type="volume-x" />
		</button>
		<button class="btn-icon navbar-button">
			<icon type="edit" />
		</button>
		<button class="btn-icon navbar-button" @click="logout()">
			<icon type="log-out" />
		</button>
		<div>
			{{ user?.username }}
		</div>
	</div>
</template>

<script>
import service from '@/services/users.service'

export default {
	name: 'NavBar',
	data() {
		return {
			user: undefined,
			volume: true,
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated
		},
	},
	async created() {
		this.user = await this.getUser()
	},
	methods: {
		async logout() {
			await this.$store.dispatch('LogOut')
			this.$router.push({ name: 'Login' })
		},
		getUser: async () => {
			const response = await service.me()
			return response.data.result
		},
		activateVolume() {
			this.volume = !this.volume
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/tools/_functions.scss';
@import '@/assets/styles/tools/_variables.scss';

.navbar {
	display: flex;
	align-items: center;
	justify-content: flex-end;

	.navbar-button {
		margin-right: space(1.5);
	}
}
</style>
