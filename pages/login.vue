<script lang="ts" setup>
definePageMeta({
	title: 'Логин',
	layout: 'auth',
})
</script>

<template>
	<section
		class="w-full h-screen flex flex-col justify-center items-center mx-auto"
	>
		<div
			class="bg-slate-100 flex flex-col items-center justify-center rounded-lg p-10 gap-3"
		>
			<NuxtImg src="/logo_svg.svg" width="30" height="30" class="size-16" />
			<h1 class="text-2xl font-semibold">Вход в админ панель</h1>
			<LoginForm />
		</div>
	</section>
</template>

<style scoped></style>
