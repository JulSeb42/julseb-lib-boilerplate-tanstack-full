import { http } from "./http-common"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"
import type { ApiResponse, EditPasswordFormData, User } from "types"

type PATHS = keyof typeof SERVER_PATHS.USERS

const generateRoute = (route: Exclude<PATHS, "ROOT">, id?: string) =>
	generateServerRoute("USERS", route, id)

class UserService {
	allUsers = async (): ApiResponse<Array<User>> =>
		await http.get(generateRoute("ALL_USERS"))

	getUser = async (id: string): ApiResponse<User> =>
		await http.get(generateRoute("GET_USER", id))

	editAccount = async (id: string, data: {}) =>
		await http.put(generateRoute("EDIT_ACCOUNT", id), data)

	editPassword = async (id: string, data: EditPasswordFormData) =>
		await http.put(generateRoute("EDIT_PASSWORD", id), data)

	adminResetPassword = async () => await http.put("")

	deleteAccount = async (id: string) =>
		await http.delete(generateRoute("DELETE_ACCOUNT", id))
}

export const userService = new UserService()
