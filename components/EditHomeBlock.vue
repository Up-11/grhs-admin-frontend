<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { TextWithLangs } from '~/types/types'
import { UButton } from '#components'
import { bannerService, type UpdateBannerDto } from '~/api/banner.service'

export interface EditBanner {
	id: string
	title: TextWithLangs
	description: TextWithLangs
	image: string
}

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

const props = defineProps<{ banner: EditBanner }>()

const emit = defineEmits<{
	clearIsEditing: []
	refresh: []
}>()
const state = reactive<Schema>({
	title: {
		en: props.banner.title.en,
		ru: props.banner.title.ru,
	},
	description: {
		en: props.banner.description.en,
		ru: props.banner.description.ru,
	},
})
const currentImage = ref<string | null>(props.banner.image)
const toast = useToast()

const { mutate: update } = useMutation({
	mutationFn: (data: UpdateBannerDto) =>
		bannerService.updateBanner({
			...data,
			id: props.banner.id,
			image: currentImage.value ? currentImage.value : '',
		}),
	onSuccess: () => {
		toast.add({
			title: 'Успех',
			description: 'Баннер успешно обновлен.',
			color: 'success',
		})
		emit('clearIsEditing')
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

const { mutate: deleteBanner } = useMutation({
	mutationFn: (id: string) => bannerService.deleteBanner(id),
	onSuccess: () => {
		toast.add({
			title: 'Успех',
			description: 'Баннер успешно удален.',
			color: 'success',
		})
		emit('clearIsEditing')
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
	update(event.data)
}
const createImage = (file: string | null) => {
	if (!file) {
		currentImage.value = null
	}
	currentImage.value = file
}
</script>

<template>
	<UForm
		:schema="schema"
		:state="state"
		class="w-full flex gap-3 flex-col justify-start"
		@submit="onSubmit"
	>
		<div class="flex flex-col gap-3 overflow-auto">
			<div class="w-full px-2 flex items-center justify-center relative h-60">
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
						<h1 class="text-gray-500 dark:text-gray-400">Фото не загружено</h1>
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
			<div class="flex gap-4 justify-between">
				<h2>Редактирование блока "{{ banner.title.ru }}"</h2>
				<UButton
					icon="lucide:x"
					color="error"
					variant="outline"
					@click="emit('clearIsEditing')"
				/>
			</div>

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
		</div>
		<div class="flex justify-between gap-2">
			<UButton color="error" class="w-full" @click="deleteBanner(banner.id)">
				Удалить
			</UButton>
			<UButton type="submit" class="w-full"> Сохранить </UButton>
		</div>
	</UForm>
</template>
