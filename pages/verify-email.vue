<script lang="ts" setup>
import { AuthService } from '~/api/auth/auth.service'
import { ROUTES } from '~/config/routes'

definePageMeta({
	layout: 'auth',
	title: 'Подтверждение почты',
})
const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()

const tokenInput = ref<string[] | null>()

watch(tokenInput, () => {
	if (tokenInput.value?.length === 6) {
		sendToken(tokenInput.value.join(''))
	}
})

const { mutate: login, isLoading } = useMutation({
	mutationFn: (data: string) => {
		return AuthService.verifyEmail(data)
	},
	onSuccess: data => {
		toast.add({
			title: 'Успех',
			description: data.message,
			color: 'success',
		})
		authStore.setAuthData(data.user, data.accessToken)
		router.replace(ROUTES.INDEX)
	},
	onError: err => {
		toast.add({
			title: 'Ошибка',
			description: err.message,
			color: 'error',
		})
	},
})
async function sendToken(data: string) {
	login(data)
}
</script>

<template>
	<section
		class="w-full h-screen flex flex-col justify-center items-center mx-auto"
	>
		<div
			class="bg-slate-100 flex flex-col items-center justify-center rounded-lg p-10 gap-3"
		>
			<NuxtImg src="/logo_svg.svg" width="30" height="30" class="size-16" />
			<h1 class="text-2xl font-semibold">Подтверждение почты</h1>

			<UPinInput
				v-model="tokenInput"
				autofocus
				:disabled="isLoading"
				:length="6"
			/>
			<h2 class="text-sm max-w-80 text-center font-semibold text-neutral-700">
				На почту, привязанную к аккаунту пришел 6-значный код, укажите его здесь
			</h2>
		</div>
	</section>
</template>

<style scoped></style>
