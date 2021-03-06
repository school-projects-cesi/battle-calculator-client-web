<template>
	<div class="loader-container">
		<div class="loader" />
	</div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/tools/_variables.scss';

$size: 2.75rem;
$loader-color: transparentize($color-text, 0.4);

.loader-container {
	height: $size;
	width: $size;
	position: relative;

	.loader {
		position: absolute;
		border-radius: 100%;
		content: '';
		z-index: 9999;
		transform: translate(-50%, -50%);
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		box-sizing: border-box;
		border: 0 solid $loader-color;
		-webkit-animation: loader-figure 1.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
		animation: loader-figure 1.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
	}
}

@keyframes loader-figure {
	0% {
		height: 0;
		width: 0;
		background-color: $loader-color;
	}
	29% {
		background-color: $loader-color;
	}
	30% {
		height: $size;
		width: $size;
		background-color: transparent;
		border-width: $size / 2;
		opacity: 1;
	}
	100% {
		height: $size;
		width: $size;
		border-width: 0;
		opacity: 0;
		background-color: transparent;
	}
}
</style>
