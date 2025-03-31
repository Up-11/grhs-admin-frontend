<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { ROUTES } from '~/config/routes'

const schema = z
	.object({
		email: z.string().email('Некорректный email'),
		password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
		passwordRepeat: z.string().min(8, 'Пароли должны совпадать'),
	})
	.refine(data => data.password === data.passwordRepeat, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})

type Schema = z.output<typeof schema>

const store = useAuthStore()

const state = reactive<Partial<Schema>>({
	email: store.email || '',
	password: '',
	passwordRepeat: '',
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
		class="space-y-4 flex flex-col"
		@submit="onSubmit"
	>
		<UFormField label="Электронная почта" name="email">
			<UInput
				v-model="state.email"
				placeholder="Введите электронную почту"
				color="primary"
				size="xl"
				class="w-full"
			/>
		</UFormField>

		<UFormField label="Пароль" name="password">
			<UInput
				v-model="state.password"
				color="primary"
				type="password"
				size="xl"
				placeholder="Введите пароль"
				class="w-full"
			/>
		</UFormField>

		<UFormField label="Повтор пароля" name="passwordRepeat">
			<UInput
				v-model="state.passwordRepeat"
				color="primary"
				type="password"
				size="xl"
				placeholder="Повторите пароль"
				class="w-full"
			/>
		</UFormField>

		<UButton size="xl" class="self-end" type="submit" :to="ROUTES.AUTH.VERIFY">
			Подтвердить
		</UButton>
	</UForm>
</template>
