import { ProfileEditModal } from '../.nuxt/components';
<script setup lang="ts"></script>

<template>
	<header
		class="h-20 w-full flex items-center bg-slate-100 z-10 fixed top-0 justify-between inset-x-0 pr-4"
	>
		<AppLogo />
		<div class="flex items-center">
			<ProfileEditModal>
				<UButton
					variant="soft"
					color="neutral"
					label="Редактировать профиль"
					icon="lucide:user"
				/>
			</ProfileEditModal>
		</div>
	</header>
</template>

<style scoped></style>
