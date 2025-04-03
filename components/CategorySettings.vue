<script lang="ts" setup>
import type { FormSubmitEvent, TabsItem } from '@nuxt/ui'
import type { CategoryWithProducts } from '~/pages/menu.vue'
import * as z from 'zod'
import { productsService } from '~/api/products.service'

const props = defineProps<{ category: CategoryWithProducts }>()

const emit = defineEmits<{
	refresh: []
}>()

const schema = z.object({
	title: z.object({
		ru: z.string(),
		en: z.string(),
	}),
	hrefId: z.string(),
})

type Schema = z.output<typeof schema>

const toast = useToast()

const items = ref<TabsItem[]>([
	{
		label: 'Общие настройки',
		icon: 'i-lucide-user',
		slot: 'common' as const,
	},
	{
		label: 'Настройки продуктов',
		icon: 'i-lucide-lock',
		slot: 'products' as const,
	},
])

const state = reactive<Schema>({
	title: {
		ru: props.category.title.ru,
		en: props.category.title.en,
	},
	hrefId: props.category.hrefId,
})

const { mutate } = useMutation({
	mutationFn: (data: Schema) =>
		productsService.updateCategory(data, props.category.id),
	onSuccess: () => {
		toast.add({
			title: 'Категория успешно обновлена',
			color: 'success',
		})
		emit('refresh')
	},
	onError: error => {
		toast.add({
			title: 'Ошибка при обновлении категории',
			description: error.message,
			color: 'error',
		})
	},
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
	mutate(event.data)
}
</script>

<template>
	<UModal :title="'Настройки категории ' + category.title.ru">
		<slot />
		<template #body
			><UTabs
				size="sm"
				:unmount-on-hide="false"
				:items="items"
				class="w-full"
				color="neutral"
			>
				<template #common
					><UForm
						:schema="schema"
						:state="state"
						class="space-y-4 flex flex-col"
						@submit="onSubmit"
					>
						<h1 class="text-lg font-semibold mb-4">
							Изменить название категории
						</h1>
						<UFormField label="русский" name="title.ru">
							<UInput
								v-model="state.title.ru"
								placeholder="Введите название категории на русском"
								color="primary"
								class="w-full"
							/>
						</UFormField>
						<UFormField label="английский" name="title.en">
							<UInput
								v-model="state.title.en"
								placeholder="Введите название категории на английском"
								color="primary"
								class="w-full"
							/>
						</UFormField>
						<h1 class="text-lg font-semibold mb-4">
							Изменить идентификатор категории
						</h1>
						<UFormField
							description="Будьте осторожны меняя это, идентификаторы должны быть уникальными для каждой категории"
							label="Идентификатор категории"
							name="hrefId"
						>
							<UInput v-model="state.hrefId" color="primary" class="w-full" />
						</UFormField>

						<div class="flex w-full justify-end">
							<UButton type="submit">Добавить</UButton>
						</div>
					</UForm></template
				>
				<template #products>
					<div class="flex flex-col gap-1">
						<SettingsProductCard
							v-for="product in category.products"
							:key="product.id"
							:item="product"
							:current-category="category"
							@refresh="emit('refresh')"
						/>
					</div>
				</template>
			</UTabs>
		</template>
	</UModal>
</template>
