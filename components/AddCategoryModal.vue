<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'
import { productsService } from '~/api/products.service'

const emit = defineEmits<{
	refresh: []
}>()

const schema = z.object({
	title: z.object({
		ru: z.string(),
		en: z.string(),
	}),
})

type Schema = z.output<typeof schema>

const toast = useToast()

const generateHrefId = (str: string) => {
	return (
		str.split(' ').join('-').toLowerCase() +
		'-' +
		new Date().getTime().toString()
	)
}

const state = reactive<Schema>({
	title: {
		ru: '',
		en: '',
	},
})

const isOpen = ref<boolean>(false)

const { mutate } = useMutation({
	mutationFn: (data: Schema) =>
		productsService.createCategory({
			...data,
			hrefId: generateHrefId(state.title.en),
		}),
	onSuccess: () => {
		toast.add({
			title: 'Категория успешно добавлена',
			color: 'success',
		})
		emit('refresh')
		state.title.ru = ''
		state.title.en = ''
		isOpen.value = false
	},
	onError: error => {
		toast.add({
			title: 'Ошибка при добавлении категории',
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
	<UModal v-model:open="isOpen" title="Добавить новую категорию">
		<slot />
		<template #body>
			<UForm
				:schema="schema"
				:state="state"
				class="space-y-4 flex flex-col"
				@submit="onSubmit"
			>
				<h1 class="text-lg font-semibold mb-4">Введите название категории</h1>
				<UFormField label="русский" name="title.ru">
					<UInput
						v-model="state.title.ru"
						placeholder="Введите название категории на русском"
						color="primary"
						size="xl"
						class="w-full"
					/>
				</UFormField>
				<UFormField label="английский" name="title.en">
					<UInput
						v-model="state.title.en"
						placeholder="Введите название категории на английском"
						color="primary"
						size="xl"
						class="w-full"
					/>
				</UFormField>
				<div class="flex w-full justify-end">
					<UButton type="submit">Добавить</UButton>
				</div>
			</UForm>
		</template>
	</UModal>
</template>

<style scoped></style>
