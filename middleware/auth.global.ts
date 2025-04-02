import { AUTHORIZED_ROUTES, ROUTES, UNAUTHORIZED_ROUTES } from '~/config/routes'

export default defineNuxtRouteMiddleware(to => {
	const authStore = useAuthStore()

	if (UNAUTHORIZED_ROUTES.includes(to.path)) {
		const isAuth = authStore.initializeAuth()
		if (isAuth) {
			return navigateTo(ROUTES.INDEX)
		}
	}

	/* if (!authStore.isLoggedIn || !authStore.accessToken) {
		authStore.logout()
		console.log('un1')

		return navigateTo(ROUTES.AUTH.LOGIN)
	} */

	if (AUTHORIZED_ROUTES.includes(to.path)) {
		console.log('un2')

		const isAuth = authStore.initializeAuth()
		if (!isAuth) {
			return navigateTo(ROUTES.AUTH.LOGIN)
		}
	}
})
