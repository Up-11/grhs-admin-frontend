<script setup lang="ts">
import { ref } from 'vue'
import { productsRefreshKey } from '~/lib/keys'
import type { IProduct } from '~/types/types'

defineProps<{ item: IProduct }>()

const loading = ref<boolean>(true)

const refresh = inject(productsRefreshKey)
</script>

<template>
	<div class="w-[250px] max-h-[350px] flex flex-col cursor-default gap-2">
		<div class="relative w-[250px] h-[250px]">
			<div
				v-if="loading"
				class="absolute inset-0 bg-gray-200 animate-pulse rounded"
			></div>
			<img
				v-show="!loading"
				:src="formatUrl(item.image)"
				:alt="item.name.ru"
				width="250px"
				height="250px"
				class="object-cover w-full h-full rounded"
				@load="loading = false"
			/>
		</div>
		<div class="flex flex-col gap-1">
			<h3 class="font-semibold line-clamp-2">{{ item.name.ru }}</h3>
			<h4 class="text-gray-500 line-clamp-3">
				{{ item.description.ru }}
			</h4>
		</div>
		<div class="flex justify-between mt-2 items-center">
			<p class="font-medium">{{ item.price.value }} руб.</p>
			<EditProduct :item="item" @refresh="refresh">
				<button
					class="cursor-pointer text-sm text-green-950 px-4 py-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
				>
					Редактировать
				</button>
			</EditProduct>
		</div>
	</div>
</template>
