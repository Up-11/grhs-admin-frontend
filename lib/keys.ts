import type { CategoryWithProducts } from '~/pages/menu.vue'

export const eventsRefreshKey = Symbol() as InjectionKey<() => Promise<void>>

export const categoriesKey = Symbol() as InjectionKey<
	Ref<CategoryWithProducts[]>
>

export const productsRefreshKey = Symbol() as InjectionKey<() => Promise<void>>
