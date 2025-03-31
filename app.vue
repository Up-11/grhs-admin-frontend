<script setup lang="ts">
useHead({
	titleTemplate: titleChunk => {
		return titleChunk
			? `${titleChunk} - Green House Админ панель`
			: 'Green House Админ панель'
	},
})
</script>

<template>
	<UApp class="bg-neutral-100">
		<NuxtLoadingIndicator color="green" />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</UApp>
</template>
