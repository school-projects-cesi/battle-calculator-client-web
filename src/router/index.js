import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '@/views/Home/Home.vue'
import AppPaths from './paths'

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
		path: AppPaths.REGISTER,
		name: 'Register',
		component: () => import('@/views/Home/Register.vue'),
	},
	{
		path: AppPaths.GAME_CREATE,
		name: 'GameCreate',
		component: () => import('@/views/Game/Create.vue'),
	},
	{
		path: AppPaths.GAME_PLAY,
		name: 'GamePlay',
		component: () => import('@/views/Game/Play.vue'),
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

export default router
