import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const AuthenticatedLayout = () => (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <Outlet />
        </SidebarInset>
    </SidebarProvider>
);

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: ({ context, location }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: { redirect: location.href },
            });
        }
    },
    component: AuthenticatedLayout,
});
