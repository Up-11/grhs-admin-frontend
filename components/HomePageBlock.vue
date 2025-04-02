<script lang="ts" setup>
import type { IMainBlock } from '~/types/types'

defineProps<{ block: IMainBlock }>()

const lang = ref<'ru' | 'en'>('ru')
</script>

<template>
	<section
		class="flex max-sm:gap-5 group relative max-sm:flex-col max-sm:items-center w-full max-sm:pb-5 sm:h-60 bg-emerald-900"
	>
		<UButton
			icon="lucide:languages"
			size="sm"
			variant="soft"
			label="Сменить язык"
			color="neutral"
			class="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all"
			@click="lang = lang === 'ru' ? 'en' : 'ru'"
		/>
		<UButton
			icon="lucide:arrow-left-right"
			size="sm"
			variant="soft"
			color="neutral"
			class="absolute centered opacity-0 group-hover:opacity-100 transition-all"
			@click="lang = lang === 'ru' ? 'en' : 'ru'"
		/>
		<div
			:class="[
				'max-h-60 sm:w-1/2',
				block.imageSide === 'right' ? 'order-2' : 'order-1',
			]"
		>
			<NuxtImg
				:src="block.image"
				:alt="block.title.en"
				width="300"
				height="300"
				class="object-cover h-full w-full"
			/>
		</div>
		<div
			:class="[
				'flex w-1/2 flex-col justify-center text-center items-center text-white gap-4 p-2',
				block.imageSide === 'right' ? 'order-1' : 'order-2',
			]"
		>
			<h2 class="text-xl font-semibold">{{ block.title[lang] }}</h2>
			<h2 class="text-md font-semibold">{{ block.description[lang] }}</h2>
			<button class="btn btn-outline btn-success font-semibold">
				{{ block.button[lang] }}
			</button>
		</div>
	</section>
</template>

<style>
.centered {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
