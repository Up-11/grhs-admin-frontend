import Cookies from 'js-cookie'

import { AUTHORIZED_ROUTES, ROUTES, UNAUTHORIZED_ROUTES } from '~/config/routes'

export default defineNuxtRouteMiddleware(to => {
	const store = useAuthStore()
	const { isLoggedIn } = store
	const accessToken = Cookies.get('accessToken')
	if (!accessToken && !store.email) {
		store.logout()
	}
	if (!isLoggedIn && AUTHORIZED_ROUTES.includes(to.path)) {
		store.initializeAuth()
	}

	if (isLoggedIn && UNAUTHORIZED_ROUTES.includes(to.path)) {
		return navigateTo(ROUTES.INDEX)
	}
})
