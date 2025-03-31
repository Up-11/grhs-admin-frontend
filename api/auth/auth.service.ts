import { API_ROUTES } from '~/config/apiRoutes'
import { publicApi } from '../interceptors'
import {
	removeTokenFromStorage,
	saveToStorage,
	type IAuthData,
	type ILoginResponse,
	type IVerifyResponse,
} from './auth.helpers'

export const AuthService = {
	async login(email: string, password: string) {
		const res = await publicApi.post<ILoginResponse>(API_ROUTES.AUTH.LOGIN, {
			email,
			password,
		})
		if (res.data.authData) {
			saveToStorage(res.data.authData)
		}
		return res.data
	},

	async register(email: string, password: string) {
		await publicApi.post<IAuthData>(API_ROUTES.AUTH.REGISTER, {
			email,
			password,
		})
	},

	async verifyEmail(token: string) {
		const response = await publicApi.post<IVerifyResponse>(
			API_ROUTES.AUTH.VERIFY,
			{
				token,
			}
		)
		if (response.data.accessToken) {
			const data = {
				user: response.data.user,
				accessToken: response.data.accessToken,
			}
			saveToStorage(data)
		}

		return response.data
	},

	logout() {
		removeTokenFromStorage()
		localStorage.removeItem('user')
	},
}
