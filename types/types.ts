import type { DateValue } from '@internationalized/date'

export interface User {
	id: string
	email: string
	isEmailVerified: boolean
}
export interface IMainBlock {
	id: string
	title: TextWithLangs
	description: TextWithLangs
	imageSide: ImageSide
	position: number
	image: string
}
export interface IEvent {
	id: string
	name: TextWithLangs
	date: string
	description: TextWithLangs
	image: string
	content: EventContent
	formattedDate?: DateValue
}
export interface IProduct {
	id: string
	name: TextWithLangs
	description: TextWithLangs
	price: MinMaxValue
	volumes: MinMaxValue
	nutrition: Nutrition
	composition: string[]
	categoryId: string
	image: string
}
export type ImageSide = 'left' | 'right'

export type EventContent = Record<string, TextWithLangs>
export type TextWithLangs = {
	ru: string
	en: string
}

export type MinMaxValue = {
	value: number
	max: number
}

export type Nutrition = {
	calories: {
		value: number
		max: number
		title: NUTRITION.CALORIES
	}
	proteins: {
		value: number
		max: number
		title: NUTRITION.PROTEINS
	}
	fats: {
		value: number
		max: number
		title: NUTRITION.FATS
	}
	carbohydrates: {
		value: number
		max: number
		title: NUTRITION.CARBS
	}
}

export enum NUTRITION {
	CALORIES = 'nutrition.calories',
	PROTEINS = 'nutrition.proteins',
	FATS = 'nutrition.fats',
	CARBS = 'nutrition.carbs',
}
