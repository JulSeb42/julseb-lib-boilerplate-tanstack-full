import { Link, useNavigate, useLocation } from "@tanstack/react-router"
import { BiSun, BiMoon, BiPowerOff } from "react-icons/bi"
import { clsx, useLibTheme, Flexbox, Button } from "@julseb-lib/react"
import { adminNavLinks, adminNavBottomLinks } from "data"
import { useAuth } from "context"
import type { LibThemeNames } from "@julseb-lib/react/types"

const LINKS_COMMON = (theme: LibThemeNames) => [
	"flex items-center gap-1 px-4 py-1 focus:ring-0 text-left w-full rounded-none",
	theme === "dark"
		? "[&.active-page]:bg-primary-700 [&.active-page]:hover:bg-primary-600"
		: "[&.active-page]:bg-primary-300 [&.active-page]:text-primary-600 [&.active-page]:hover:bg-primary-200",
]

export const AdminNav: FC = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { theme, switchTheme } = useLibTheme()
	const { logoutUser } = useAuth()

	return (
		<nav
			className={clsx(
				"top-0 left-0 fixed flex flex-col justify-between py-12 w-(--admin-nav-width) h-svh",
				theme === "light" ? "bg-primary-100" : "bg-primary-900",
				"admin-nav",
			)}
		>
			<Flexbox flexDirection="col" element="section">
				{adminNavLinks.map((link, i) => (
					<Button
						element={Link}
						variant="transparent"
						color={theme === "dark" ? "white" : "primary"}
						// @ts-ignore
						to={link.to}
						className={clsx(
							LINKS_COMMON(theme),
							pathname === link.to && "active-page",
						)}
						key={i}
					>
						{link.icon}
						{link.text}
					</Button>
				))}
			</Flexbox>

			<Flexbox flexDirection="col" element="section">
				{adminNavBottomLinks.map((link, i) => (
					<Button
						element={Link}
						variant="transparent"
						color={theme === "dark" ? "white" : "primary"}
						// @ts-ignore
						to={link.to}
						className={clsx(
							LINKS_COMMON(theme),
							pathname === link.to && "active-page",
						)}
						key={i}
					>
						{link.icon}
						{link.text}
					</Button>
				))}

				<Button
					className={clsx(LINKS_COMMON(theme))}
					onClick={() => {
						logoutUser()
						navigate({ to: "/login" })
					}}
					variant="transparent"
					color={theme === "dark" ? "white" : "primary"}
				>
					<BiPowerOff />
					Logout
				</Button>

				<Button
					className={clsx(LINKS_COMMON(theme))}
					onClick={switchTheme}
					variant="transparent"
					color={theme === "dark" ? "white" : "primary"}
				>
					{theme === "dark" ? <BiSun /> : <BiMoon />}
					Switch theme
				</Button>
			</Flexbox>
		</nav>
	)
}
