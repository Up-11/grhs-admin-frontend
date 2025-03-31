/* eslint-disable @typescript-eslint/no-explicit-any */
export const useAuthFetch = <T>(url: string, options: any = {}) => {
	const token = useCookie('accessToken').value

	return useFetch<T>(url, {
		...options,
		headers: {
			...options.headers,
			Authorization: token ? `Bearer ${token}` : '',
			'Content-Type': 'application/json',
		},
		baseURL: useRuntimeConfig().public.apiUrl,
		onResponseError({ response }) {
			if (response.status === 401) {
				navigateTo('/login')
			}
		},
	})
}
