<script setup lang="ts">
import { ru } from '@nuxt/ui/locale'
useHead({
	titleTemplate: titleChunk => {
		return titleChunk
			? `${titleChunk} - Green House Админ панель`
			: 'Green House Админ панель'
	},
	htmlAttrs: {
		lang: 'ru',
	},
})
</script>

<template>
	<UApp
		:locale="ru"
		:toaster="{
			position: 'top-center',
		}"
		class="bg-neutral-100"
	>
		<AuthProvider>
			<NuxtLoadingIndicator color="green" />
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</AuthProvider>
	</UApp>
</template>
