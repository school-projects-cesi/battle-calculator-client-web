<template>
	<div class="login">
		<h1>Connexion</h1>
		<form class="flex center column mt-2" @submit.prevent="loginUser">
			<div class="form-container flex center column">
				<div class="form-group">
					<label>Email</label>
					<input v-model="email" type="email" placeholder="Email" />
				</div>
				<div class="form-group">
					<label>Mot de passe</label>
					<input v-model="password" type="password" placeholder="Mot de passe" />
				</div>
				<button class="btn-primary small mt-3 w-100" type="submit">Login</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password: '',
		}
	},
	methods: {
		async loginUser() {
			try {
				const response = await this.$http.post('/auth/login', this.login)
				const { token } = response.data.data
				localStorage.setItem('user', token)
				// navigate to a protected resource
				this.$router.push('/me')
			} catch (err) {
				console.log(err.response)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/tools/_functions.scss';
@import '../../assets/scss/tools/_variables.scss';

.login {
	text-align: center;

	.form-container {
		background-color: rgba(255, 255, 255, 0.2);
		padding: space(5) space(12);
		border-radius: $border-radius;
	}
}
</style>
