<template>
	<div class="play">
		<h1>Play</h1>
		<div v-if="loading" class="mt-3 flex center">
			<Spinner />
		</div>
		<div v-if="!loading">
			<div class="full-center">
				<span class="countdown">{{ countdown }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import service from '@/services/games.service'
import Spinner from '@/components/Spinner.vue'
import StartPlaySound from '@/assets/audios/start-play.ogg'

export default {
	components: {
		Spinner,
	},
	data() {
		return {
			game: undefined,
			loading: true,
			countdown: 3,
		}
	},
	async created() {
		this.game = await this.getGame()
		if (this.game) {
			this.loading = false
			const audio = new Audio(StartPlaySound)
			audio.play()
			this.countDownTimer()
		}
	},
	methods: {
		countDownTimer() {
			if (this.countdown > 0) {
				setTimeout(() => {
					if (this.countdown !== 1) this.countdown -= 1
					else this.countdown = 'Go'
					this.countDownTimer()
				}, 1000)
			}
		},
		async getGame() {
			try {
				const response = await service.get(this.$route.params.id ?? 0)
				return response.data.result
			} catch {
				this.$swal({ icon: 'error', title: "Cette partie n'existe pas" })
				this.$router.push({ name: 'Home' })
				return undefined
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/tools/_functions.scss';
@import '@/assets/styles/tools/_variables.scss';

.play {
	text-align: center;

	.full-center {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40vh;

		.countdown {
			font-weight: 800;
			font-size: 15rem;
			text-transform: uppercase;
		}
	}
}
</style>
