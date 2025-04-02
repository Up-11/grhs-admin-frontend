<script lang="ts" setup>
import type { TextWithLangs } from '~/types/types'

const props = defineProps<{ text: TextWithLangs }>()

const currentLang = ref<'ru' | 'en'>('ru')

const switchLang = () => {
	currentLang.value = currentLang.value === 'ru' ? 'en' : 'ru'
}
</script>

<template>
	<div class="relative group">
		<h1 class="text-2xl font-semibold cursor-pointer">
			{{ props.text[currentLang] }}
		</h1>
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
