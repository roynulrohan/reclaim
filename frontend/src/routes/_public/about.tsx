import { createFileRoute } from '@tanstack/react-router';

const About = () => {
    return (
        <section className='my-auto flex flex-col items-center gap-4 text-center'>
            <h1 className='font-heading text-4xl font-semibold tracking-tight'>About</h1>
            <p className='max-w-md text-lg text-muted-foreground'>
                A second page to show routing. It lives in <code className='font-mono text-base'>src/routes/_public/about.tsx</code>.
            </p>
        </section>
    );
};

export const Route = createFileRoute('/_public/about')({
    component: About,
});
