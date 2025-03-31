import { API_ROUTES } from '~/config/apiRoutes'
import { publicApi } from '../interceptors'
import {
	removeTokenFromStorage,
	saveToStorage,
	type IAuthData,
} from './auth.helpers'

export const AuthService = {
	async login(email: string, password: string) {
		const res = await publicApi.post<{ success: boolean; message: string }>(
			API_ROUTES.AUTH.LOGIN,
			{
				email,
				password,
			}
		)
		if (res.data.success) return res.data
	},

	async register(email: string, password: string) {
		await publicApi.post<IAuthData>(API_ROUTES.AUTH.REGISTER, {
			email,
			password,
		})
	},

	async verifyEmail(token: string) {
		const response = await publicApi.post<IAuthData>(API_ROUTES.AUTH.VERIFY, {
			token,
		})
		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	logout() {
		removeTokenFromStorage()
		localStorage.removeItem('user')
	},
}
