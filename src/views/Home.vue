<script setup>
	import { reactive } from 'vue'

	import instance from '@/axios.js'
	import STORE from '@/store.js'

	import { handleError } from '@/handlers/error.js'

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
					loaded: false,
					fullURL: STORE.URL + gallery.attributes.images.data[0].attributes.url,
					smallURL: STORE.URL + gallery.attributes.images.data[0].attributes.formats.small.url,
					alternativeText: gallery.attributes.images.data[0].attributes.alternativeText,
					counter: gallery.attributes.images.data.length,
					title: gallery.attributes.title,
					description: gallery.attributes.description,
					tags: gallery.attributes.tags.data.map(item => `#${item.attributes.name}`).join(' '),
					slug: gallery.attributes.slug,
				})
			})

			STATE.LOADING = false
			STATE.CONTENT.DISPLAY = true
		})
		.catch(error => handleError(error, STATE))
</script>

<template>
	<main class="home-wrapper wrapper">
		<Header />

		<section v-if="STATE.CONTENT.DISPLAY" class="mb-12 grid min-h-screen auto-rows-min gap-10 lg:grid-cols-2">
			<article
				v-for="(
					{ id, fullURL, smallURL, alternativeText, counter, title, description, tags, slug }, index
				) in STATE.CONTENT.DATA"
				:key="id"
				class="flex flex-col overflow-hidden rounded-lg border"
			>
				<section class="borderline relative overflow-hidden">
					<section
						:style="`background-image: url('${smallURL}')`"
						:class="STATE.CONTENT.DATA[index].loaded ? '' : 'blur-3xl'"
						class="bg-cover bg-no-repeat"
					>
						<img
							@load="STATE.CONTENT.DATA[index].loaded = true"
							:src="fullURL"
							:alt="alternativeText"
							class="aspect-square w-full"
							loading="lazy"
						/>
					</section>

					<span
						class="absolute right-0 top-0 rounded-bl-lg border-b-2 border-l-2 border-stone-900 bg-stone-100 px-6 py-3 dark:border-stone-100 dark:bg-stone-900"
					>
						{{ counter }} photos
					</span>
				</section>

				<section class="borderline flex flex-1 flex-col justify-between p-6">
					<section class="mb-2">
						<h2 class="text-xl font-medium">{{ title }}</h2>
						<h3>{{ description }}</h3>
					</section>

					<p class="text-stone-600 dark:text-stone-400">{{ tags }}</p>
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
