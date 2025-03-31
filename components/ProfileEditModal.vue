import { EditProfileForm } from '../.nuxt/content/components';
<script lang="ts" setup></script>

<template>
	<UModal title="Редактирование личных данных">
		<slot />
		<template #body>
			<EditProfileForm />
		</template>
	</UModal>
</template>
