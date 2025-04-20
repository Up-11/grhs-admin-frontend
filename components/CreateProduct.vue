<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent, TabsItem } from '@nuxt/ui'
import { UButton } from '#components'
import { NUTRITION } from '~/types/types'
import { categoriesKey } from '~/lib/keys'
import { productsService } from '~/api/products.service'

const schema = z.object({
	name: z.object({
		en: z.string(),
		ru: z.string(),
	}),
	description: z.object({
		en: z.string(),
		ru: z.string(),
	}),
	price: z.object({
		value: z.number(),
		max: z.number(),
	}),
	volumes: z.object({
		value: z.number(),
		max: z.number(),
	}),
	categoryId: z.string(),
	composition: z.object({
		ru: z.string(),
		en: z.string(),
	}),
	nutrition: z.object({
		calories: z.object({
			value: z.number(),
			max: z.number(),
			title: z.enum([NUTRITION.CALORIES]),
		}),
		proteins: z.object({
			value: z.number(),
			max: z.number(),
			title: z.enum([NUTRITION.PROTEINS]),
		}),
		fats: z.object({
			value: z.number(),
			max: z.number(),
			title: z.enum([NUTRITION.FATS]),
		}),
		carbohydrates: z.object({
			value: z.number(),
			max: z.number(),
			title: z.enum([NUTRITION.CARBS]),
		}),
	}),
})

type Schema = z.output<typeof schema>

const emit = defineEmits<{
	refresh: []
}>()
const categories = inject(categoriesKey)

const state = reactive<Schema>({
	name: {
		en: '',
		ru: '',
	},
	description: {
		en: '',
		ru: '',
	},
	price: {
		value: 0,
		max: 0,
	},
	volumes: {
		value: 0,
		max: 0,
	},
	composition: {
		ru: '',
		en: '',
	},
	categoryId: '',
	nutrition: {
		calories: {
			value: 0,
			max: 0,
			title: NUTRITION.CALORIES,
		},
		proteins: {
			value: 0,
			max: 0,
			title: NUTRITION.PROTEINS,
		},
		fats: {
			value: 0,
			max: 0,
			title: NUTRITION.FATS,
		},
		carbohydrates: {
			value: 0,
			max: 0,
			title: NUTRITION.CARBS,
		},
	},
})

const currentImage = ref<string | null>(null)
const { mutate: create } = useMutation({
	mutationFn: (data: Schema) =>
		productsService.createProduct({
			...data,
			composition: state.composition,
			image: currentImage.value || '',
		}),
	onSuccess: () => {
		toast.add({
			title: 'Успех',
			description: 'Продукт успешно создан.',
			color: 'success',
		})
		emit('refresh')
		isOpen.value = false
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
		label: 'Первый объем',
		slot: 'value',
	},
	{
		label: 'Второй объем',
		slot: 'max',
	},
])

const selectItems = categories!.value.map(curr => ({
	label: curr.title.ru,
	value: curr.id,
}))
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
						<h2 class="my-2 font-semibold">Название</h2>
						<UFormField label="русский" name="title.ru">
							<UInput v-model="state.name.ru" class="w-full" />
						</UFormField>
						<UFormField label="английский" name="title.en">
							<UInput v-model="state.name.en" class="w-full" />
						</UFormField>
					</div>
					<div class="flex flex-col">
						<h2 class="my-2 font-semibold">Описание</h2>
						<UFormField label="русский" name="description.ru">
							<UInput v-model="state.description.ru" class="w-full" />
						</UFormField>
						<UFormField label="английский" name="description.en">
							<UInput v-model="state.description.en" class="w-full" />
						</UFormField>
					</div>
					<UFormField
						label="Состав (Ру)"
						description="Запишите состав отделяя элементы через запятую"
						name="composition"
					>
						<UInput v-model="state.composition.ru" class="w-full" />
					</UFormField>
					<UFormField
						label="Состав (En)"
						description="Запишите состав отделяя элементы через запятую"
						name="composition"
					>
						<UInput v-model="state.composition.en" class="w-full" />
					</UFormField>
					<div>
						<h2 class="my-2 font-semibold">Категория</h2>

						<USelect
							v-model="state.categoryId"
							placeholder="Выберите категорию"
							:items="selectItems"
							class="w-full"
						/>
					</div>
					<UTabs
						:unmount-on-hide="false"
						color="neutral"
						variant="pill"
						:items="items"
						class="w-full"
					>
						<template #value>
							<div class="flex justify-between gap-2">
								<UFormField label="Цена" name="price.value">
									<UInputNumber
										v-model="state.price.value"
										class="w-full"
									/> </UFormField
								><UFormField label="Объем" name="volume.value">
									<UInputNumber v-model="state.volumes.value" class="w-full" />
								</UFormField>
							</div>
							<h2 class="my-2 font-semibold">БЖУ</h2>
							<div class="flex gap-2">
								<UFormField label="Калории" name="nutrition.calories.value">
									<UInputNumber
										v-model="state.nutrition.calories.value"
										class="w-full"
									/> </UFormField
								><UFormField label="Белки" name="nutrition.proteins.value">
									<UInputNumber
										v-model="state.nutrition.proteins.value"
										class="w-full"
									/>
								</UFormField>
								<UFormField label="Жиры" name="nutrition.fats.value">
									<UInputNumber
										v-model="state.nutrition.fats.value"
										class="w-full"
									/>
								</UFormField>
								<UFormField
									label="Углеводы"
									name="nutrition.carbohydrates.value"
								>
									<UInputNumber
										v-model="state.nutrition.carbohydrates.value"
										class="w-full"
									/>
								</UFormField>
							</div>
						</template>
						<template #max
							><div class="flex justify-between gap-2">
								<UFormField label="Цена" name="price.max">
									<UInputNumber
										v-model="state.price.max"
										class="w-full"
									/> </UFormField
								><UFormField label="Объем" name="volume.max">
									<UInputNumber v-model="state.volumes.max" class="w-full" />
								</UFormField>
							</div>
							<h2 class="my-2 font-semibold">БЖУ</h2>
							<div class="flex gap-2">
								<UFormField label="Калории" name="nutrition.calories.max">
									<UInputNumber
										v-model="state.nutrition.calories.max"
										class="w-full"
									/> </UFormField
								><UFormField label="Белки" name="nutrition.proteins.max">
									<UInputNumber
										v-model="state.nutrition.proteins.max"
										class="w-full"
									/>
								</UFormField>
								<UFormField label="Жиры" name="nutrition.fats.max">
									<UInputNumber
										v-model="state.nutrition.fats.max"
										class="w-full"
									/>
								</UFormField>
								<UFormField label="Углеводы" name="nutrition.carbohydrates.max">
									<UInputNumber
										v-model="state.nutrition.carbohydrates.max"
										class="w-full"
									/>
								</UFormField></div
						></template>
					</UTabs>
				</div>
				<div class="flex justify-between my-auto gap-2">
					<UButton type="submit" class="w-full"> Создать </UButton>
				</div>
			</UForm>
		</template>
	</UDrawer>
</template>
<style scoped></style>
