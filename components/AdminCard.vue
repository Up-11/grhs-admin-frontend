<script lang="ts" setup>
import type { User } from '~/types/types'

defineProps<Omit<User, 'isEmailVerified'>>()
</script>

<template>
	<div class="bg-neutral-100 gap-2 flex flex-col rounded-lg p-2">
		<h3 class="text-sm font-bold text-neutral-500">id: {{ id }}</h3>
		<div class="flex">
			<h3 class="text-lg font-semibold">{{ email }}</h3>
		</div>
	</div>
</template>

<style scoped></style>
