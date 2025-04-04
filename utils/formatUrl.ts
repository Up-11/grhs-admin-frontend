export default function formatUrl(path: string) {
	const { $config } = useNuxtApp()
	return `http://api.up-mailer.ru/${path}`
}
