import type { User } from "types"

export interface IUserCardAdmin {
	user: User
	users: Array<User>
	setUsers: DispatchState<Array<User>>
	currentPage: number
	paginatedData: Array<User>
}
