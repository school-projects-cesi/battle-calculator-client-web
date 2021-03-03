<template>
	<div class="home">
		<h1 class="title">Battle Calculator</h1>
		<div class="buttons">
			<router-link class="btn-primary mt-3" :to="{ name: 'GameCreate' }"
				>Commencer une<br />nouvelle partie</router-link
			>
		</div>

		<div class="scoreboard mt-5">
			<h2 class="text-uppercase">Top scores</h2>
			<table>
				<thead>
					<tr>
						<th>RANG</th>
						<th class="text-left">UTILISATEUR</th>
						<th>SCORE</th>
						<th>DATE</th>
					</tr>
				</thead>

				<tbody>
					<tr v-if="!games.length">
						<td colspan="20" class="text-center empty-td">
							aucun joueur n'a relevé le défis !
						</td>
					</tr>
					<tr v-for="game in games" :key="game">
						<td>
							<b>#{{ game.position }}</b>
						</td>
						<td class="text-left">{{ game.userName }}</td>
						<td>{{ game.score }}</td>
						<td>{{ game.date }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import service from '@/services/games.service'

export default {
	name: 'Home',
	data() {
		return {
			level: 1,
			games: [],
			interval: undefined,
		}
	},

	async created() {
		this.games = await this.getGames(this.level)
	},
	mounted() {
		// this.interval = setInterval(() => this.getGames(this.level), 1000)
	},
	unmouted() {
		clearInterval(this.interval)
	},
	methods: {
		getGames: async (level) => {
			const response = await service.best(level)
			if (response.status !== 200) {
				this.$swal({ title: 'Une erreur est survenue pendant le chargement du top score' })
				return undefined
			}

			return response.data.result
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/tools/_functions.scss';
@import '@/assets/styles/tools/_variables.scss';

.home {
	text-align: center;

	.buttons {
		display: flex;
		justify-content: center;
		margin: space(12) 0;
	}

	.scoreboard {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		table {
			border-spacing: 0;
			text-align: center;
			border-radius: 8px;
			overflow: hidden;
			// border-bottom: solid 4px rgba(0, 0, 0, 0.25);

			thead {
				background-color: rgba(0, 0, 0, 0.25);

				tr {
					th {
						font-weight: 700;
						padding: 10px 25px;
					}
				}
			}
			tbody {
				background-color: rgba(0, 0, 0, 0.1);

				tr {
					background-color: transparent;
					transition: all 0.3s;

					&:hover {
						background-color: rgba(255, 255, 255, 0.2);
					}

					td {
						padding: 5px 15px;

						&:first-child:not(.empty-td) {
							background-color: rgba(0, 0, 0, 0.075);
						}
					}
				}
			}
		}
	}
}
</style>
