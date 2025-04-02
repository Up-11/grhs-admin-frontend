<script lang="ts" setup>
import type { User } from '~/types/types'

const { showControls = false } = defineProps<
	Omit<User, 'isEmailVerified'> & { showControls?: boolean }
>()

defineSlots<{
	controls: () => Component
}>()
</script>

<template>
	<div class="bg-neutral-100 gap-2 flex flex-col rounded-lg p-2">
		<h3 class="text-sm font-bold text-neutral-500">id: {{ id }}</h3>
		<div class="flex justify-between">
			<h3 class="text-lg font-semibold">{{ email }}</h3>
			<UPopover v-if="showControls">
				<UButton icon="lucide:menu" variant="soft" color="neutral" />
				<template #content>
					<slot name="controls" />
				</template>
			</UPopover>
		</div>
	</div>
</template>

<style scoped></style>
