<template>
	<div>
		<form class="login" @submit.prevent="login">
			<h1>Sign in</h1>
			<label>Email</label>
			<input v-model="email" required type="email" placeholder="Name" />
			<label>Password</label>
			<input v-model="password" required type="password" placeholder="Password" />
			<hr />
			<button type="submit">Login</button>
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
