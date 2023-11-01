<script setup>
	const PROPS = defineProps(['code', 'description'])
</script>

<template>
	<main class="loading-wrapper min-h-screen text-center">
		<h2 class="mb-6 text-2xl font-medium uppercase underline underline-offset-8">{{ code }}</h2>
		<p>{{ description }}</p>
	</main>
</template>
