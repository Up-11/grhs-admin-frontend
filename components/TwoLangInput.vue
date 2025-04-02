<script lang="ts" setup>
import type { TextWithLangs } from '~/types/types'

const props = defineProps<{ text: TextWithLangs }>()
const emit = defineEmits(['update:text'])

const currentLang = ref<'ru' | 'en'>('ru')
const isEditing = ref(false)
const editText = ref('')

const switchLang = () => {
	currentLang.value = currentLang.value === 'ru' ? 'en' : 'ru'
}

const startEditing = () => {
	editText.value = props.text[currentLang.value]
	isEditing.value = true
}

const saveChanges = () => {
	const updatedText = { ...props.text, [currentLang.value]: editText.value }
	emit('update:text', updatedText)
	isEditing.value = false
}

const cancelEditing = () => {
	isEditing.value = false
}
</script>

<template>
	<div class="relative group flex">
		<div v-if="!isEditing" @click="startEditing">
			<h1
				class="text-2xl text-center self-center font-semibold cursor-pointer hover:opacity-60 transition-opacity"
			>
				{{ props.text[currentLang] }}
			</h1>
		</div>

		<div v-else class="flex gap-2 items-center">
			<UInput
				v-model="editText"
				type="text"
				class="text-2xl font-semibold flex-1"
				size="xl"
				autofocus
			/>
			<UButton
				icon="lucide:check"
				size="xl"
				variant="outline"
				color="success"
				@click="saveChanges"
			/>
			<UButton
				icon="lucide:x"
				size="xl"
				variant="outline"
				color="error"
				@click="cancelEditing"
			/>
		</div>

		<UButton
			icon="lucide:languages"
			size="xl"
			variant="soft"
			color="neutral"
			class="absolute -top-5 -left-5 opacity-0 group-hover:opacity-100 transition-opacity"
			@click="switchLang"
		/>
	</div>
</template>
