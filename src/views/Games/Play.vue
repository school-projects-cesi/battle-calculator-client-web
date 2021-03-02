<template>
	<div class="play">
		<h1 class="header" :class="{ animate: !loading }">Play</h1>
		<div v-if="loading" class="mt-3 flex center">
			<Spinner />
		</div>
		<div v-if="!loading && !countdownReady" class="full-center">
			<span class="countdown">{{ countdown }}</span>
		</div>

		<div v-if="!loading && countdownReady" class="wrapper">
			<div class="content">
				<div class="calcul">25 + 12 = ?</div>
				<div class="result">
					<div class="value">
						<i style="font-weight: 100">taper votre résultat</i>
					</div>
				</div>
			</div>

			<div class="progress" :style="{ width: `${(timer * 100) / 60}%` }">
				<div class="progress-bar"></div>
			</div>
		</div>
	</div>
</template>

<script>
import service from '@/services/games.service'
import Spinner from '@/components/Spinner.vue'
// import StartPlaySound from '@/assets/audios/start-play.ogg'

export default {
	components: {
		Spinner,
	},
	data() {
		return {
			game: undefined,
			score: undefined,
			loading: false,
			countdownReady: true,
			countdown: 3,
			timerInterval: undefined,
			timer: 0,
		}
	},
	async created() {
		// this.game = await this.getGame()
		// if (this.game) {
		// 	this.loading = false
		// 	const audio = new Audio(StartPlaySound)
		// 	await audio.play()
		// 	this.countDownTimer()
		// }
		this.countDownEnd()
	},
	methods: {
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
		countDownTimer() {
			if (this.countdown > 0) {
				setTimeout(() => {
					if (this.countdown !== 1) this.countdown -= 1
					else {
						this.countdownReady = true
						this.countdown = 'Go'
					}
					this.countDownTimer()
				}, 1000)
			}
		},
		countDownEnd() {
			this.timerInterval = setInterval(() => {
				this.timer += 1

				if (this.timer >= 60) this.timerEnd()
			}, 1000)
		},
		timerEnd() {
			clearInterval(this.timerInterval)
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/tools/_functions.scss';
@import '@/assets/styles/tools/_variables.scss';

.play {
	text-align: center;
	height: 100%;

	.header {
		letter-spacing: 0rem;
		margin-left: 0rem;

		&.animate {
			transition: $transition;
			animation: headerAnim 0.8s normal forwards ease-in-out;
		}
	}

	.full-center {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;

		.countdown {
			font-weight: 800;
			font-size: 15rem;
			text-transform: uppercase;
		}
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		background-color: transparent;
		color: $color-text;
		z-index: 5;
		transition: background-color 0.5s;
		height: 100%;

		.content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;

			.calcul {
				font-weight: 900;
				font-size: 10rem;
				margin-bottom: 10%;
			}

			.result {
				background-color: rgba(0, 0, 0, 0.16);
				border-radius: 12px;
				padding: 15px 70px;
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				white-space: nowrap;

				.value {
					font-size: 3.5rem;
				}
			}
		}

		.progress {
			height: 6px;
			background-color: $color-contrast;
			width: 0%;
			position: absolute;
			top: 0;
			left: 0;
			transition: width 1s linear;

			.progress-bar {
				width: 0;
				height: 100%;
				background-color: $color-contrast;
				border-top-right-radius: 50px;
				border-bottom-right-radius: 50px;
			}
		}
	}

	@keyframes headerAnim {
		0% {
			letter-spacing: 0rem;
			margin-left: 0rem;
		}
		60% {
			letter-spacing: 10rem;
			margin-left: 10rem;
			opacity: 1;
		}
		99% {
			letter-spacing: 0rem;
			margin-left: 0rem;
			opacity: 0;

			position: inherit;
			visibility: visible;
		}
		100% {
			position: absolute;
			visibility: hidden;
			letter-spacing: 0rem;
			margin-left: 0rem;
			opacity: 0;
		}
	}
}
</style>
