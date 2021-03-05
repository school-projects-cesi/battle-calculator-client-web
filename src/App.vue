<template>
	<div class="main-container container-full pt-1">
		<div class="background"></div>
		<div>
			<NavBar />
			<router-view />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'

export default {
	components: {
		NavBar,
	},
}
</script>
