<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { AuthService } from '~/api/auth.service'

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

const toast = useToast()

const state = reactive<Partial<Schema>>({
	email: store.email || '',
	password: '',
	passwordRepeat: '',
})

const { mutate } = useMutation({
	mutationFn: (data: Schema) =>
		AuthService.editProfile(
			{ email: data.email, password: data.password },
			store.userId!
		),
	onSuccess: () => {
		toast.add({
			title: 'Успех',
			description: 'Данные успешно изменены.',
			color: 'success',
		})
	},
	onError: error => {
		toast.add({
			title: 'Ошибка',
			description: error.message,
			color: 'error',
		})
	},
})

const { mutate: deleteAcc } = useMutation({
	mutationFn: (id: string) => AuthService.deleteById(id),
	onSuccess: () => {
		toast.add({
			title: 'Успех',
			description: 'Аккаунт успешно удален.',
			color: 'success',
		})
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
	mutate(event.data)
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
			/> </UFormField
		>`

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
		<div class="flex justify-between items-center">
			<ApproveModal
				title="Удаление аккаунта"
				description="Вы уверены? Аккаунт восстановить невозможно"
				:buttons-text="['Отменить', 'Удалить']"
				@approve="() => deleteAcc(store.userId!)"
			>
				<UButton size="xl" class="self-end" color="error">
					Удалить аккаунт
				</UButton>
			</ApproveModal>

			<UButton size="xl" class="self-end" type="submit"> Подтвердить </UButton>
		</div>
	</UForm>
</template>
