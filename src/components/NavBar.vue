<template>
	<div v-if="isLoggedIn" class="Navbar mb-4">
		<button class="btn-icon pt-0 pb-0 mr-3" @click="activateDisableSound()">
			<icon v-if="soundActivated" type="volume-2" />
			<icon v-else type="volume-x" />
		</button>
		<button class="btn-icon mr-3">
			<icon type="edit" />
		</button>
		<button class="btn-icon mr-3" @click="logout()">
			<icon type="log-out" />
		</button>
		{{ username }}
	</div>
</template>

<script>
import service from '@/services/users.service'
import AppPaths from '../router/paths'

export default {
	name: 'NavBar',
	data() {
		return {
			username: '',
			soundActivated: true,
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated
		},
	},
	async created() {
		this.username = await this.getUser()
		console.log(this.username)
	},
	methods: {
		async logout() {
			await this.$store.dispatch('LogOut')
			this.$router.push(AppPaths.LOGIN)
		},
		getUser: async () => {
			const response = await service.me()
			return response.data.result.username
		},
		activateDisableSound() {
			if (this.soundActivated) {
				this.soundActivated = false
			} else {
				this.soundActivated = true
			}
			console.log(this.soundActivated)
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/tools/_functions.scss';
@import '@/assets/styles/tools/_variables.scss';

.Navbar {
	text-align: right;
	vertical-align: baseline;
	align-items: center;

	.buttons {
		border: none;
		border-radius: 50px;
	}
}
</style>
