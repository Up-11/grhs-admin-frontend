export const useConfigUrl = () => {
	const runtimeConfig = useRuntimeConfig()
	const configUrl = (url: string) => {
		return `${runtimeConfig.public.apiUrl}/${url}`
	}

	return {
		configUrl,
	}
}
