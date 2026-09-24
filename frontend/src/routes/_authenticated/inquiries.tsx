import { createFileRoute } from '@tanstack/react-router';
import { ComingSoon } from '@/components/layout/coming-soon';
import { PageHeader } from '@/components/layout/page-header';

const Inquiries = () => (
    <>
        <PageHeader title='Inquiries' />
        <ComingSoon />
    </>
);

export const Route = createFileRoute('/_authenticated/inquiries')({
    component: Inquiries,
});
