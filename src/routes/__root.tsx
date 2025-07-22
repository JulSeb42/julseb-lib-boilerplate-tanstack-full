import { Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { ToastContainer, ThemeProviderWrapper } from "@julseb-lib/react"
import {
	AuthProviderWrapper,
	ModalOpenProviderWrapper,
	/* Prepend context import - DO NOT REMOVE */
} from "context"
import { ErrorPage, NotFoundPage } from "pages"

export const Route = createRootRoute({
	component: () => (
		<ThemeProviderWrapper>
			<AuthProviderWrapper>
				<ModalOpenProviderWrapper>
					<Outlet />
					<ToastContainer position="bottom-right" />
					<TanStackRouterDevtools />
				</ModalOpenProviderWrapper>
			</AuthProviderWrapper>
		</ThemeProviderWrapper>
	),
	errorComponent: ErrorPage,
	notFoundComponent: NotFoundPage,
})
