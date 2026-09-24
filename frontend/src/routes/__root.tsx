import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Button, buttonVariants } from '@/components/ui/button';

// Links styled as buttons. TanStack Router sets data-status="active" on the link for the current page.
const navLinkClass = buttonVariants({ variant: 'ghost', size: 'sm', className: 'data-[status=active]:bg-muted' });

const RootLayout = () => (
    <div className='flex min-h-svh flex-col'>
        <header className='border-b'>
            <div className='mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4'>
                <Link to='/' className='font-heading text-base font-semibold tracking-tight'>
                    Reclaim
                </Link>
                <nav aria-label='Main navigation' className='flex items-center gap-1'>
                    <Link to='/' activeOptions={{ exact: true }} className={navLinkClass}>
                        Home
                    </Link>
                    <Link to='/about' className={navLinkClass}>
                        About
                    </Link>
                    {/* Wired up to the login page once frontend auth is built. */}
                    <Button size='sm' className='ml-2'>
                        Log in
                    </Button>
                </nav>
            </div>
        </header>
        <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-16'>
            <Outlet />
        </main>
        <footer className='border-t'>
            <div className='mx-auto w-full max-w-5xl px-4 py-6 text-sm text-muted-foreground'>© 2026 Reclaim</div>
        </footer>
        <TanStackRouterDevtools />
    </div>
);

export const Route = createRootRoute({ component: RootLayout });
