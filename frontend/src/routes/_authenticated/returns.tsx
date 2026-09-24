import { createFileRoute } from '@tanstack/react-router';
import { ComingSoon } from '@/components/layout/coming-soon';
import { PageHeader } from '@/components/layout/page-header';

const Returns = () => (
    <>
        <PageHeader title='Returns' />
        <ComingSoon />
    </>
);

export const Route = createFileRoute('/_authenticated/returns')({
    component: Returns,
});
