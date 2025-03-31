export const ROUTES = {
	INDEX: '/',
	SECTIONS: {
		MENU: '/menu',
		HOME: '/home',
		EVENTS: '/events',
		ADMINISTRATORS: '/administration',
	},
	AUTH: {
		LOGIN: '/login',
		VERIFY: '/verify-email',
	},
} as const

export const ROUTE_VALUES = getAllValues(ROUTES)

export const UNAUTHORIZED_ROUTES: string[] = [
	ROUTES.AUTH.LOGIN,
	ROUTES.AUTH.VERIFY,
]

export const AUTHORIZED_ROUTES: string[] = ROUTE_VALUES.filter(
	route => !UNAUTHORIZED_ROUTES.includes(route)
)

type DeepStringValues<T> = T extends object
	? { [K in keyof T]: DeepStringValues<T[K]> }[keyof T]
	: T extends string
	? T
	: never

export type Routes = DeepStringValues<typeof ROUTES>
