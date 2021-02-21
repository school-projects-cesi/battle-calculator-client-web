import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import AppPaths from './paths'

const routes = [
	{
		path: AppPaths.HOME,
		name: 'Home',
		component: Home,
	},
	{
		path: AppPaths.ABOUT,
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
	{
		path: AppPaths.LOGIN,
		name: 'Login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/Home/Login.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
