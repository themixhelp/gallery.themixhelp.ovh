<script setup>
	import { reactive } from 'vue'

	import instance from '@/axios.js'

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
			// console.log(response.data.data)

			response.data.data.forEach(element => {
				STATE.CONTENT.DATA.push({
					id: element.id,
					url: 'http://144.24.168.122:1337' + element.attributes.cover.data.attributes.url,
					alt: element.attributes.cover.data.attributes.alternativeText,
					title: element.attributes.title,
					description: element.attributes.description,
					tags: element.attributes.tags.data,
					slug: element.attributes.slug,
				})
			})

			STATE.CONTENT.DATA.forEach(element => {
				let TAGS = ''

				element.tags.forEach(tag => {
					TAGS += '#' + tag.attributes.name + ' '
				})

				element.tags = TAGS
			})

			// STATE.CONTENT.DATA.forEach(element => {
			// 	const IMG = new Image()
			// 	IMG.src = element.url
			// })

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
				v-for="{ id, url, alt, title, description, tags, slug } in STATE.CONTENT.DATA"
				:key="id"
				class="mb-10 overflow-hidden rounded-lg border-2 border-zinc-900 dark:border-zinc-100"
			>
				<section class="border-b-2 border-zinc-900 dark:border-zinc-100">
					<img class="aspect-square" :src="url" :alt="alt" loading="lazy" />
				</section>

				<section class="border-b-2 border-zinc-900 p-6 dark:border-zinc-100">
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
