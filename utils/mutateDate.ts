import type { DateValue } from '@internationalized/date'

export const mutateDateToCalendarDate = (date: string): number[] => {
	const onlyDate = date.split('T')[0].split('-')

	return [+onlyDate[0], +onlyDate[1], +onlyDate[2]]
}
export const mutateDateToString = (date: DateValue): string => {
	return `${date.year}/${date.month}/${date.day}`
}
