import { Text } from "@julseb-lib/react"
import { Page } from "components"

export const ErrorPage = () => {
	return (
		<Page title="500" type="none">
			<Text tag="h1">An error occurred</Text>

			<Text>Please reload the page.</Text>
		</Page>
	)
}
