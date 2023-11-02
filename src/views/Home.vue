<script setup>
	import { reactive } from 'vue'

	import instance from '@/axios.js'
	import STORE from '@/store.js'

	import Header from '@/components/Header.vue'
	import Error from '@/components/Error.vue'
	import Loading from '@/components/Loading.vue'
	import Footer from '@/components/Footer.vue'

	const STATE = reactive({
		LOADING: true,
		ERROR: {
			DISPLAY: false,
			CODE: '',
			DESCRIPTION: '',
		},
		CONTENT: {
			DISPLAY: false,
			DATA: [],
		},
	})

	instance
		.get('/galleries')
		.then(response => {
			response.data.data.forEach(gallery => {
				STATE.CONTENT.DATA.push({
					id: gallery.id,
					URL: STORE.URL + gallery.attributes.images.data[0].attributes.url,
					alt: gallery.attributes.images.data[0].attributes.alternativeText,
					title: gallery.attributes.title,
					description: gallery.attributes.description,
					tags: gallery.attributes.tags.data.map(item => `#${item.attributes.name}`).join(' '),
					slug: gallery.attributes.slug,
				})
			})

			STATE.LOADING = false
			STATE.CONTENT.DISPLAY = true
		})
		.catch(error => {
			STATE.LOADING = false
			STATE.ERROR.DISPLAY = true

			try {
				STATE.ERROR.CODE = error.response.status
				STATE.ERROR.DESCRIPTION = error.response.statusText.toLowerCase()
			} catch {
				STATE.ERROR.CODE = 'xxx'
				STATE.ERROR.DESCRIPTION = 'something went horrible wrong'
			}
		})
</script>

<template>
	<main class="home-wrapper p-12">
		<Header />

		<section v-if="STATE.CONTENT.DISPLAY" class="mb-12 min-h-screen">
			<article
				v-for="{ id, URL, alt, title, description, tags, slug } in STATE.CONTENT.DATA"
				:key="id"
				class="mb-10 overflow-hidden rounded-lg border-2 border-zinc-900 dark:border-zinc-100"
			>
				<section class="borderline">
					<img class="aspect-square" :src="URL" :alt="alt" loading="lazy" />
				</section>

				<section class="borderline p-6">
					<h2 class="text-xl font-medium">{{ title }}</h2>
					<h3 class="mb-2">{{ description }}</h3>

					<p class="text-zinc-600 dark:text-zinc-400">{{ tags }}</p>
				</section>

				<RouterLink :to="slug" class="flex items-center justify-center p-6">
					<p>check more</p>
				</RouterLink>
			</article>
		</section>

		<Error v-if="STATE.ERROR.DISPLAY" :code="STATE.ERROR.CODE" :description="STATE.ERROR.DESCRIPTION" />
		<Loading v-if="STATE.LOADING" />

		<Footer />
	</main>
</template>
