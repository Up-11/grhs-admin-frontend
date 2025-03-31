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
</script>

<template>
	<aside class="h-screen fixed inset-y-0 bg-slate-100 w-[250px] pt-20 p-4">
		<h2 class="font-bold text-2xl">Секции</h2>
		<div class="mt-2 flex flex-col gap-1">
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
		</div>
	</aside>
</template>

<style scoped></style>
