import { useState } from 'react';
import heroImg from './assets/hero.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <section
                id='center'
                className='flex grow flex-col place-content-center place-items-center gap-6.25 max-[1024px]:gap-4.5 max-[1024px]:px-5 max-[1024px]:pt-8 max-[1024px]:pb-6'>
                <div className='relative'>
                    <img src={heroImg} className='relative inset-x-0 z-0 mx-auto w-42.5' width='170' height='179' alt='' />
                    <img
                        src={reactLogo}
                        className='absolute inset-x-0 top-8.5 z-1 mx-auto h-7 transform-[perspective(2000px)_rotateZ(300deg)_rotateX(44deg)_rotateY(39deg)_scale(1.4)]'
                        alt='React logo'
                    />
                    <img
                        src={viteLogo}
                        className='absolute inset-x-0 top-26.75 z-0 mx-auto h-6.5 w-auto transform-[perspective(2000px)_rotateZ(300deg)_rotateX(40deg)_rotateY(39deg)_scale(0.8)]'
                        alt='Vite logo'
                    />
                </div>
                <div>
                    <h1>Get started</h1>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
                    </p>
                </div>
                <button
                    type='button'
                    className='mb-6 inline-flex rounded-[5px] border-2 border-transparent bg-(--accent-bg) px-2.5 py-1.25 [font-family:var(--mono)] text-[16px] text-(--accent) [transition:border-color_0.3s] hover:border-(--accent-border) focus-visible:[outline:2px_solid_var(--accent)] focus-visible:outline-offset-2'
                    onClick={() => setCount((count) => count + 1)}>
                    Count is {count}
                </button>
            </section>

            <div className="relative w-full before:absolute before:top-[-4.5px] before:left-0 before:border-[5px] before:border-transparent before:border-l-(--border) before:content-[''] after:absolute after:top-[-4.5px] after:right-0 after:border-[5px] after:border-transparent after:border-r-(--border) after:content-['']"></div>

            <section id='next-steps' className='flex border-t border-(--border) text-left max-[1024px]:flex-col max-[1024px]:text-center'>
                <div
                    id='docs'
                    className='flex-[1_1_0] border-r border-(--border) p-8 max-[1024px]:border-r-0 max-[1024px]:border-b max-[1024px]:px-5 max-[1024px]:py-6'>
                    <svg className='mb-4 size-5.5' role='presentation' aria-hidden='true'>
                        <use href='/icons.svg#documentation-icon'></use>
                    </svg>
                    <h2>Documentation</h2>
                    <p>Your questions, answered</p>
                    <ul className='m-0 mt-8 flex list-none gap-2 p-0 max-[1024px]:mt-5 max-[1024px]:flex-wrap max-[1024px]:justify-center'>
                        <li className='max-[1024px]:flex-[1_1_calc(50%-8px)]'>
                            <a
                                className='box-border flex items-center gap-2 rounded-md bg-(--social-bg) px-3 py-1.5 text-[16px] text-(--text-h) no-underline [transition:box-shadow_0.3s] hover:shadow-(--shadow) max-[1024px]:w-full max-[1024px]:justify-center'
                                href='https://vite.dev/'
                                target='_blank'>
                                <img className='h-4.5' src={viteLogo} alt='' />
                                Explore Vite
                            </a>
                        </li>
                        <li className='max-[1024px]:flex-[1_1_calc(50%-8px)]'>
                            <a
                                className='box-border flex items-center gap-2 rounded-md bg-(--social-bg) px-3 py-1.5 text-[16px] text-(--text-h) no-underline [transition:box-shadow_0.3s] hover:shadow-(--shadow) max-[1024px]:w-full max-[1024px]:justify-center'
                                href='https://react.dev/'
                                target='_blank'>
                                <img className='size-4.5' src={reactLogo} alt='' />
                                Learn more
                            </a>
                        </li>
                    </ul>
                </div>
                <div id='social' className='flex-[1_1_0] p-8 max-[1024px]:px-5 max-[1024px]:py-6'>
                    <svg className='mb-4 size-5.5' role='presentation' aria-hidden='true'>
                        <use href='/icons.svg#social-icon'></use>
                    </svg>
                    <h2>Connect with us</h2>
                    <p>Join the Vite community</p>
                    <ul className='m-0 mt-8 flex list-none gap-2 p-0 max-[1024px]:mt-5 max-[1024px]:flex-wrap max-[1024px]:justify-center'>
                        <li className='max-[1024px]:flex-[1_1_calc(50%-8px)]'>
                            <a
                                className='box-border flex items-center gap-2 rounded-md bg-(--social-bg) px-3 py-1.5 text-[16px] text-(--text-h) no-underline [transition:box-shadow_0.3s] hover:shadow-(--shadow) max-[1024px]:w-full max-[1024px]:justify-center'
                                href='https://github.com/vitejs/vite'
                                target='_blank'>
                                <svg className='size-4.5 dark:filter-[invert(1)_brightness(2)]' role='presentation' aria-hidden='true'>
                                    <use href='/icons.svg#github-icon'></use>
                                </svg>
                                GitHub
                            </a>
                        </li>
                        <li className='max-[1024px]:flex-[1_1_calc(50%-8px)]'>
                            <a
                                className='box-border flex items-center gap-2 rounded-md bg-(--social-bg) px-3 py-1.5 text-[16px] text-(--text-h) no-underline [transition:box-shadow_0.3s] hover:shadow-(--shadow) max-[1024px]:w-full max-[1024px]:justify-center'
                                href='https://chat.vite.dev/'
                                target='_blank'>
                                <svg className='size-4.5 dark:filter-[invert(1)_brightness(2)]' role='presentation' aria-hidden='true'>
                                    <use href='/icons.svg#discord-icon'></use>
                                </svg>
                                Discord
                            </a>
                        </li>
                        <li className='max-[1024px]:flex-[1_1_calc(50%-8px)]'>
                            <a
                                className='box-border flex items-center gap-2 rounded-md bg-(--social-bg) px-3 py-1.5 text-[16px] text-(--text-h) no-underline [transition:box-shadow_0.3s] hover:shadow-(--shadow) max-[1024px]:w-full max-[1024px]:justify-center'
                                href='https://x.com/vite_js'
                                target='_blank'>
                                <svg className='size-4.5 dark:filter-[invert(1)_brightness(2)]' role='presentation' aria-hidden='true'>
                                    <use href='/icons.svg#x-icon'></use>
                                </svg>
                                X.com
                            </a>
                        </li>
                        <li className='max-[1024px]:flex-[1_1_calc(50%-8px)]'>
                            <a
                                className='box-border flex items-center gap-2 rounded-md bg-(--social-bg) px-3 py-1.5 text-[16px] text-(--text-h) no-underline [transition:box-shadow_0.3s] hover:shadow-(--shadow) max-[1024px]:w-full max-[1024px]:justify-center'
                                href='https://bsky.app/profile/vite.dev'
                                target='_blank'>
                                <svg className='size-4.5 dark:filter-[invert(1)_brightness(2)]' role='presentation' aria-hidden='true'>
                                    <use href='/icons.svg#bluesky-icon'></use>
                                </svg>
                                Bluesky
                            </a>
                        </li>
                    </ul>
                </div>
            </section>

            <div className="relative w-full before:absolute before:top-[-4.5px] before:left-0 before:border-[5px] before:border-transparent before:border-l-(--border) before:content-[''] after:absolute after:top-[-4.5px] after:right-0 after:border-[5px] after:border-transparent after:border-r-(--border) after:content-['']"></div>
            <section id='spacer' className='h-22 border-t border-(--border) max-[1024px]:h-12'></section>
        </>
    );
}

export default App;
