<script setup>
import { onMounted } from 'vue'

const authStore = useUserStore()

onMounted(() => {
	authStore.initializeAuth()
})
</script>

<template>
	<slot v-if="!authStore.isLoading" />
	<div v-else>LOADING</div>
</template>
