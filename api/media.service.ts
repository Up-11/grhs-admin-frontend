import { API_ROUTES } from '~/config/apiRoutes'
import { privateApi } from './interceptors'

export interface IMediaResponse {
	name: string
	url: string
}

export const MediaService = {
	async upload(media: FormData, folder?: string) {
		return privateApi.post<IMediaResponse>(API_ROUTES.MEDIA, media, {
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	},
}
