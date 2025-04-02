import { API_ROUTES } from '~/config/apiRoutes'
import { privateApi, publicApi } from './interceptors'
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

	async editProfile(
		dto: { email?: string; password?: string },
		userId: string
	) {
		return await privateApi.patch<IAuthData>(
			API_ROUTES.AUTH.EDIT_PROFILE(userId),
			{
				dto,
			}
		)
	},
	async deleteById(userId: string) {
		return await privateApi.delete<IAuthData>(
			API_ROUTES.AUTH.DELETE_BY_ID(userId)
		)
	},

	logout() {
		removeTokenFromStorage()
		localStorage.removeItem('user')
	},
}
