<template>
	<div class="register">
		<h1>S'enregistrer</h1>
		<Form
			v-slot="{ errors }"
			class="flex center column mt-2"
			:validation-schema="registerSchema"
			@submit="onSubmit"
		>
			<div class="form-container flex center column">
				<div class="form-group">
					<label>Nom d'utilisateur</label>
					<Field
						name="username"
						placeholder="Nom d'utilisateur"
						:class="{ 'is-invalid': errors.username }"
					/>
					<ErrorMessage class="input-error" name="username" />
				</div>
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
				<button class="btn-primary small mt-3 w-100" type="submit">S'enregistrer</button>
			</div>
		</Form>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { Field, Form } from 'vee-validate'
import registerSchema from '@/services/models/register.model'
import router from '@/router'
import AppPaths from '@/router/paths'

export default {
	components: {
		Field,
		Form,
	},
	data() {
		return { registerSchema }
	},
	methods: {
		...mapActions(['LogIn']),
		async onSubmit(values, actions) {
			try {
				await this.LogIn({
					username: values.email,
					email: values.email,
					password: values.password,
				})
				this.$swal({ icon: 'success', title: 'Connexion réussi !', text: 'Bienvenue' })
				router.push(AppPaths.HOME)
			} catch (err) {
				const { response } = err
				if (response) {
					const { data } = response
					if (data) {
						const { errors, title } = data
						if (errors) {
							Object.entries(errors).forEach(([key, error]) =>
								actions.setFieldError(key.toLowerCase(), error)
							)
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
@import '../../assets/styles/tools/_functions.scss';
@import '../../assets/styles/tools/_variables.scss';

.register {
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
