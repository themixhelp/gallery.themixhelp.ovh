<script setup>
	import { reactive } from 'vue'
	import { useRouter } from 'vue-router'

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

	const ROUTER = useRouter()

	instance
		.get(`/gallery/${ROUTER.currentRoute.value.params.slug}`)
		.then(response => {
			console.log(response.data.data.attributes)

			STATE.CONTENT.DATA = response.data.data.attributes

			const IMAGES = []

			STATE.CONTENT.DATA.images.data.forEach(image => {
				IMAGES.push('http://144.24.168.122:1337' + image.attributes.url)
			})

			STATE.CONTENT.DATA.images = IMAGES

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

		<section v-if="STATE.CONTENT.DISPLAY" class="mb-12 grid min-h-screen gap-y-6">
			<article class="rounded-lg border-2 border-zinc-900 p-6">
				<h2 class="text-xl font-medium">{{ STATE.CONTENT.DATA.title }}</h2>
				<h3>{{ STATE.CONTENT.DATA.description }}</h3>
			</article>

			<img
				v-for="url in STATE.CONTENT.DATA.images"
				class="rounded-lg border-2 border-zinc-900"
				:src="url"
				alt="fancy alt text."
			/>
		</section>

		<Error v-if="STATE.ERROR.DISPLAY" :code="STATE.ERROR.CODE" :description="STATE.ERROR.DESCRIPTION" />
		<Loading v-if="STATE.LOADING" />

		<Footer />
	</main>
</template>
