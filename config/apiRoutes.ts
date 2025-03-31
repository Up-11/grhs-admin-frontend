export const API_ROUTES = {
	HOST: 'http://localhost:4200',
	BASE_URL: 'http://localhost:4200/api',
	GET_ALL_ADMINISTRATORS: '/administrators',
	AUTH: {
		LOGIN: '/authorization/sign-in',
		REGISTER: '/authorization/sign-up',
		VERIFY: '/verification',
	},
	BANNER: {
		INDEX: '/banner',
		GET_BANNERS: '/get-all',
		CREATE_BANNER: '/create-banner',
		UPDATE_BANNER: '/update-banner',
		DELETE_BANNER: (id: string) => `/delete-banner/${id}`,
		UPDATE_POSITION: '/update-position',
	},
	EVENTS: {
		INDEX: '/events',
		GET_BY_ID: (id: string) => `/get-by-id/${id}`,
		CREATE_EVENT: '/create-event',
		UPDATE_EVENT: (id: string) => `/update-event/${id}`,
		DELETE_EVENT: (id: string) => `/delete-event/${id}`,
	},
	PRODUCTS: {
		INDEX: '/products',
		CREATE_PRODUCT: '/create-product',
		UPDATE_PRODUCT: (id: string) => `/update-product/${id}`,
		DELETE_PRODUCT: (id: string) => `/delete-product/${id}`,
	},
	CATEGORIES: {
		INDEX: '/categories',
		CREATE_CATEGORY: '/create-category',
		UPDATE_CATEGORY: (id: string) => `/update-category/${id}`,
		DELETE_CATEGORY: (id: string) => `/delete-category/${id}`,
	},
} as const
