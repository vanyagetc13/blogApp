import { format } from 'date-fns'

export default function getNormalDateString(date: string): string {
	if (!date) return ''
	return format(date, 'MMMM d, y')
}
