import Cookies from 'js-cookie'

export interface IAuthData {
	user: IUser | null
	accessToken: string
}

export const saveTokenToStorage = (accessToken: string) => {
	Cookies.set('accessToken', accessToken)
}

export const removeTokenFromStorage = () => {
	Cookies.remove('accessToken')
	localStorage.removeItem('like-storage')
}

export const saveToStorage = (data: IAuthData) => {
	saveTokenToStorage(data.accessToken)
	localStorage.setItem('user', JSON.stringify(data.user))
}
