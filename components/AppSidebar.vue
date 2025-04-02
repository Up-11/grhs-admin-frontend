<script setup lang="ts">
import { ROUTES } from '~/config/routes'

const sections = [
	{
		label: 'Главная страница',
		link: ROUTES.SECTIONS.HOME,
	},
	{
		label: 'События',
		link: ROUTES.SECTIONS.EVENTS,
	},
	{
		label: 'Меню',
		link: ROUTES.SECTIONS.MENU,
	},
	{
		label: 'Администраторы',
		link: ROUTES.SECTIONS.ADMINISTRATORS,
	},
]

const router = useRouter()
const store = useAuthStore()
</script>

<template>
	<aside class="h-screen fixed inset-y-0 w-[250px] pt-25 p-4">
		<h2 class="font-bold text-2xl">Секции</h2>
		<div class="mt-2 flex flex-col h-full gap-1">
			<UButton
				v-for="section in sections"
				:key="section.label"
				:to="section.link"
				:label="section.label"
				variant="soft"
				color="neutral"
				:class="[
					'w-full',
					section.link === router.currentRoute.value.path
						? 'text-green-800'
						: '',
				]"
				size="lg"
			/>
			<ApproveModal
				@approve="
					() =>
						store.logout(() => {
							router.replace(ROUTES.AUTH.LOGIN)
						})
				"
			>
				<UTooltip text="Выход из системы">
					<UButton
						class="mt-auto mb-10"
						label=" Выйти"
						variant="soft"
						color="neutral"
						size="lg" /></UTooltip
			></ApproveModal>
		</div>
	</aside>
</template>

<style scoped></style>
