/* eslint-disable @typescript-eslint/no-explicit-any */

import { MediaService } from '~/api/media.service'

export const useUploadFiles = (onChange: (e: any) => void, folder?: string) => {
	const toast = useToast()
	const previewUrl = ref<string | null>(null)

	const { mutate } = useMutation({
		mutationFn: (data: FormData) => MediaService.upload(data, folder),
		onSuccess: ({ data }) => {
			toast.add({
				title: 'Файл загружен',
				description: 'Файл успешно загружен',
				color: 'success',
			})

			onChange(data.url)
		},
		onError: error => {
			toast.add({
				title: 'Ошибка загрузки',
				description: error.message,
				color: 'error',
			})
		},
	})

	const uploadFile = async (e: Event) => {
		try {
			const target = e.target as HTMLInputElement
			const file = target.files?.[0]
			if (!file) return

			const reader = new FileReader()
			reader.onload = e => {
				previewUrl.value = e.target?.result as string
				onChange(previewUrl.value)
			}
			reader.readAsDataURL(file)

			const formData = new FormData()
			formData.append('media', file)

			await mutate(formData)
		} catch (error) {
			console.error(error)
		}
	}

	return { uploadFile, previewUrl }
}
