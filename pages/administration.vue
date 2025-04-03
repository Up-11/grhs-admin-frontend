<script lang="ts" setup>
import Skeleton from '@nuxt/ui/runtime/components/Skeleton.vue'
import { AuthService } from '~/api/auth.service'
import type { User } from '~/types/types'

definePageMeta({
	title: 'Администрация',
})
const admins = ref<User[] | null>(null)

const isOpen = ref<boolean>(false)

const { data, status, refresh } = useAuthFetch<User[]>(
	'http://localhost:4200/api/authorization'
)

watch(
	data,
	newData => {
		admins.value = newData || []
	},
	{ immediate: true }
)
const toast = useToast()

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

const onDelete = async (id: string) => {
	await deleteAcc(id)
	refresh()
}

const closeCollapsible = () => {
	isOpen.value = false
}
</script>

<template>
	<section>
		<h1 class="text-2xl font-bold">Мониторинг админов</h1>
		<UCollapsible
			v-model="isOpen"
			:unmount-on-hide="false"
			class="flex flex-col gap-2 w-full"
		>
			<UButton
				label="Добавить нового администратора в систему"
				color="neutral"
				variant="soft"
				trailing-icon="i-lucide-chevron-down"
				block
				size="lg"
				class="mt-10"
			/>

			<template #content>
				<div class="w-full h-full flex flex-col items-center justify-center">
					<UAlert
						color="neutral"
						variant="outline"
						title="Будьте внимательны!"
						description="Вводите только существующую электронную почту, она потребуется при входе администратора в аккаунт."
						icon="lucide:mark"
					/>
					<AddAdminForm
						class="mt-5"
						@refresh="refresh"
						@close-collapsible="closeCollapsible"
					/>
				</div>
			</template>
		</UCollapsible>
		<div class="flex flex-col gap-4">
			<h2 class="text-xl text-center font-semibold mb-4">
				Действующие администраторы
			</h2>
			<div v-if="status === 'success'" class="flex flex-col gap-3">
				<AdminCard
					v-for="admin in admins"
					:id="admin.id"
					:key="admin.id"
					:email="admin.email"
					class="w-full"
				>
					<template #controls>
						<UButton
							color="neutral"
							icon="lucide:menu"
							@click="onDelete(admin.id)"
						/>
					</template>
				</AdminCard>
			</div>
			<div v-else-if="status === 'pending'" class="flex flex-col gap-3">
				<Skeleton v-for="i in 3" :key="i" class="w-full h-10" />
			</div>
		</div>
	</section>
</template>
