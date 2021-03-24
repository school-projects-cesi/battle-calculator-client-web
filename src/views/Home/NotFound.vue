<template>
	<div class="notFound">
		<h1>Erreur 404</h1>
		<div class="mt-5 image-button">
			<img class="logo" :src="img" />
			<div class="button-holder">
				<router-link class="btn-primary small" :to="{ name: 'Home' }"
					>retourner à l'accueil</router-link
				>
			</div>
		</div>
	</div>
</template>

<script>
import image from '@/assets/images/logo404.png'
import AwwSound from '@/assets/audios/notFound-aww.ogg'

export default {
	name: 'NotFound',
	data() {
		return {
			img: image,
		}
	},

	async created() {
		const audio = new Audio(AwwSound)
		audio.load()
		await audio.play()
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/tools/_functions.scss';
@import '@/assets/styles/tools/_variables.scss';

.notFound {
	text-align: center;

	.logo {
		height: 350px;
		width: 550px;
	}
	.image-button {
		position: relative;
	}
	.button-holder {
		position: absolute;
		top: calc(50% + 62px);
		left: calc(50% + 95px);
		transform: translate(-50%, -50%);
	}
}
</style>
