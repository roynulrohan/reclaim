import { createFileRoute, Link, redirect, type SearchSchemaInput } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { useAuth } from '@/auth';
import { LoginForm } from '@/components/login-form';
import { buttonVariants } from '@/components/ui/button';

// Validate redirect target to prevent open redirect attacks.
function sanitizeRedirect(url: unknown): string {
    if (typeof url !== 'string' || !url.startsWith('/') || url.startsWith('//')) {
        return '/dashboard';
    }
    return url;
}

const Login = () => {
    const auth = useAuth();
    const navigate = Route.useNavigate();
    const { redirect: redirectTo } = Route.useSearch();

    const handleLogin = async (username: string, password: string) => {
        await auth.login(username, password);
        await navigate({ to: redirectTo });
    };

    return (
        <div className='relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
            <Link to='/' className={buttonVariants({ variant: 'ghost', className: 'absolute top-4 left-4 md:top-8 md:left-8' })}>
                <ArrowLeftIcon />
                Back
            </Link>
            <span className='font-heading text-lg font-semibold tracking-tight'>Reclaim</span>
            <LoginForm className='w-full max-w-sm' onLogin={handleLogin} />
        </div>
    );
};

export const Route = createFileRoute('/login')({
    validateSearch: (search: { redirect?: string } & SearchSchemaInput) => ({
        redirect: sanitizeRedirect(search.redirect),
    }),
    beforeLoad: ({ context, search }) => {
        // Redirect if already authenticated
        if (context.auth.isAuthenticated) {
            throw redirect({ to: search.redirect });
        }
    },
    component: Login,
});
