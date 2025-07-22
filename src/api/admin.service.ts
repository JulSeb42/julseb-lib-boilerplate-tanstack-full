import { http } from "./http-common"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"
import type { ApiResponse } from "types"

type PATHS = keyof typeof SERVER_PATHS.ADMIN

const generateRoute = (route: Exclude<PATHS, "ROOT">, id?: string) =>
	generateServerRoute("ADMIN", route, id)

class AdminService {
	resetPassword = async (id: string): ApiResponse<{ message: string }> =>
		await http.post(generateRoute("RESET_PASSWORD", id))

	deleteUser = async (id: string): ApiResponse<{ message: string }> =>
		await http.delete(generateRoute("DELETE_USER", id))
}

export const adminService = new AdminService()
