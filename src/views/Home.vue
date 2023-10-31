<script setup>
	import Header from '@/components/Header.vue'
	import Footer from '@/components/Footer.vue'
</script>

<template>
	<main class="home-wrapper p-12">
		<Header />

		<section class="mb-12 min-h-screen">
			<article v-for="i in 3" class="mb-10 overflow-hidden rounded-lg border-2 border-zinc-900">
				<section class="border-b-2 border-zinc-900">
					<img class="aspect-square" src="/placeholder.jpg" alt="fancy alt text." />
				</section>

				<section class="border-b-2 border-zinc-900 p-6">
					<h2 class="text-xl font-medium">cool cats</h2>
					<h3 class="mb-2">huge set of beautiful cats!</h3>

					<p class="text-zinc-400">#cats #portraits</p>
				</section>

				<RouterLink to="/cool-cats" class="flex items-center justify-center p-6">
					<p>check more</p>
				</RouterLink>
			</article>
		</section>

		<Footer />
	</main>
</template>
