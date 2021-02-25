<template>
	<div class="login">
		<h1>Connexion</h1>
		<form class="flex center column mt-2" @submit.prevent="submit">
			<div class="form-container flex center column">
				<div class="form-group">
					<label>Email</label>
					<input v-model="form.username" name="username" placeholder="Email" />
				</div>
				<div class="form-group">
					<label>Mot de passe</label>
					<input v-model="form.password" type="password" placeholder="Mot de passe" />
				</div>
				<button class="btn-primary small mt-3 w-100" type="submit">Login</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import router from '@/router'
import AppPaths from '@/router/paths'

export default {
	data() {
		return {
			form: {
				username: '',
				password: '',
			},
		}
	},
	methods: {
		...mapActions(['LogIn']),
		async submit() {
			try {
				await this.LogIn({
					username: this.form.username,
					password: this.form.password,
				})
				router.push(AppPaths.HOME)
			} catch (error) {
				console.error(error)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/tools/_functions.scss';
@import '../../assets/styles/tools/_variables.scss';

.login {
	text-align: center;

	.form-container {
		background-color: rgba(255, 255, 255, 0.2);
		padding: space(5) space(12);
		border-radius: $border-radius;
	}
}
</style>
