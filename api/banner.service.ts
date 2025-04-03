import type { ImageSide, TextWithLangs } from '~/types/types'
import { privateApi } from './interceptors'
import { API_ROUTES } from '~/config/apiRoutes'

export interface CreateBannerDto {
	id?: string
	title: TextWithLangs
	description: TextWithLangs
	image: string
	imageSide: ImageSide
}
export type UpdateBannerDto = Partial<CreateBannerDto>

export const bannerService = {
	async updateBanner(dto: UpdateBannerDto) {
		const response = await privateApi.patch(
			API_ROUTES.BANNER.UPDATE_BANNER,
			dto
		)
		return response.data
	},
	async changePosition(newPos: number, bannerId: string) {
		const response = await privateApi.patch(API_ROUTES.BANNER.UPDATE_POSITION, {
			newPos,
			bannerId,
		})
		return response.data
	},
	async deleteBanner(bannerId: string) {
		const response = await privateApi.delete(
			API_ROUTES.BANNER.DELETE_BANNER(bannerId)
		)
		return response.data
	},
	async createBanner(dto: CreateBannerDto) {
		const response = await privateApi.post(API_ROUTES.BANNER.CREATE_BANNER, dto)
		return response.data
	},
}
