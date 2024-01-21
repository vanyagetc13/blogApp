export default function getSlicedText(text: string, size: number): string {
	const words = text.split(' ')
	return words.slice(0, size).join(' ')
}
