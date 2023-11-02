<script setup>
	import { ref, onMounted, computed } from 'vue'

	const showWarning = ref(false)

	onMounted(() => setTimeout(() => (showWarning.value = true), 2000))

	const message = computed(() =>
		showWarning.value ? 'it should not take that long' : 'please wait for better experience'
	)
</script>

<template>
	<main class="loading-wrapper min-h-screen text-center">
		<h2 class="mb-6 text-2xl font-medium uppercase underline underline-offset-8">loading in progress</h2>
		<p>{{ message }}</p>
	</main>
</template>
