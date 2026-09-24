import { createFileRoute } from '@tanstack/react-router';
import { ComingSoon } from '@/components/layout/coming-soon';
import { PageHeader } from '@/components/layout/page-header';

const Dashboard = () => (
    <>
        <PageHeader title='Dashboard' />
        <ComingSoon />
    </>
);

export const Route = createFileRoute('/_authenticated/dashboard')({
    component: Dashboard,
});
