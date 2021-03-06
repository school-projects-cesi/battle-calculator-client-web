<template>
	<div class="end">
		<h1>Fin de partie</h1>
		<div v-if="game">
			<h3>{{ game.totalScore }}</h3>
			<p>{{ game.levelData.name }}</p>
			<small>level {{ game.levelData.type }}</small>
		</div>
		<router-link class="btn-primary mt-3" :to="{ name: 'Home' }"
			>Retourner à l'accueil</router-link
		>
	</div>
</template>

<script>
import gameService from '@/services/games.service'

export default {
	data() {
		return {
			game: undefined,
		}
	},
	async created() {
		this.game = await this.endGame()
		if (!this.game) {
			this.$swal({
				icon: 'error',
				title: 'Une erreur est suvenue pendant la récupération de la partie.',
			})
			this.$router.push({ name: 'Home' })
		}
	},
	methods: {
		async endGame() {
			try {
				const response = await gameService.end(this.$route.params.id ?? 0)
				return response.data.result
			} catch {
				this.$swal({
					icon: 'error',
					title: "Cette partie n'existe pas ou n'est plus accessible.",
				})
				this.$router.push({ name: 'Home' })
				return undefined
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.end {
	text-align: center;
}
</style>
