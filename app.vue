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
		<AuthProvider>
			<NuxtLoadingIndicator color="green" />
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</AuthProvider>
	</UApp>
</template>
