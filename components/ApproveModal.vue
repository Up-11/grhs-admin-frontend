<script setup lang="ts">
const {
	title = 'Выход из системы',
	description = 'Вы уверены?',
	buttonsText = ['Нет, остаться', 'Да, выйти'],
} = defineProps<{
	title?: string
	description?: string
	buttonsText?: string[]
}>()
const emit = defineEmits<{ (event: 'approve'): void }>()
const open = ref(false)
</script>

<template>
	<UModal
		v-model:open="open"
		:title="title"
		:description="description"
		:ui="{ footer: 'justify-end' }"
	>
		<slot />

		<template #footer>
			<UButton
				:label="buttonsText[0]"
				color="neutral"
				variant="outline"
				@click="open = false"
			/>
			<UButton :label="buttonsText[1]" color="error" @click="emit('approve')" />
		</template>
	</UModal>
</template>
