<script lang="ts" setup></script>

<template>
	<div>
		<AppSidebar />
		<AppHeader />
		<main
			class="h-[100vh-80px] bg-white rounded-3xl mt-20 p-4 mr-2 mb-2 ml-[250px]"
		>
			<slot />
		</main>
	</div>
</template>

<style scoped></style>
