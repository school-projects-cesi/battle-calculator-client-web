<!-- Inspiré de https://github.com/fengyuanchen/vue-feather/blob/v2.0.0-beta/src/vue-feather.vue -->
<!-- eslint-disable vue/no-v-html -->
<template>
	<i v-bind="attributes">
		<svg v-bind="svgAttributes" v-html="icon.contents"></svg>
	</i>
</template>

<script>
import feather from 'feather-icons'

export default {
	name: 'Icon',
	props: {
		animation: {
			type: String,
			default: undefined,
		},

		animationSpeed: {
			type: String,
			default: undefined,
		},

		size: {
			type: [Number, String],
			default: 24,
		},

		stroke: {
			type: String,
			default: 'currentColor',
		},

		strokeLinecap: {
			type: String,
			default: 'round',
		},

		strokeLinejoin: {
			type: String,
			default: 'round',
		},

		strokeWidth: {
			type: [Number, String],
			default: 2,
		},

		type: {
			type: String,
			default: 'feather',
			validator(type) {
				if (!feather) {
					throw new Error('The Feather icons is required.')
				}

				if (!feather.icons[type]) {
					throw new Error(`"${type}" is not an available icon type.`)
				}

				return true
			},
		},
	},
	data() {
		return {
			icon: undefined,
			attributes: undefined,
			svgAttributes: undefined,
		}
	},
	created() {
		this.icon = feather.icons[this.type]

		const {
			type,
			size,
			icon,
			animation,
			animationSpeed,
			stroke,
			strokeLinecap,
			strokeLinejoin,
			strokeWidth,
		} = this
		this.attributes = {
			...this.$attrs,
			'data-name': type,
			'data-tags': icon.tags,
			'data-type': type,
			class: {
				'vue-feather': true,
				[`vue-feather--${type}`]: type,
				[`vue-feather--${animation}`]: animation,
				[`vue-feather--${animationSpeed}`]: animationSpeed,
			},
		}
		this.svgAttributes = {
			...icon.attrs,
			height: size,
			stroke,
			'stroke-linecap': strokeLinecap,
			'stroke-linejoin': strokeLinejoin,
			'stroke-width': strokeWidth,
			width: size,
			class: [icon.attrs.class, 'vue-feather__content'],
		}
	},
}
</script>

<style lang="scss">
@keyframes vue-feather--spin {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}

.vue-feather {
	display: inline-block;
	overflow: hidden;

	&--spin {
		animation: vue-feather--spin 2s linear infinite;
	}

	&--pulse {
		animation: vue-feather--spin 2s infinite steps(8);
	}

	&--slow {
		animation-duration: 3s;
	}

	&--fast {
		animation-duration: 1s;
	}

	&__content {
		display: block;
		height: inherit;
		width: inherit;
		fill: transparent;
	}
}
</style>
