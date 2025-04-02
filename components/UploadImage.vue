<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
	(e: 'image-change', file: string | null): void
}>()

const fileInput = ref<HTMLInputElement>()
const isDragging = ref(false)

const { uploadFile, previewUrl } = useUploadFiles((url: string) => {
	emit('image-change', url)
})

const handleDrop = (e: DragEvent) => {
	e.preventDefault()
	isDragging.value = false
	if (e.dataTransfer?.files?.[0]) {
		uploadFile(e)
	}
}

const handleDragOver = (e: DragEvent) => {
	e.preventDefault()
	isDragging.value = true
}

const triggerFileInput = () => {
	fileInput.value?.click()
}

const deleteFile = () => {
	emit('image-change', null)
}
</script>

<template>
	<div
		class="relative w-full h-80 rounded-lg overflow-hidden"
		@click="triggerFileInput"
		@drop="handleDrop"
		@dragover.prevent="handleDragOver"
		@dragleave.prevent="isDragging = false"
	>
		<div
			v-if="previewUrl"
			class="absolute inset-0 bg-cover bg-center z-10"
			:style="{ backgroundImage: `url(${previewUrl})` }"
		/>

		<div
			class="absolute inset-0 bg-black/50 z-20 flex flex-col justify-center items-center transition-all"
			:class="{
				'bg-black/70': isDragging,
				'cursor-pointer': !isDragging,
			}"
		>
			<input
				ref="fileInput"
				type="file"
				class="hidden"
				accept="image/*"
				@change="uploadFile"
			/>

			<div
				class="text-center p-6 border-2 border-dashed rounded-lg transition-all"
				:class="{
					'border-white/50': !isDragging,
					'border-primary-500 scale-105': isDragging,
				}"
			>
				<UIcon
					name="i-heroicons-cloud-arrow-up"
					class="w-12 h-12 mx-auto mb-4 text-white"
					:class="{ 'text-primary-400': isDragging }"
				/>

				<p class="text-white text-lg font-medium mb-2">
					{{
						isDragging
							? 'Отпустите для загрузки'
							: 'Нажмите или перетащите фото'
					}}
				</p>

				<p class="text-gray-300 text-sm">Поддерживаются JPG, PNG до 10MB</p>

				<UButton
					v-if="previewUrl"
					icon="lucide:x"
					color="error"
					variant="outline"
					label="Удалить фото"
					class="mt-4"
					@click.stop="deleteFile"
				/>
			</div>
		</div>
	</div>
</template>
