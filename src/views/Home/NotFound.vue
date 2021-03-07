<template>
	<div class="notFound mt-5 pt-5">
		<h1>En voilà encore un qui s'est perdu dans les pages.</h1>
		<img class="logo mt-5" :src="img" />
	</div>
</template>

<script>
import image from '@/assets/images/logo404.png'

export default {
	name: 'NotFound',
	data() {
		return {
			img: image,
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/tools/_functions.scss';
@import '@/assets/styles/tools/_variables.scss';

.notFound {
	text-align: center;
	.logo {
		height: 250px;
		width: 250px;
	}
}
</style>
