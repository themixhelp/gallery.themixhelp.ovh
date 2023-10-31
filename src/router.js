import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Gallery from '@/views/Gallery.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/:slug',
			name: 'gallery',
			component: Gallery,
		},
	],
})

export default router
