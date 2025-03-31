<script lang="ts" setup>
import Skeleton from '@nuxt/ui/runtime/components/Skeleton.vue'
import type { User } from '~/types/types'

definePageMeta({
	title: 'Администрация',
})
const admins = ref<User[] | null>(null)

const { data, status } = useFetch<User[]>(
	'http://localhost:4200/api/authorization',
	{ server: false }
)

watch(
	data,
	newData => {
		admins.value = newData || []
	},
	{ immediate: true }
)

const operatingAdmins = computed(() =>
	admins.value?.filter(admin => admin.isEmailVerified)
)
const notOperatingAdmins = computed(() =>
	admins.value?.filter(admin => !admin.isEmailVerified)
)
</script>

<template>
	<section>
		<h1 class="text-2xl font-bold">Мониторинг админов</h1>
		<UCollapsible :unmount-on-hide="false" class="flex flex-col gap-2 w-full">
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
					<AddAdminForm class="mt-5" />
				</div>
			</template>
		</UCollapsible>
		<div class="grid grid-cols-2 gap-8 items-start mt-5">
			<div class="flex flex-col gap-4">
				<h2 class="text-xl text-center font-semibold mb-4">
					Действующие администраторы
				</h2>
				<div v-if="status === 'success'" class="flex flex-col gap-3">
					<AdminCard
						v-for="admin in operatingAdmins"
						:id="admin.id"
						:key="admin.id"
						:email="admin.email"
						class="w-full"
					/>
				</div>
				<div v-else-if="status === 'pending'" class="flex flex-col gap-3">
					<Skeleton v-for="i in 3" :key="i" class="w-full h-10" />
				</div>
			</div>

			<div class="flex flex-col gap-4">
				<h2 class="text-xl text-center font-semibold mb-4">
					Не прошедшие верификацию
				</h2>
				<div v-if="status === 'success'" class="flex flex-col gap-3">
					<AdminCard
						v-for="admin in notOperatingAdmins"
						:id="admin.id"
						:key="admin.id"
						:email="admin.email"
						class="w-full"
					/>
				</div>
				<div v-else-if="status === 'pending'" class="flex flex-col gap-3">
					<Skeleton v-for="i in 3" :key="i" class="w-full h-10" />
				</div>
			</div>
		</div>
	</section>
</template>
