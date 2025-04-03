<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui'
import { productsService } from '~/api/products.service'
import { API_ROUTES } from '~/config/apiRoutes'
import { categoriesKey, productsRefreshKey } from '~/lib/keys'
import type { IProduct, TextWithLangs } from '~/types/types'

definePageMeta({
	title: 'Меню',
})

export interface CategoryWithProducts {
	id: string
	title: TextWithLangs
	hrefId: string
	products: IProduct[]
}

export interface TabsItemWithCategory extends TabsItem {
	category: CategoryWithProducts
	items: IProduct[]
}

const toast = useToast()

const { configUrl } = useConfigUrl()
const { data, refresh } = useAuthFetch<CategoryWithProducts[]>(
	configUrl(API_ROUTES.CATEGORIES.INDEX)
)
const categories = ref<CategoryWithProducts[]>([])
const items = ref<TabsItemWithCategory[]>([])

provide(categoriesKey, categories)
provide(productsRefreshKey, refresh)

watch(
	categories,
	newCategories => {
		items.value = newCategories.map(category => ({
			category: category,
			label: category.title.ru,
			items: category.products as IProduct[],
		}))
	},
	{ immediate: true }
)

watch(
	data,
	newData => {
		categories.value = newData || []
	},
	{ immediate: true }
)

const { mutate: deleteCategory } = useMutation({
	mutationFn: (categoryId: string) =>
		productsService.deleteCategory(categoryId),
	onSuccess: () => {
		toast.add({
			title: 'Категория удалена',
			color: 'success',
		})
		refresh()
	},
	onError: error => {
		toast.add({
			title: 'Ошибка при удалении категории',
			description: error.message,
			color: 'success',
		})
	},
})
</script>

<template>
	<div class="relative">
		<div class="flex justify-between items-center">
			<h1 class="text-2xl font-bold">Мониторинг меню</h1>
		</div>
		<USeparator class="my-2" />
		<div class="flex gap-1">
			<UTabs
				v-if="items"
				:items="items"
				class="w-full relative"
				variant="link"
				color="neutral"
			>
				<template #content="{ item }">
					<div class="flex items-center gap-1 absolute top-0 right-0">
						<AddCategoryModal @refresh="refresh">
							<UButton class="self-start" icon="lucide:plus" color="neutral" />
						</AddCategoryModal>
					</div>
					<UPopover>
						<UButton
							class="self-end mb-4 absolute top-12 right-0"
							icon="lucide:settings"
							color="neutral"
						/>
						<template #content>
							<div class="flex flex-col">
								<CategorySettings :category="item.category" @refresh="refresh">
									<UButton variant="soft" color="neutral" class="rounded-none"
										>Настройки категории</UButton
									>
								</CategorySettings>
								<UTooltip
									:delay-duration="100"
									:disabled="item.items.length === 0"
									text="Нельзя удалить категорию в которой есть элементы"
									><UButton
										:disabled="item.items.length >= 1"
										variant="soft"
										color="error"
										class="rounded-none"
										@click="deleteCategory(item.category.id)"
										>Удалить категорию</UButton
									></UTooltip
								>
							</div>
						</template>
					</UPopover>
					<div class="grid grid-cols-4 gap-2">
						<MenuCard
							v-for="product in item.items"
							:key="product.id"
							:item="product"
						/>
						<CreateProduct @refresh="refresh">
							<div
								class="w-3/4 py-4 bg-green-50 min-h-30 items-center justify-center self-center flex flex-col gap-2 rounded-lx cursor-pointer hover:bg-green-100 transition-colors"
							>
								<NuxtImg
									width="160"
									height="auto"
									src="/Coffee-Tea-4--Streamline-Milano.png"
								/>
								<h2 class="text-lg text-center font-bold text-gree-950">
									Добавить новый продукт в меню
								</h2>
							</div>
						</CreateProduct>
					</div>
				</template>
			</UTabs>
			<AddCategoryModal @refresh="refresh">
				<UButton
					label="добавить категорию"
					class="self-start"
					icon="lucide:plus"
					color="neutral"
				/>
			</AddCategoryModal>
		</div>
	</div>
</template>
