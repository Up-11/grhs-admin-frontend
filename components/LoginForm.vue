<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { ROUTES } from '~/config/routes'
import { AuthService } from '~/api/auth/auth.service'

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
const router = useRouter()

const { mutate: login, isLoading } = useMutation({
	mutationFn: (data: Schema) => {
		return AuthService.login(data.email, data.password)
	},
	onSuccess: data => {
		if (data?.success) {
			toast.add({
				title: 'Успех',
				description: data.message,
				color: 'success',
			})
			router.push(ROUTES.AUTH.VERIFY)
		}
	},
	onError: err => {
		toast.add({
			title: 'Ошибка',
			description: err.message,
			color: 'error',
		})
	},
})
async function onSubmit(event: FormSubmitEvent<Schema>) {
	login(event.data)
}

const canSendData = computed(() => {
	return state.email && state.password
})
</script>

<template>
	<UForm
		:schema="schema"
		:state="state"
		class="space-y-4 flex flex-col w-full max-w-70 self-center mx-auto items-center justify-center"
		@submit="onSubmit"
	>
		<UFormField label="Электронная почта" name="email">
			<UInput
				v-model="state.email"
				placeholder="Введите электронную почту"
				color="primary"
				class="w-full max-w-70"
				size="xl"
			/>
		</UFormField>

		<UFormField
			class="w-full"
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
			:disabled="!canSendData"
			:loading="isLoading"
			size="xl"
			class="self-end"
			type="submit"
		>
			Войти
		</UButton>
	</UForm>
</template>
