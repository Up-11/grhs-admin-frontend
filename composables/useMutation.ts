import type { AxiosError } from 'axios'
import { ref } from 'vue'

interface UseMutationOptions<T, V> {
	mutationFn: (variables: V) => Promise<T>
	onSuccess?: (data: T) => void
	onError?: (error: Error) => void
}

export function useMutation<T, V>({
	mutationFn,
	onSuccess,
	onError,
}: UseMutationOptions<T, V>) {
	const data = ref<T | null>(null)
	const error = ref<Error | null>(null)
	const isLoading = ref(false)

	const mutate = async (variables: V) => {
		isLoading.value = true
		error.value = null

		try {
			const result = await mutationFn(variables)
			data.value = result

			if (onSuccess) onSuccess(result)
		} catch (err) {
			const axiosError = err as AxiosError

			const errorMessage =
				axiosError?.response?.data?.message || 'Неизвестная ошибка'

			error.value = axiosError

			if (onError) {
				onError(new Error(errorMessage))
			}
		} finally {
			isLoading.value = false
		}
	}

	return { mutate, data, error, isLoading }
}
