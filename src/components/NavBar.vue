<template>
	<div v-if="isLoggedIn" class="Navbar">
		{{ isLoggedIn ? 'LOGGED' : 'PAS LOGGED' }}
		{{ username }}
		<i @click="logout()"></i>
		<LogoutIcon />
	</div>
</template>

<script>
import service from '@/services/users.service'
import LogoutIcon from '@/assets/images/icons/logout.svg'
import AppPaths from '../router/paths'

export default {
	name: 'NavBar',
	components: {
		LogoutIcon,
	},
	data() {
		return {
			username: '',
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
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/tools/_functions.scss';
@import '@/assets/styles/tools/_variables.scss';

.Navbar {
	text-align: right;
	background-color: rgba(255, 255, 255, 0.2);
	padding: space(5) space(12);
	border-radius: $border-radius;
	width: 100%;
	max-width: 550px;
	display: flex;
	align-items: end;

	.buttons {
		display: flex;
		justify-content: right;
		margin: space(12) 0;
	}
}
</style>
