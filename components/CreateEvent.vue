<script lang="ts" setup>
import { CalendarDate, type DateValue } from '@internationalized/date'
import { eventService, type CreateEventDto } from '~/api/event.service'
import { eventsRefreshKey } from '~/lib/keys'
import type { IEvent, TextWithLangs } from '~/types/types'

const initialEvent: Omit<IEvent, 'id'> = {
	name: {
		en: 'New Event',
		ru: 'Новое событие',
	},
	description: {
		en: 'Event description',
		ru: 'Описание события',
	},
	image: '',
	date: new Date().toISOString(),
	content: {
		main: {
			en: 'Main content section',
			ru: 'Основной раздел контента',
		},
	},
}

const dates = mutateDateToCalendarDate(initialEvent.date)
const injected = inject(eventsRefreshKey)

const currentEvent = ref<Omit<IEvent, 'id'>>({
	...initialEvent,
	formattedDate: new CalendarDate(dates[0], dates[1], dates[2]),
})

const isOpen = ref<boolean>(false)

const toast = useToast()

const contentEntries = computed(() =>
	Object.entries(currentEvent.value.content || {})
)

const updateContent = (key: string, newText: TextWithLangs) => {
	if (!currentEvent.value) return

	currentEvent.value = {
		...currentEvent.value,
		content: {
			...currentEvent.value.content,
			[key]: newText,
		},
	}
}
const addContentElement = () => {
	const key = `section_${Date.now()}`
	currentEvent.value.content = {
		...currentEvent.value.content,
		[key]: {
			ru: 'Новый раздел',
			en: 'new section',
		},
	}
}
const deleteContentElement = (key: string) => {
	if (!currentEvent.value) return

	const { [key]: _, ...rest } = currentEvent.value.content
	currentEvent.value.content = rest
}

const createImage = (file: string | null) => {
	if (!file) {
		currentEvent.value.image = ''
	}
	currentEvent.value.image = file || ''
}

const { mutate } = useMutation({
	mutationFn: (data: CreateEventDto) => eventService.createEvent(data),
	onSuccess() {
		toast.add({
			title: 'Событие успешно создано',
			color: 'success',
		})
	},
	onError(err) {
		toast.add({
			title: 'Ошибка при создании события',
			description: err.message,
			color: 'error',
		})
	},
})

const createEvent = async () => {
	const newEvent: CreateEventDto = {
		name: unref(currentEvent.value.name),
		description: unref(currentEvent.value.description),
		image: currentEvent.value.image,
		date: new Date(
			mutateDateToString(currentEvent.value.formattedDate as DateValue)
		),
		content: unref(currentEvent.value.content),
	}

	await mutate(newEvent)
	injected?.()
	isOpen.value = false
}
</script>

<template>
	<UDrawer
		v-model:open="isOpen"
		:ui="{
			content: 'w-200',
		}"
		direction="right"
		inset
		:handle-only="true"
		:handle="false"
		title="Предпросмотр события"
	>
		<slot />
		<template #body>
			<div class="w-full px-2 flex items-center justify-center relative h-80">
				<div class="w-full h-full rounded-lg overflow-hidden">
					<NuxtImg
						v-if="currentEvent.image"
						:src="formatUrl(currentEvent.image)"
						alt="Event preview"
						class="w-full h-full object-cover"
					/>
					<div
						v-else
						class="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
					>
						<h1 class="text-gray-500 dark:text-gray-400">Фото не загружено</h1>
					</div>
				</div>

				<div
					class="absolute inset-0 flex flex-col justify-center items-center z-20"
				>
					<UploadImage
						class="w-full h-full"
						@image-change="file => createImage(file)"
					/>
				</div>
			</div>

			<div class="flex flex-col mt-10">
				<div class="flex flex-col gap-1 justify-start items-start">
					<h3 class="text-lg">Название и описание</h3>

					<TwoLangInput
						:text="currentEvent.name"
						class="w-full mb-6 self-start"
						@update:text="text => (currentEvent.name = text)"
					/>

					<TwoLangInput
						:text="currentEvent.description"
						class="w-full mb-6 self-start"
						@update:text="text => (currentEvent.description = text)"
					/>
				</div>

				<div
					class="w-full flex flex-col gap-4 justify-start items-start space-y-4"
				>
					<h3 class="text-lg">Секции</h3>
					<div
						v-for="[key, text] in contentEntries"
						:key="key"
						class="flex items-center gap-3"
					>
						<TwoLangInput
							:text="text"
							class="flex-1"
							@update:text="newText => updateContent(key, newText)"
						/>
						<UButton
							icon="lucide:x"
							size="sm"
							variant="ghost"
							color="error"
							label="Удалить раздел"
							@click="deleteContentElement(key)"
						/>
					</div>

					<UButton
						icon="lucide:plus"
						label="Добавить раздел"
						variant="outline"
						class="mt-4"
						@click="addContentElement"
					/>
				</div>
			</div>
		</template>
		<template #footer>
			<div class="flex flex-col gap-1">
				<UPopover>
					<UButton
						icon="lucide:calendar"
						:label="'Поменять дату' + ' | ' + currentEvent.formattedDate"
						color="neutral"
						variant="soft"
						class="self-center"
					/>
					<template #content>
						<div class="p-4">
							<UCalendar
								v-model="currentEvent.formattedDate as DateValue"
								:year-controls="false"
								:week-starts-on="1"
							/></div
					></template>
				</UPopover>
				<div class="flex gap-3 w-full">
					<UButton
						label="Создать"
						color="success"
						class="w-full"
						@click="createEvent"
					/>
				</div>
			</div>
		</template>
	</UDrawer>
</template>
<style scoped></style>
