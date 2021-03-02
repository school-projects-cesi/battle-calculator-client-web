<template>
	<div class="create">
		<h1>Débuter une partie</h1>

		<Form class="flex center column mt-2" @submit="onSubmit">
			<div class="form-container flex center column">
				<div class="form-group">
					<select id="level-select" v-model="levelType">
						<option v-for="level in levels" :key="level.type" :value="level.type">
							{{ level.name }}
						</option>
					</select>
				</div>
				<button class="btn-primary small mt-3 w-100" type="submit">Créer la partie</button>
			</div>
		</Form>
	</div>
</template>

<script>
import gameService from '@/services/games.service'
import levelService from '@/services/levels.service'
import { Form } from 'vee-validate'
import router from '@/router'
import AppPaths from '@/router/paths'

export default {
	components: {
		Form,
	},
	data() {
		return {
			levelType: null,
			levels: [],
		}
	},

	async created() {
		this.levels = await this.getLevels()
		this.levelType = this.levels[0].type
	},
	methods: {
		getLevels: async () => {
			const response = await levelService.get()
			if (response.status !== 200) {
				this.$swal({ icon: 'error', title: 'Erreur de chargement des niveaux' })
				return undefined
			}
			return response.data.result
		},

		async onSubmit() {
			try {
				const response = await gameService.post({ level: this.levelType })
				if (response.status === 200) {
					this.$swal({ icon: 'success', title: 'Partie créée !' })
					router.push({
						path: AppPaths.GAME_PLAY,
						query: { id: response.data.result.id },
					})
				}
			} catch (err) {
				this.$swal({ icon: 'error', title: "Erreur lors de la création d'une partie" })
				console.log(err)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/tools/_functions.scss';
@import '../../assets/styles/tools/_variables.scss';

.create {
	text-align: center;

	.form-container {
		background-color: rgba(255, 255, 255, 0.2);
		padding: space(5) space(12);
		border-radius: $border-radius;
		width: 100%;
		max-width: 550px;
	}
}
</style>
