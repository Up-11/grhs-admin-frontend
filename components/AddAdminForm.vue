<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
	email: z.string().email('Некорректный email'),
	password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
	email: '',
	password: '',
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
	toast.add({
		title: 'Success',
		description: 'The form has been submitted.',
		color: 'success',
	})
	console.log(event.data)
}
</script>

<template>
	<UForm
		:schema="schema"
		:state="state"
		class="space-y-4 flex flex-col w-full max-w-70 items-center justify-center"
		@submit="onSubmit"
	>
		<UFormField
			label="Электронная почта"
			name="email"
			class="flex flex-col items-center justify-center text-center"
		>
			<UInput
				v-model="state.email"
				placeholder="Введите электронную почту"
				color="primary"
				size="xl"
			/>
		</UFormField>

		<UFormField
			class="flex flex-col items-center justify-center text-center"
			:ui="{ error: 'max-w-[247px]' }"
			label="Пароль"
			name="password"
		>
			<UInput
				v-model="state.password"
				color="primary"
				type="password"
				size="xl"
				placeholder="Введите пароль"
			/>
		</UFormField>

		<UButton
			color="neutral"
			size="xl"
			class="w-full max-w-[247px] justify-center"
			type="submit"
		>
			Зарегистрировать
		</UButton>
	</UForm>
</template>
