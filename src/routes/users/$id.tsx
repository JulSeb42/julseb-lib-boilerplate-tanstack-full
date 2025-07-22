import { useState, useEffect } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Page, UserHeader, ErrorMessage } from "components"
import { userService } from "api"
import type { IErrorMessage, User } from "types"

const User: FC = () => {
	const { id } = Route.useParams()
	const [user, setUser] = useState<User>(undefined as any)
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	useEffect(() => {
		if (!user) {
			userService
				.getUser(id)
				.then(res => {
					setUser(res.data)
				})
				.catch(err => setErrorMessage(err.response.data.message))
				.finally(() => setIsLoading(false))
		}
	}, [user])

	return (
		<Page title="User" type="none" isLoading={isLoading}>
			{errorMessage ? (
				<ErrorMessage>{errorMessage}</ErrorMessage>
			) : (
				<UserHeader user={user} isPublic />
			)}
		</Page>
	)
}

export const Route = createFileRoute("/users/$id")({
	component: User,
})
