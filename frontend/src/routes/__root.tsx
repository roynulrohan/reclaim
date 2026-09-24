import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { AuthState } from '@/auth';

interface RouterContext {
    auth: AuthState;
}

const RootLayout = () => (
    <>
        <Outlet />
        <TanStackRouterDevtools />
    </>
);

export const Route = createRootRouteWithContext<RouterContext>()({ component: RootLayout });
