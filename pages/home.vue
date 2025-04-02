<script lang="ts" setup>
import { API_ROUTES } from '~/config/apiRoutes'
import type { IMainBlock } from '~/types/types'

definePageMeta({
	title: 'Главная страница',
})

const { configUrl } = useConfigUrl()

const { data, refresh, status } = useFetch<IMainBlock[]>(
	configUrl(API_ROUTES.BANNER.GET_BANNERS),
	{ transform: data => data.sort((a, b) => a.position - b.position) }
)
console.log(data)
</script>

<template>
	<div>
		<div class="flex justify-between items-center">
			<h1 class="text-2xl font-bold">Настройки главной страницы</h1>
			<UButton
				label="Добавить новый блок"
				color="neutral"
				variant="soft"
				trailing-icon="lucide:plus"
				size="lg"
			/>
		</div>
		<USeparator class="my-2" />
		<h2 class="text-lg font-semibold">Предпросмотр</h2>

		<section class="grid grid-cols-[65%_1fr]">
			<div class="flex flex-col gap-2 p-4">
				<HomePageBlock v-for="block in data" :key="block.id" :block="block" />
			</div>
		</section>
	</div>
</template>

<style scoped></style>
