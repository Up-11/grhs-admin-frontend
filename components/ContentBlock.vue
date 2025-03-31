<script lang="ts" setup>
import type { Routes } from '~/config/routes'

defineProps<{ title: string; text?: string; link: Routes; imageSrc: string }>()
</script>

<template>
	<NuxtLink
		class="rounded-xl w-full bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200"
		:to="link"
	>
		<div class="p-2 flex items-center justify-start px-5 gap-5 min-h-[120px]">
			<NuxtImg :src="imageSrc" class="w-30 h-30 object-cover" />
			<div class="flex flex-col gap-1 text-start">
				<h2 class="text-2xl font-medium text-neutral-900 mt-2">{{ title }}</h2>
				<p class="text-lg font-medium text-neutral-700 mt-2">{{ text }}</p>
			</div>
		</div>
	</NuxtLink>
</template>
