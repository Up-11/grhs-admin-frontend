import { AUTHORIZED_ROUTES, ROUTES, UNAUTHORIZED_ROUTES } from '~/config/routes'

export default defineNuxtRouteMiddleware(to => {
	const authStore = useAuthStore()

	if (UNAUTHORIZED_ROUTES.includes(to.path)) {
		if (authStore.isLoggedIn) {
			console.log('un0')

			return navigateTo(ROUTES.INDEX)
		}
		console.log('un1')

		return
	}

	if (!authStore.isLoggedIn || !authStore.accessToken) {
		authStore.logout()
		console.log('un1')

		return navigateTo(ROUTES.AUTH.LOGIN)
	}

	if (AUTHORIZED_ROUTES.includes(to.path)) {
		console.log('un2')

		authStore.initializeAuth()
	}
})
