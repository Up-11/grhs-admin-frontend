<script setup lang="ts">
import ContentBlock from '~/components/ContentBlock.vue'
</script>

<template>
	<section>
		<h1 class="text-3xl">Панель управления</h1>
		<div class="grid-cols-4 mt-4 gap-10 items-center grid">
			<ContentBlock
				class="col-span-2"
				title="Главная страница"
				text="Поменять контент расположенный на главной странице"
				link="/home"
				image-src="/Change-Setting-3--Streamline-Milano.png"
			/>
			<ContentBlock
				class="col-span-2"
				title="События"
				text="Добавить, изменить, удалить событие"
				link="/events"
				image-src="/Welcome-4--Streamline-Milano.png"
			/>
			<ContentBlock
				class="col-span-2"
				title="Меню"
				text="Изменить меню"
				link="/menu"
				image-src="/Coffee-Tea-4--Streamline-Milano.png"
			/>
			<ContentBlock
				class="col-span-2"
				title="Администраторы"
				text="Добавить нового администратора"
				link="/administration"
				image-src="/Security-3--Streamline-Milano.png"
			/>
		</div>
	</section>
</template>
