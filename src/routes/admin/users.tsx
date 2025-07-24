import { useState, useEffect } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Text, Grid, usePaginatedData, Input } from "@julseb-lib/react"
import { AdminPage, ErrorMessage, Pagination, UserCardAdmin } from "components"
import { userService } from "api"
import type { IErrorMessage, User } from "types"

const Users: FC = () => {
	const { page } = Route.useLoaderDeps()
	const navigate = useNavigate()

	const [users, setUsers] = useState<Array<User>>(undefined as any)
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	const [search, setSearch] = useState({ search: "", role: "none" })
	const handleSearch = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setSearch({ ...search, [e.target.id]: e.target.value })
		navigate({ to: "/admin/users", search: { page: 1 } })
	}

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

	let allUsers = users

	if (search.search) {
		allUsers = users?.filter(user =>
			user.fullName.toLowerCase().includes(search.search.toLowerCase()),
		)
	}

	if (search.role !== "none") {
		allUsers = users?.filter(user => user.role === search.role)
	}

	const { paginatedData, totalPages } = usePaginatedData(
		allUsers,
		Number(page),
	)

	return (
		<AdminPage title="Users" isLoading={isLoading}>
			<Text tag="h1">Users</Text>

			<Grid cols={2} gap="sm">
				<Input
					label="Search by name"
					id="search"
					value={search.search}
					onChange={handleSearch}
				/>

				<Input
					label="Filter by role"
					id="role"
					type="select"
					value={search.role}
					onChange={handleSearch}
				>
					<option value="none">None</option>
					<option value="user">User</option>
					<option value="admin">Admin</option>
				</Input>
			</Grid>

			{errorMessage ? (
				<ErrorMessage>{errorMessage}</ErrorMessage>
			) : (
				<Grid cols={4} gap="sm">
					{paginatedData?.map(user => (
						<UserCardAdmin
							user={user}
							users={users}
							setUsers={setUsers as any}
							currentPage={Number(page)}
							paginatedData={paginatedData}
							key={user._id}
						/>
					))}
				</Grid>
			)}

			<Pagination totalPages={totalPages} currentPage={Number(page)} />
		</AdminPage>
	)
}

export const Route = createFileRoute("/admin/users")({
	component: Users,
	validateSearch: (search: Record<string, unknown>): UsersPages => {
		return { page: Number(search.page ?? 1) }
	},
	loaderDeps: ({ search: { page } }) => ({ page }),
})

type UsersPages = {
	page?: number | null
}
