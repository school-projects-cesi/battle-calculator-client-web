<template>
	<div class="login">
		<h1>Connexion</h1>
		<Form
			v-slot="{ errors }"
			class="flex center column mt-2"
			:validation-schema="loginSchema"
			@submit="onSubmit"
		>
			<div class="form-container flex center column">
				<div class="form-group">
					<label>Email</label>
					<Field
						name="email"
						placeholder="Email"
						:class="{ 'is-invalid': errors.email }"
					/>
					<ErrorMessage class="input-error" name="email" />
				</div>
				<div class="form-group">
					<label>Mot de passe</label>
					<Field
						name="password"
						type="password"
						placeholder="Mot de passe"
						:class="{ 'is-invalid': errors.password }"
					/>
					<ErrorMessage class="input-error" name="password" />
				</div>
				<button class="btn-primary small mt-3 w-100" type="submit">Login</button>
			</div>
		</Form>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { Field, Form, ErrorMessage } from 'vee-validate'
import loginSchema from '@/services/models/login.model'
import router from '@/router'
import AppPaths from '@/router/paths'

export default {
	components: {
		Field,
		Form,
		ErrorMessage,
	},
	data() {
		return { loginSchema }
	},
	methods: {
		...mapActions(['LogIn']),
		async onSubmit(values) {
			try {
				await this.LogIn({
					username: values.username,
					password: values.password,
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
	h1 {
		text-align: center;
	}

	.form-container {
		background-color: rgba(255, 255, 255, 0.2);
		padding: space(5) space(12);
		border-radius: $border-radius;
		width: 100%;
		max-width: 550px;
	}
}
</style>
