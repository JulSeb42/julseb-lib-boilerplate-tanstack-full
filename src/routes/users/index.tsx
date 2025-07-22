import { useState, useEffect } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Text, usePaginatedData } from "@julseb-lib/react"
import { Page, ErrorMessage, UserCard, Pagination } from "components"
import { userService } from "api"
import type { IErrorMessage, User } from "types"

const Users: FC = () => {
	const { page } = Route.useLoaderDeps()

	const [users, setUsers] = useState<Array<User>>(undefined as any)
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	useEffect(() => {
		if (!users) {
			userService
				.allUsers()
				.then(res => setUsers(res.data))
				.catch(err => setErrorMessage(err.response.data.message))
				.finally(() => setIsLoading(false))
		}
	}, [users])

	const { paginatedData, totalPages } = usePaginatedData(users, Number(page))

	return (
		<Page title="Users" type="none" isLoading={isLoading}>
			<Text tag="h1">Users</Text>

			{errorMessage ? (
				<ErrorMessage>{errorMessage}</ErrorMessage>
			) : users?.length ? (
				<div className="gap-4 grid grid-cols-4">
					{paginatedData.map(user => (
						<UserCard user={user} key={user._id} />
					))}
				</div>
			) : (
				<Text>No user yet.</Text>
			)}

			<Pagination totalPages={totalPages} currentPage={Number(page)} />
		</Page>
	)
}

type UsersPages = {
	page?: number | null
}

export const Route = createFileRoute("/users/")({
	component: Users,
	validateSearch: (search: Record<string, unknown>): UsersPages => {
		return { page: Number(search.page ?? 1) }
	},
	loaderDeps: ({ search: { page } }) => ({ page }),
})
