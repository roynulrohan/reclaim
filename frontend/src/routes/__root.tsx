import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => (
    <>
        <header className='flex items-center justify-between gap-4 border-b border-(--border) px-8 py-4 max-[1024px]:px-5'>
            <Link to='/' className='text-lg font-semibold tracking-tight text-(--text-h) no-underline hover:text-(--accent)'>
                Reclaim
            </Link>
            <nav aria-label='Main navigation' className='flex items-center gap-2 text-sm'>
                <Link
                    to='/'
                    activeOptions={{ exact: true }}
                    className='rounded-md px-3 py-2 text-(--text) no-underline hover:bg-(--social-bg) hover:text-(--text-h) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) [&.active]:bg-(--accent-bg) [&.active]:text-(--accent)'>
                    Home
                </Link>
                <Link
                    to='/about'
                    className='rounded-md px-3 py-2 text-(--text) no-underline hover:bg-(--social-bg) hover:text-(--text-h) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) [&.active]:bg-(--accent-bg) [&.active]:text-(--accent)'>
                    About
                </Link>
            </nav>
        </header>
        <Outlet />
        <TanStackRouterDevtools />
    </>
);

export const Route = createRootRoute({ component: RootLayout });
