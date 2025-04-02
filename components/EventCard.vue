<script setup lang="ts">
import type { IEvent } from '~/types/types'
import dayjs from 'dayjs'

defineProps<{ event: Omit<IEvent, 'formattedDate'> }>()
</script>

<template>
	<div class="max-w-[620px]">
		<div
			class="relative flex rounded-lg flex-col text-gray-700 bg-white shadow-md bg-clip-border w-80"
		>
			<div
				class="relative overflow-hidden text-gray-700 bg-white bg-clip-border h-70"
			>
				<NuxtImg
					:src="formatUrl(event.image)"
					alt="card-image"
					class="object-cover w-full h-full rounded-tl-lg rounded-tr-lg"
				/>
			</div>
			<div class="p-6">
				<div class="flex items-center justify-between mb-2">
					<h2
						class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900"
					>
						{{ event.name.ru }}
					</h2>
					<p class="text-green-700 font-semibold">
						{{ dayjs(event.date).format('MM/DD') }}
					</p>
				</div>
				<p
					class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75"
				>
					{{ event.description.ru }}
				</p>
			</div>
			<div class="p-6 pt-0 flex justify-end items-center gap-2">
				<EventPreview :event="event">
					<UButton color="neutral" icon="lucide:pen">Редактировать</UButton>
				</EventPreview>
			</div>
		</div>
	</div>
</template>
