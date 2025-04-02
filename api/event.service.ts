import { privateApi } from './interceptors'
import { API_ROUTES } from '~/config/apiRoutes'
import type { EventContent, TextWithLangs } from '~/types/types'

export interface EventDto {
	id: string
	name?: TextWithLangs
	description?: TextWithLangs
	date?: Date
	image?: string
	content: EventContent
}
export type CreateEventDto = Omit<EventDto, 'id'>

export const eventService = {
	async updateEvent(event: EventDto) {
		const response = await privateApi.patch(
			API_ROUTES.EVENTS.UPDATE_EVENT(event.id),
			event
		)
		return response.data
	},
	async deleteEvent(id: string) {
		const response = await privateApi.delete(API_ROUTES.EVENTS.DELETE_EVENT(id))
		return response.data
	},
	async createEvent(event: CreateEventDto) {
		const response = await privateApi.post(
			API_ROUTES.EVENTS.CREATE_EVENT,
			event
		)
		return response.data
	},
}
