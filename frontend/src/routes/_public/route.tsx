import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { useAuth } from '@/auth';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { buttonVariants } from '@/components/ui/button';

const navLinkClass = buttonVariants({ variant: 'ghost', size: 'sm', className: 'data-[status=active]:bg-muted' });

const PublicLayout = () => {
    const { isAuthenticated } = useAuth();

    return (
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
                        {isAuthenticated ? (
                            <>
                                <Link to='/dashboard' className={buttonVariants({ size: 'sm', className: 'mx-2' })}>
                                    Dashboard
                                </Link>
                                <ProfileDropdown />
                            </>
                        ) : (
                            <Link to='/login' className={buttonVariants({ size: 'sm', className: 'ml-2' })}>
                                Log in
                            </Link>
                        )}
                    </nav>
                </div>
            </header>
            <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-16'>
                <Outlet />
            </main>
            <footer className='border-t'>
                <div className='mx-auto w-full max-w-5xl px-4 py-6 text-sm text-muted-foreground'>© 2026 Reclaim</div>
            </footer>
        </div>
    );
};

export const Route = createFileRoute('/_public')({ component: PublicLayout });
