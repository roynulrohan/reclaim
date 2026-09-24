import { useEffect } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { AuthProvider, useAuth } from './auth';
import { TooltipProvider } from './components/ui/tooltip';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Set up a Router instance
const router = createRouter({
    routeTree,
    context: {
        auth: undefined!, // This will be set after we wrap the app in an AuthProvider
    },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const InnerApp = () => {
    const auth = useAuth();

    useEffect(() => {
        router.invalidate();
    }, [auth.user]);

    return <RouterProvider router={router} context={{ auth }} />;
};

export const App = () => (
    <AuthProvider>
        <TooltipProvider>
            <InnerApp />
        </TooltipProvider>
    </AuthProvider>
);
