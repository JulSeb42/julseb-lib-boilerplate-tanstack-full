import { useState, useEffect } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Text, Grid } from "@julseb-lib/react"
import { AdminPage, ErrorMessage, UserCardAdmin } from "components"
import { userService } from "api"
import type { IErrorMessage, User } from "types"

const Users: FC = () => {
	const [users, setUsers] = useState<Array<User>>()
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	useEffect(() => {
		if (!users) {
			userService
				.allUsers()
				.then(res => setUsers(res.data))
				.catch(err => {
					console.error(err)
					setErrorMessage(err.response.data.message)
				})
				.finally(() => setIsLoading(false))
		}
	}, [users])

	return (
		<AdminPage title="Users" isLoading={isLoading}>
			<Text tag="h1">Users</Text>

			{errorMessage ? (
				<ErrorMessage>{errorMessage}</ErrorMessage>
			) : (
				<Grid cols={4} gap="sm">
					{users?.map(user => (
						<UserCardAdmin
							user={user}
							users={users}
							setUsers={setUsers as any}
							key={user._id}
						/>
					))}
				</Grid>
			)}
		</AdminPage>
	)
}

export const Route = createFileRoute("/admin/users")({
	component: Users,
})
