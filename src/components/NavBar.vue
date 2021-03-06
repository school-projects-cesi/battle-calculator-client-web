<template>
	<div v-if="isLoggedIn" class="Navbar mb-4">
		<button class="btn-icon pt-0 pb-0 mr-2 buttons" @click="activateDisableSound()">
			<icon v-if="soundActivated" type="volume-2" />
			<icon v-else type="volume-x" />
		</button>
		<button class="btn-icon mr-2 buttons">
			<icon type="edit" />
		</button>
		<button class="btn-icon mr-2 buttons" @click="logout()">
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
	vertical-align: middle;

	.buttons {
		text-align: center;
		width: 55px;
		height: 55px;
		border-radius: $border-radius;
		&:hover {
			text-decoration: underline;
			background-color: $color-dark;
			background-color: rgba(255, 255, 255, 0.2);
		}
	}
}
</style>
