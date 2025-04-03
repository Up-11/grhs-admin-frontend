<script setup lang="ts">
import { productsService } from '~/api/products.service'
import { categoriesKey } from '~/lib/keys'
import type { CategoryWithProducts } from '~/pages/menu.vue'
import type { IProduct } from '~/types/types'

const props = defineProps<{
	item: IProduct
	currentCategory: Omit<CategoryWithProducts, 'products'>
}>()

const emit = defineEmits<{
	refresh: []
}>()

const loading = ref<boolean>(true)

const toast = useToast()

const categories = inject(categoriesKey)

const isActive = computed(
	() => (category: CategoryWithProducts) =>
		category.id === props.currentCategory.id
)

const { mutate: updateCategory } = useMutation({
	mutationFn: (data: { productId: string; categoryId: string }) =>
		productsService.updateProduct(data.productId, {
			categoryId: data.categoryId,
		}),
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
</script>

<template>
	<div
		class="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-gray-200 transition-shadow"
	>
		<div class="relative w-full sm:w-[100px] h-[100px] flex-shrink-0">
			<div
				v-if="loading"
				class="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"
			></div>
			<img
				v-show="!loading"
				:src="formatUrl(item.image)"
				:alt="item.name.ru"
				class="w-full h-full object-cover rounded-lg"
				@load="loading = false"
			/>
		</div>

		<div class="flex flex-col flex-grow">
			<div>
				<div class="flex items-center gap-1 justify-between">
					<h3 class="font-semibold text-lg line-clamp-2">{{ item.name.ru }}</h3>

					<div class="flex items-center gap-1">
						<UPopover arrow>
							<UTooltip text="Переместить в другую категорию">
								<UButton icon="lucide:move" variant="soft" color="neutral" />
							</UTooltip>
							<template #content>
								<div class="flex flex-col p-2 gap-2">
									<UButton
										v-for="category in categories"
										:key="category.id"
										:disabled="isActive(category)"
										:class="[isActive(category) && 'text-green-700']"
										:trailing-icon="isActive(category) ? 'lucide:check' : ''"
										:label="category.title.ru"
										variant="soft"
										color="neutral"
										@click="
											updateCategory({
												productId: item.id,
												categoryId: category.id,
											})
										"
									/>
								</div>
							</template>
						</UPopover>
						<EditProduct :item="item" @refresh="emit('refresh')">
							<UTooltip text="Изменить продукт">
								<UButton icon="lucide:pen" variant="soft" color="neutral" />
							</UTooltip>
						</EditProduct>
					</div>
				</div>
				<p class="text-gray-500 text-sm line-clamp-3 mt-1">
					{{ item.description.ru }}
				</p>
			</div>
		</div>
	</div>
</template>
