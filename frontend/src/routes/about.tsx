import { createFileRoute } from '@tanstack/react-router';

const About = () => {
    return (
        <main className='flex grow items-center justify-center px-5 py-16'>
            <section className='w-full max-w-xl rounded-lg border border-(--border) bg-(--social-bg) p-8 text-left'>
                <h2>About</h2>
                <p>Hello from About!</p>
            </section>
        </main>
    );
};

export const Route = createFileRoute('/about')({
    component: About,
});
