<script lang="ts" setup>
import { CalendarDate, type DateValue } from '@internationalized/date'
import { eventService, type EventDto } from '~/api/event.service'
import { eventsRefreshKey } from '~/lib/keys'
import type { IEvent, TextWithLangs } from '~/types/types'

const props = defineProps<{ event: IEvent }>()
const dates = mutateDateToCalendarDate(props.event.date)
const injected = inject(eventsRefreshKey)

const currentEvent = ref<IEvent>({
	...props.event,
	formattedDate: new CalendarDate(dates[0], dates[1], dates[2]),
})

const isEditing = ref<boolean>(false)
const isOpen = ref<boolean>(false)

const toast = useToast()

const contentEntries = computed(
	() => (items: IEvent) => Object.entries(items.content || {})
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
	mutationFn: (data: EventDto) => eventService.updateEvent(data),
	onSuccess() {
		toast.add({
			title: 'Событие успешно обновлено',
			color: 'success',
		})
	},
	onError(err) {
		toast.add({
			title: 'Ошибка при обновлении события',
			description: err.message,
			color: 'error',
		})
	},
})

const { mutate: remove } = useMutation({
	mutationFn: (id: string) => eventService.deleteEvent(id),
	onSuccess() {
		toast.add({
			title: 'Событие успешно удалено',
			color: 'success',
		})
	},
	onError(err) {
		toast.add({
			title: 'Ошибка при удалении события',
			description: err.message,
			color: 'error',
		})
	},
})

const deleteEvent = async (id: string) => {
	await remove(id)
	injected?.()
	isOpen.value = false
}

const updateEvent = async () => {
	const newEvent: EventDto = {
		id: currentEvent.value.id,
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
			<div v-if="!isEditing">
				<div class="w-full px-2 flex items-center justify-center overflow-auto">
					<NuxtImg
						:src="formatUrl(event.image)"
						alt="Event preview"
						class="w-full h-80 object-cover rounded-lg"
					/>
				</div>
				<div
					class="container mx-auto flex flex-col justify-center items-center mt-10"
				>
					<TwoLangText :text="event.name" />
					<TwoLangText :text="event.description" />

					<div class="mt-4 flex flex-col max-w-200 gap-2">
						<TwoLangText
							v-for="[key, text] in contentEntries(event)"
							:key="key"
							class="text-xl font-medium text-center"
							:text="text"
						/>
					</div>
				</div>
			</div>
			<div v-else>
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
							<h1 class="text-gray-500 dark:text-gray-400">
								Фото не загружено
							</h1>
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
							v-for="[key, text] in contentEntries(currentEvent as IEvent)"
							:key="key"
							class="flex items-center gap-3"
						>
							<TwoLangInput
								:text="text"
								class="flex-1"
								@update:text="newText => updateContent(key, newText)"
							/>
							<UButton
								icon="i-heroicons-x-mark"
								size="sm"
								variant="ghost"
								color="error"
								label="Удалить раздел"
								@click="deleteContentElement(key)"
							/>
						</div>

						<UButton
							icon="i-heroicons-plus"
							label="Добавить раздел"
							variant="outline"
							class="mt-4"
							@click="addContentElement"
						/>
					</div>
				</div>
			</div>
		</template>
		<template #footer>
			<div class="flex flex-col gap-1">
				<UPopover>
					<UButton
						icon="lucide:calendar"
						:label="
							isEditing
								? 'Поменять дату' + ' | ' + currentEvent.formattedDate
								: 'Дата' + ' | ' + currentEvent.formattedDate
						"
						color="neutral"
						variant="soft"
						class="self-center"
					/>
					<template #content>
						<div class="p-4">
							<UCalendar
								v-model="currentEvent.formattedDate as DateValue"
								:disabled="!isEditing"
								:week-starts-on="1"
							/></div
					></template>
				</UPopover>
				<div class="flex gap-3 w-full">
					<UButton
						label="Удалить"
						class="w-full"
						color="error"
						@click="deleteEvent(event.id)"
					/>
					<UButton
						:label="isEditing ? 'Отменить' : 'Редактировать'"
						class="w-full"
						color="neutral"
						@click="isEditing = !isEditing"
					/>
					<UButton
						v-if="isEditing"
						label="Применить"
						color="success"
						class="w-full"
						@click="updateEvent"
					/>
				</div>
			</div>
		</template>
	</UDrawer>
</template>
<style scoped></style>
