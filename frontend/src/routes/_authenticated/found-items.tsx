import { createFileRoute } from '@tanstack/react-router';
import { ComingSoon } from '@/components/layout/coming-soon';
import { PageHeader } from '@/components/layout/page-header';

const FoundItems = () => (
    <>
        <PageHeader title='Found items' />
        <ComingSoon />
    </>
);

export const Route = createFileRoute('/_authenticated/found-items')({
    component: FoundItems,
});
