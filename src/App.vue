<template>
	<div class="main-container container-full pt-1">
		<div class="background">
			<div v-background class="background-extra"></div>
		</div>
		<div style="height: 100%">
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
