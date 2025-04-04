<script lang="ts" setup>
import CreateEvent from '~/components/CreateEvent.vue'
import { API_ROUTES } from '~/config/apiRoutes'
import { eventsRefreshKey } from '~/lib/keys'
import type { IEvent } from '~/types/types'

definePageMeta({
	title: 'События',
})

const events = ref<IEvent[]>([])

const { data, refresh, status } = useAuthFetch<IEvent[]>(
	`${API_ROUTES.BASE_URL} ${API_ROUTES.EVENTS.INDEX}`
)

provide(eventsRefreshKey, refresh)

watch(
	data,
	newValue => {
		events.value = newValue || []
		console.log(events.value)
	},
	{ immediate: true }
)
</script>

<template>
	<div class="h-screen">
		<header class="flex items-center justify-between">
			<h1 class="text-2xl font-bold">Мониторинг событий</h1>
			<CreateEvent>
				<UButton icon="lucide:bell-plus" variant="outline" color="neutral"
					>Добавить новое событие</UButton
				>
			</CreateEvent>
		</header>
		<USeparator class="my-2" />
		<section>
			<h2 class="text-xl font-bold">Список событий</h2>
			<div v-if="status === 'success'" class="grid grid-cols-3 gap-5 mt-4">
				<EventCard v-for="event in events" :key="event.id" :event="event" />
			</div>
			<div v-else-if="status === 'pending'" class="grid grid-cols-3 gap-5 mt-4">
				<USkeleton v-for="i in 9" :key="i" class="w-full h-70" />
			</div>
		</section>
	</div>
</template>
