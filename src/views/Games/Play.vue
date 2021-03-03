<template>
	<div class="play">
		<div v-if="loading" class="mt-3 full-center">
			<Spinner />
		</div>
		<div v-if="!loading && !countdownReady" class="full-center">
			<span class="countdown">{{ countdown }}</span>
		</div>

		<div v-if="!loading && countdownReady" class="wrapper">
			<div class="content">
				<div class="calcul">{{ score.operation }} = ?</div>
				<div class="result">
					<div class="value">
						<i>{{ value || 'taper votre résultat' }}</i>
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
import gameService from '@/services/games.service'
import scoreService from '@/services/scores.service'
import Spinner from '@/components/Spinner.vue'
import StartPlaySound from '@/assets/audios/play-start.ogg'
import CorrectPlaySound from '@/assets/audios/play-correct.ogg'
import WrongPlaySound from '@/assets/audios/play-wrong.ogg'
import { IsNumberKeyWithoutDecimal } from '@/utils/number'
import { isNotEmptyString } from '@/utils/string'

export default {
	components: {
		Spinner,
	},
	data() {
		return {
			game: undefined,
			score: undefined,
			loading: false,
			countdownReady: false,
			countdown: 3,
			timerInterval: undefined,
			backgroundTimeout: undefined,
			timer: 0,
			value: '',
			audios: {
				start: undefined,
				correct: undefined,
				wrong: undefined,
			},
		}
	},
	mounted() {
		window.addEventListener('keydown', this.onInput)
		this.audios = {
			start: new Audio(StartPlaySound),
			correct: new Audio(CorrectPlaySound),
			wrong: new Audio(WrongPlaySound),
		}
		Object.values(this.audios).forEach((audio) => audio.load())
	},
	unmounted() {
		window.removeEventListener('keydown', this.onInput)
	},
	async created() {
		this.game = await this.getGame()
		if (this.game && this.game.score) {
			if (!this.game.started) {
				this.score = this.game.score
				this.loading = false
				await this.audios.start.play()
				this.countDownTimer()
			} else {
				this.$swal({
					icon: 'error',
					title: 'Vous ne pouvez pas rejoindre une partie en cours.',
				})
				this.$router.push({ name: 'Home' })
			}
		} else {
			this.$swal({
				icon: 'error',
				title: 'Une erreur est suvenue pendant la récupération de la partie.',
			})
			this.$router.push({ name: 'Home' })
		}
	},
	methods: {
		async getGame() {
			try {
				const response = await gameService.get(this.$route.params.id ?? 0)
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
						this.countDownEnd()
					}
					this.countDownTimer()
				}, 1000)
			}
		},
		countDownEnd() {
			this.timerInterval = setInterval(() => {
				this.timer += 1

				if (this.timer >= this.game.chrono) this.timerEnd()
			}, 1000)
		},
		onInput(e) {
			// escape
			const code = e.keyCode || e.charCode
			if (code === 27) this.value = ''
			else if (code === 13) {
				if (isNotEmptyString(this.value)) this.validResult(this.value)
			}
			// delete
			else if (code === 8 || code === 46) this.value = this.value.slice(0, -1)
			else if (IsNumberKeyWithoutDecimal(e.key)) this.value += e.key
		},
		async validResult(result) {
			const response = await scoreService.add(this.game.id, this.score.id, {
				result: isNotEmptyString(result) ? result : 0,
			})
			// TODO: ajouter un try catch

			// check score
			if (parseInt(result, 10) === this.score.result) {
				this.$background({ color: 'var(--success-color)' })
				this.audios.correct.currentTime = 0
				await this.audios.correct.play()
			} else {
				this.$background({ color: 'var(--danger-color)' })
				this.audios.wrong.currentTime = 0
				await this.audios.wrong.play()
			}

			// reset timeout
			if (this.backgroundTimeout) clearTimeout(this.backgroundTimeout)
			this.backgroundTimeout = setTimeout(() => this.$background.reset(), 450)

			// reset
			this.value = ''
			this.score = response.data.result.next
		},
		timerEnd() {
			window.removeEventListener('keydown', this.onInput)
			clearInterval(this.timerInterval)
			this.$router.push({ name: 'GameEnd', params: { id: this.game.id } })
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/tools/_functions.scss';
@import '@/assets/styles/tools/_variables.scss';
@import '@/assets/styles/tools/_mixins.scss';
@import '@/assets/styles/tools/_typography.scss';

.play {
	text-align: center;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

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
		opacity: 0;
		animation: slideIn 0.6s normal forwards ease-in-out;

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
				font-family: $font-alt;
				text-transform: uppercase;
				color: $color-text-muted;

				.value {
					font-size: 2.5rem;
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
			transition: width 1.1s linear;

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
