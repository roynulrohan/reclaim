import { createFileRoute, Link } from '@tanstack/react-router';
import { Button, buttonVariants } from '@/components/ui/button';

const Index = () => {
    return (
        <section className='my-auto flex flex-col items-center gap-4 text-center'>
            <h1 className='font-heading text-4xl font-semibold tracking-tight sm:text-5xl'>Lost and found, handled.</h1>
            <p className='max-w-md text-lg text-muted-foreground'>Record found items, log inquiries and track returns in one place.</p>
            <div className='mt-2 flex gap-2'>
                {/* Wired up to the login page once frontend auth is built. */}
                <Button size='lg'>Staff log in</Button>
                <Link to='/about' className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                    About
                </Link>
            </div>
        </section>
    );
};

export const Route = createFileRoute('/')({
    component: Index,
});
