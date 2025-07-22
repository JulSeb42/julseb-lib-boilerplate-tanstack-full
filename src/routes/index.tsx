import { createFileRoute } from "@tanstack/react-router"
import { Text } from "@julseb-lib/react"
import { Page } from "components"

const App: FC = () => {
	return (
		<Page title="Homepage" type="none">
			<Text tag="h1">Hello World</Text>
		</Page>
	)
}

export const Route = createFileRoute("/")({
	component: App,
})
