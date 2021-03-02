<template>
	<div class="create">
		<h1>Play</h1>
	</div>
</template>

<script>
import gameService from '@/services/games.service'
import levelService from '@/services/levels.service'

export default {
	name: 'Home',
	data() {
		return {}
	},
	methods: {
		getLevels: async () => {
			const response = await levelService.get()
			if (response.status !== 200 || !response.data) {
				alert('Une erreur est survenue pendant le chargement des niveaux')
				return undefined
			}

			return response.data.result
		},

		async onSubmit() {
			try {
				const response = await gameService.post({ level: this.levelType })
				console.log(response.data.result)
			} catch (err) {
				console.log(err.message)
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
