<script setup>
	import { reactive } from 'vue'
	import { useRouter } from 'vue-router'

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

	const ROUTER = useRouter()

	instance
		.get(`/galleries/${ROUTER.currentRoute.value.params.slug}`)
		.then(response => {
			STATE.CONTENT.DATA = response.data.data.attributes

			const IMAGES = []

			STATE.CONTENT.DATA.images.data.forEach(image => {
				IMAGES.push({
					URL: STORE.URL + image.attributes.url,
					caption: image.attributes.caption,
					alternativeText: image.attributes.alternativeText,
				})
			})

			STATE.CONTENT.DATA.images = IMAGES

			STATE.CONTENT.DATA.tags = STATE.CONTENT.DATA.tags.data.map(item => `#${item.attributes.name}`).join(' ')

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
	<main class="gallery-wrapper p-12">
		<Header />

		<!-- <p class="mb-12 underline text-xl text-center">return to home</p> -->

		<section v-if="STATE.CONTENT.DISPLAY" class="mb-12 grid min-h-screen gap-y-10">
			<article class="rounded-lg border-2 border-zinc-900 dark:border-zinc-100">
				<section class="borderline p-6">
					<h2 class="text-xl font-medium">{{ STATE.CONTENT.DATA.title }}</h2>
					<h3 class="mb-2">{{ STATE.CONTENT.DATA.description }}</h3>

					<p class="text-zinc-600 dark:text-zinc-400">{{ STATE.CONTENT.DATA.tags }}</p>
				</section>

				<RouterLink to="/" class="flex items-center justify-center p-6">
					<p>return to home</p>
				</RouterLink>
			</article>

			<article
				v-if="STATE.CONTENT.DATA.showCaptions"
				v-for="IMAGE in STATE.CONTENT.DATA.images"
				class="overflow-hidden rounded-lg border-2 border-zinc-900 dark:border-zinc-100"
			>
				<img class="borderline" :src="IMAGE.URL" :alt="IMAGE.alternativeText" loading="lazy" />
				<p class="p-6 text-center">{{ IMAGE.caption ? IMAGE.caption : 'untitled' }}</p>
			</article>

			<img
				v-else
				v-for="IMAGE in STATE.CONTENT.DATA.images"
				class="rounded-lg border-2 border-zinc-900 dark:border-zinc-100"
				:src="IMAGE.URL"
				:alt="IMAGE.alternativeText"
				loading="lazy"
			/>
		</section>

		<Error v-if="STATE.ERROR.DISPLAY" :code="STATE.ERROR.CODE" :description="STATE.ERROR.DESCRIPTION" />
		<Loading v-if="STATE.LOADING" />

		<Footer />
	</main>
</template>
