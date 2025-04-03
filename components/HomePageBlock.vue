<script lang="ts" setup>
import { bannerService } from '~/api/banner.service'
import type { ImageSide, IMainBlock } from '~/types/types'

const props = defineProps<{
	block: IMainBlock
	isActive: boolean
	isLastBlock: boolean
	blockLength: number
	hasEditingId: boolean
}>()

const emit = defineEmits<{
	(e: 'setEditingId', id: string | null): void
	(e: 'changePosition'): void
}>()

const imageSide = ref<ImageSide>(props.block.imageSide)

const lang = ref<'ru' | 'en'>('ru')

const changeSide = async () => {
	try {
		await bannerService.updateBanner({
			imageSide: imageSide.value === 'left' ? 'right' : 'left',
			id: props.block.id,
		})
		imageSide.value = imageSide.value === 'left' ? 'right' : 'left'
	} catch (error) {
		console.log(error)
	}
}

const updatePosition = async (newPosition: number) => {
	if (newPosition > props.blockLength) {
		newPosition = props.blockLength
	}
	if (newPosition < 1) {
		newPosition = 1
	}
	try {
		await bannerService.changePosition(newPosition, props.block.id)
		emit('changePosition')
	} catch (error) {
		console.log(error)
	}
}
</script>

<template>
	<section
		:class="[
			'flex max-sm:gap-5 group relative max-sm:flex-col max-sm:items-center w-full max-sm:pb-5 sm:h-60 bg-emerald-900',
			'transform transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
			isActive
				? 'opacity-100 z-10 translate-y-0 scale-100 shadow-xl'
				: 'opacity-100 translate-y-4 scale-95',
		]"
	>
		<div
			:class="[
				!isActive && hasEditingId
					? 'absolute inset-0 bg-black/50 transition-all'
					: '',
			]"
		/>
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
			v-if="!isActive"
			icon="lucide:pen"
			size="sm"
			variant="soft"
			:label="'Редактировать'"
			color="neutral"
			class="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all"
			@click="emit('setEditingId', props.block.id)"
		/>
		<UButton
			v-else
			icon="lucide:pen"
			size="sm"
			variant="soft"
			:label="'Отменить'"
			color="neutral"
			class="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all"
			@click="emit('setEditingId', null)"
		/>
		<UButton
			icon="lucide:arrow-left-right"
			size="sm"
			variant="soft"
			color="neutral"
			class="absolute centered opacity-0 group-hover:opacity-100 transition-all"
			@click="changeSide"
		/>
		<div
			class="absolute -left-3 flex flex-col top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all"
		>
			<UButton
				:disabled="block.position === 1"
				icon="lucide:arrow-up"
				size="sm"
				variant="soft"
				color="neutral"
				@click="updatePosition(block.position - 1)"
			/>
			<UButton
				:disabled="isLastBlock"
				icon="lucide:arrow-down"
				size="sm"
				variant="soft"
				color="neutral"
				@click="updatePosition(block.position + 1)"
			/>
		</div>
		<div
			:class="[
				'max-h-60 sm:w-1/2',
				imageSide === 'right' ? 'order-2' : 'order-1',
			]"
		>
			<NuxtImg
				:src="formatUrl(block.image)"
				:alt="block.title.en"
				width="300"
				height="300"
				class="object-cover h-full w-full"
			/>
		</div>
		<div
			:class="[
				'flex w-1/2 flex-col justify-center text-center cursor-default items-center text-white gap-4 p-2',
				imageSide === 'right' ? 'order-1' : 'order-2',
			]"
		>
			<h2 class="text-xl font-semibold">{{ block.title[lang] }}</h2>
			<h2 class="text-md font-semibold">{{ block.description[lang] }}</h2>
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
