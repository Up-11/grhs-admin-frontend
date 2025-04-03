<script lang="ts" setup>
import { API_ROUTES } from '~/config/apiRoutes'
import type { IMainBlock } from '~/types/types'

definePageMeta({
	title: 'Главная страница',
})

const { configUrl } = useConfigUrl()

const editingId = ref<string | null>(null)

const { data, refresh } = useFetch<IMainBlock[]>(
	configUrl(API_ROUTES.BANNER.GET_BANNERS)
)
const setEditingId = async (id: string | null) => {
	await clearEditingId()
	editingId.value = id
}

const clearEditingId = () => {
	editingId.value = null
}

const currentBlockEditing = computed(() =>
	data.value?.find(block => block.id === editingId.value)
)

const lastBlock = computed(() => data.value?.at(-1))
</script>

<template>
	<div class="">
		<div class="flex justify-between items-center">
			<h1 class="text-2xl font-bold">Настройки главной страницы</h1>
			<CreateHomeBlock @refresh="refresh">
				<UButton
					label="Добавить новый блок"
					color="neutral"
					variant="soft"
					trailing-icon="lucide:plus"
					size="lg"
				/>
			</CreateHomeBlock>
		</div>
		<USeparator class="my-2" />
		<h2 class="text-lg font-semibold">Предпросмотр</h2>

		<section class="grid grid-cols-[65%_1fr] h-[100vh-100px]">
			<div class="flex flex-col gap-2 p-4">
				<TransitionGroup>
					<HomePageBlock
						v-for="block in data"
						:key="block.id"
						:block="block"
						:is-active="block.id === editingId"
						:is-last-block="block.id === lastBlock?.id"
						:block-length="data?.length!"
						:has-editing-id="editingId !== null || '' ? true : false"
						@set-editing-id="setEditingId"
						@change-position="refresh"
					/>
				</TransitionGroup>
			</div>
			<div class="sticky top-20 self-start">
				<div
					v-if="!editingId"
					class="flex flex-col items-center justify-start min-h-[calc(100vh-10rem)]"
				>
					<NuxtImg
						src="/Unboxing-4--Streamline-Milano.png"
						class="max-w-[200px] mb-4"
					/>
					<h1 class="text-center font-semibold max-w-[300px]">
						Чтобы отредактировать блок нажмите на кнопку внутри его
					</h1>
				</div>
				<EditHomeBlock
					v-else
					class="mt-5"
					:banner="currentBlockEditing!"
					@clear-is-editing="clearEditingId"
					@refresh="refresh"
				/>
			</div>
		</section>
	</div>
</template>

<style scoped></style>
