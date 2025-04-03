import type { MinMaxValue, Nutrition, TextWithLangs } from '~/types/types'
import { privateApi } from './interceptors'
import { API_ROUTES } from '~/config/apiRoutes'

export interface CategoryDto {
	title: TextWithLangs
	hrefId: string
}
export interface ProductsDto {
	name: TextWithLangs
	description: TextWithLangs
	price: MinMaxValue
	volumes: MinMaxValue
	nutrition: Nutrition
	categoryId: string
	image: string
	composition: string[]
}
export type UpdateProductsDto = Partial<ProductsDto>

export const productsService = {
	async createCategory(dto: CategoryDto) {
		return await privateApi.post(API_ROUTES.CATEGORIES.CREATE_CATEGORY, dto)
	},
	async updateCategory(dto: Partial<CategoryDto>, categoryId: string) {
		return await privateApi.patch(
			API_ROUTES.CATEGORIES.UPDATE_CATEGORY(categoryId),
			dto
		)
	},
	async deleteCategory(categoryId: string) {
		return await privateApi.delete(
			API_ROUTES.CATEGORIES.DELETE_CATEGORY(categoryId)
		)
	},
	async getCategories() {
		return await privateApi.get(API_ROUTES.CATEGORIES.INDEX)
	},
	async getProducts() {
		return await privateApi.get(API_ROUTES.PRODUCTS.INDEX)
	},
	async deleteProductById(productId: string) {
		return await privateApi.delete(
			API_ROUTES.PRODUCTS.DELETE_PRODUCT(productId)
		)
	},
	async createProduct(dto: ProductsDto) {
		return await privateApi.post(API_ROUTES.PRODUCTS.CREATE_PRODUCT, dto)
	},
	async updateProduct(productId: string, dto: UpdateProductsDto) {
		return await privateApi.patch(
			API_ROUTES.PRODUCTS.UPDATE_PRODUCT(productId),
			dto
		)
	},
}
