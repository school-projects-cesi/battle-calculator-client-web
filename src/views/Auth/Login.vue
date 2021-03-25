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
				<p class="mt-3">
					pour créer un compte, cliquez
					<router-link class="link" :to="{ name: 'Register' }">ici</router-link>
				</p>
			</div>
		</Form>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { Field, Form, ErrorMessage } from 'vee-validate'
import loginSchema from '@/services/models/login.model'
import ohSound from '@/assets/audios/login-oh.ogg'

export default {
	components: {
		Field,
		Form,
		ErrorMessage,
	},
	data() {
		return {
			loginSchema,
		}
	},
	methods: {
		...mapActions(['LogIn']),
		async onSubmit(values, actions) {
			try {
				await this.LogIn({
					username: values.email,
					password: values.password,
				})
				this.$swal({ icon: 'success', title: 'Connexion réussie !', text: 'Bienvenue' })
				this.$router.push({ name: 'Home' })
			} catch (err) {
				const audio = new Audio(ohSound)
				audio.load()
				await audio.play()
				const { response } = err
				if (response) {
					const { data } = response
					if (data) {
						const { validationErrors, title } = data
						if (validationErrors) {
							validationErrors.forEach((error) => {
								actions.setFieldError(error.name.toLowerCase(), error.reason)
							})
						} else if (title) this.$swal({ icon: 'error', title })
					}
					return
				}

				this.$swal({ icon: 'error', title: 'Une erreur est survenue.' })
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/tools/_functions.scss';
@import '@/assets/styles/tools/_variables.scss';

.login {
	h1 {
		text-align: center;
	}
}
</style>
