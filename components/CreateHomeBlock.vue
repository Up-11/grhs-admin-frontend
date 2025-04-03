<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent, TabsItem } from '@nuxt/ui'
import { UButton } from '#components'
import { bannerService } from '~/api/banner.service'
import type { ImageSide } from '~/types/types'

const schema = z.object({
	title: z.object({
		en: z.string(),
		ru: z.string(),
	}),
	description: z.object({
		en: z.string(),
		ru: z.string(),
	}),
})

type Schema = z.output<typeof schema>

const emit = defineEmits<{
	refresh: []
}>()
const state = reactive<Schema>({
	title: {
		en: 'New Title',
		ru: 'Новый заголовок',
	},
	description: {
		en: 'New Description',
		ru: 'Новое описание',
	},
})

const currentImage = ref<string | null>(null)

const imageSide = ref<ImageSide>('right')

const { mutate: create } = useMutation({
	mutationFn: (data: Schema) =>
		bannerService.createBanner({
			...data,
			image: currentImage.value ? currentImage.value : '',
			imageSide: imageSide.value,
		}),
	onSuccess: () => {
		toast.add({
			title: 'Успех',
			description: 'Баннер успешно создан.',
			color: 'success',
		})
		isOpen.value = false
		emit('refresh')
	},
	onError: error => {
		toast.add({
			title: 'Ошибка',
			description: error.message,
			color: 'error',
		})
	},
})
async function onSubmit(event: FormSubmitEvent<Schema>) {
	create(event.data)
}
const createImage = (file: string | null) => {
	if (!file) {
		currentImage.value = null
	}
	currentImage.value = file
}

const isOpen = ref<boolean>(false)

const toast = useToast()

const items = ref<TabsItem[]>([
	{
		label: 'Справа',
		value: 'right',
	},
	{
		label: 'Слева',
		value: 'left',
	},
])
</script>

<template>
	<UDrawer
		v-model:open="isOpen"
		:ui="{
			content: 'w-118',
		}"
		direction="right"
		inset
		:handle-only="true"
		:handle="false"
		title="Создать блок"
	>
		<slot />
		<template #body>
			<UForm
				:schema="schema"
				:state="state"
				class="w-full flex gap-3 flex-col justify-start"
				@submit="onSubmit"
			>
				<div class="flex flex-col gap-3 overflow-auto">
					<div
						class="w-full px-2 flex items-center justify-center relative h-60"
					>
						<div class="w-full h-full rounded-lg overflow-hidden">
							<NuxtImg
								v-if="currentImage"
								:src="formatUrl(currentImage)"
								alt="banner preview"
								class="w-full h-full object-cover"
							/>
							<div
								v-else
								class="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
							>
								<h1 class="text-gray-500 dark:text-gray-400">
									Фото не загружено
								</h1>
							</div>
						</div>

						<div
							class="absolute inset-0 flex flex-col justify-center items-center z-20"
						>
							<UploadImage
								class="w-full h-full"
								@image-change="file => createImage(file)"
							/>
						</div>
					</div>
					<div class="flex gap-4 justify-between"></div>
					<div class="flex flex-col">
						<h2>Название</h2>
						<UFormField label="русский" name="title.ru">
							<UInput v-model="state.title.ru" class="w-full" />
						</UFormField>
						<UFormField label="английский" name="title.en">
							<UInput v-model="state.title.en" class="w-full" />
						</UFormField>
					</div>
					<div class="flex flex-col">
						<h2>Описание</h2>
						<UFormField label="русский" name="description.ru">
							<UInput v-model="state.description.ru" class="w-full" />
						</UFormField>
						<UFormField label="английский" name="description.en">
							<UInput v-model="state.description.en" class="w-full" />
						</UFormField>
					</div>

					<div class="flex flex-col">
						<h2>Сторона изображения</h2>
						<UTabs
							v-model="imageSide"
							color="neutral"
							orientation="vertical"
							variant="pill"
							:content="false"
							:items="items"
							class="w-full"
						/>
					</div>
				</div>
				<div class="flex justify-between gap-2">
					<UButton type="submit" class="w-full"> Создать </UButton>
				</div>
			</UForm>
		</template>
	</UDrawer>
</template>
<style scoped></style>
