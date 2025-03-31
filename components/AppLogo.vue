<script setup lang="ts">
import { ROUTES } from '~/config/routes'
</script>

<template>
	<NuxtLink
		:to="ROUTES.INDEX"
		class="flex group items-center cursor-default p-2 text-green-700"
	>
		<NuxtImg src="/logo_svg.svg" width="30" height="30" class="size-16" />
		<div
			class="flex group-hover:translate-x-2 transition-transform duration-200"
		>
			<UIcon size="30" name="lucide:chevron-right" />
			<h2 class="text-xl font-bold">Администратор</h2>
		</div>
	</NuxtLink>
</template>

<style scoped></style>
