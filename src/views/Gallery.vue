<script setup>
	import { reactive } from 'vue'
	import { useRouter } from 'vue-router'

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

	const ROUTER = useRouter()

	instance
		.get(`/galleries/${ROUTER.currentRoute.value.params.slug}`)
		.then(response => {
			STATE.CONTENT.DATA = response.data.data.attributes

			const IMAGES = []

			STATE.CONTENT.DATA.images.data.forEach(image => {
				IMAGES.push({
					loaded: false,
					fullURL: STORE.URL + image.attributes.url,
					smallURL: STORE.URL + image.attributes.formats.small.url,
					caption: image.attributes.caption,
					alternativeText: image.attributes.alternativeText,
				})
			})

			STATE.CONTENT.DATA.images = IMAGES

			STATE.CONTENT.DATA.tags = STATE.CONTENT.DATA.tags.data.map(item => `#${item.attributes.name}`).join(' ')

			STATE.LOADING = false
			STATE.CONTENT.DISPLAY = true
		})
		.catch(error => handleError(error, STATE))
</script>

<template>
	<main class="gallery-wrapper wrapper">
		<Header />

		<section v-if="STATE.CONTENT.DISPLAY" class="mb-12 min-h-screen">
			<article class="mb-10 rounded-lg border">
				<section class="borderline p-6">
					<h2 class="text-xl font-medium">{{ STATE.CONTENT.DATA.title }}</h2>
					<h3 class="mb-2">{{ STATE.CONTENT.DATA.description }}</h3>

					<p class="text-stone-600 dark:text-stone-400">{{ STATE.CONTENT.DATA.tags }}</p>
				</section>

				<RouterLink to="/" class="flex items-center justify-center p-6">
					<p>return to home</p>
				</RouterLink>
			</article>

			<section class="gap-x-10 lg:columns-2">
				<article
					v-for="(IMAGE, index) in STATE.CONTENT.DATA.images"
					class="mb-10 overflow-hidden rounded-lg border"
				>
					<section :class="STATE.CONTENT.DATA.showCaptions ? 'borderline' : ''" class="overflow-hidden">
						<section
							:style="`background-image: url('${IMAGE.smallURL}')`"
							:class="STATE.CONTENT.DATA.images[index].loaded ? '' : 'blur-3xl'"
							class="bg-cover bg-no-repeat"
						>
							<a :href="IMAGE.fullURL" class="cursor-zoom-in" target="_blank">
								<img
									@load="STATE.CONTENT.DATA.images[index].loaded = true"
									:src="IMAGE.fullURL"
									:alt="IMAGE.alternativeText"
                                    :class="STATE.CONTENT.DATA.images[index].loaded ? '' : 'aspect-square w-full'"
									loading="lazy"
								/>
							</a>
						</section>
					</section>

					<p v-if="STATE.CONTENT.DATA.showCaptions" class="p-6 text-center">
						{{ IMAGE.caption ? IMAGE.caption : 'untitled' }}
					</p>
				</article>
			</section>
		</section>

		<Error v-if="STATE.ERROR.DISPLAY" :code="STATE.ERROR.CODE" :description="STATE.ERROR.DESCRIPTION" />
		<Loading v-if="STATE.LOADING" />

		<Footer />
	</main>
</template>
