<script setup>
	import Header from '@/components/Header.vue'
	import Footer from '@/components/Footer.vue'
</script>

<template>
	<main class="gallery-wrapper p-12">
		<Header />

		<!-- <p class="mb-12 underline text-xl text-center">return to home</p> -->

		<section class="mb-12 grid min-h-screen gap-y-6">
			<article class="rounded-lg border-2 border-zinc-900 p-6">
				<h2 class="text-xl font-medium">cool cats</h2>
				<h3 class="mb-2">huge set of beautiful cats!</h3>

				<p class="text-zinc-600">#cats #portraits</p>
			</article>

			<img class="rounded-lg" src="/placeholder.jpg" alt="fancy alt text." />
			<img class="rounded-lg" src="/horizontal.jpg" alt="fancy alt text." />
			<img class="rounded-lg" src="/vertical.jpg" alt="fancy alt text." />
		</section>

		<Footer />
	</main>
</template>
