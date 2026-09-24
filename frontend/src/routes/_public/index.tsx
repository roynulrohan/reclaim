import { createFileRoute, Link } from '@tanstack/react-router';
import { buttonVariants } from '@/components/ui/button';

const Index = () => {
    return (
        <section className='my-auto flex flex-col items-center gap-4 text-center'>
            <h1 className='font-heading text-4xl font-semibold tracking-tight sm:text-5xl'>Reclaim</h1>
            <p className='text-lg text-muted-foreground'>Lost and Found Management System</p>
            <p className='text-sm text-muted-foreground'>CST8319 Software Development Project - Group 8</p>
            <div className='mt-2 flex gap-2'>
                <Link to='/login' className={buttonVariants({ size: 'lg' })}>
                    Staff log in
                </Link>
                <Link to='/about' className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                    About
                </Link>
            </div>
        </section>
    );
};

export const Route = createFileRoute('/_public/')({
    component: Index,
});
