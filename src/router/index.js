// imports
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '@/views/Home/Home.vue'
import { Create, Play, End } from '@/views/Games'
import AppPaths from './paths'

// main
const routes = [
	{
		path: AppPaths.HOME,
		name: 'Home',
		component: Home,
		meta: { requiresAuth: true },
	},
	{
		path: AppPaths.LOGIN,
		name: 'Login',
		component: () => import('@/views/Home/Login.vue'),
	},
	{
		path: AppPaths.GAME_CREATE,
		name: 'GameCreate',
		component: Create,
		meta: { requiresAuth: true },
	},
	{
		path: AppPaths.GAME_PLAY,
		name: 'GamePlay',
		component: Play,
		props: true,
		meta: { requiresAuth: true },
	},
	{
		path: AppPaths.GAME_END,
		name: 'GameEnd',
		component: End,
		props: true,
		meta: { requiresAuth: true },
	},
]

const router = createRouter({
	history: createWebHistory(process.env.VUE_APP_BASE_URL),
	routes,
})

router.beforeEach((to, _, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (store.getters.isAuthenticated) {
			next()
			return
		}
		next(AppPaths.LOGIN)
	} else {
		next()
	}
})

// exports
export default router
