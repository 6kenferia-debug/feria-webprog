import Button from '../components/Button';
import Article from '../assets/images/article.png';
import Image1 from '../assets/images/VGrid_01.jpg';
import Image2 from '../assets/images/VGrid_02.jpg';
import Image3 from '../assets/images/VGrid_03.png';
import Image4 from '../assets/images/VGrid_04.png';

const ArticlePage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Articles
                        </p>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                            Just a Casual Coder
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                            A clean wireframe section for article thumbnails, titles, short descriptions, and one clear action per card.
                        </p>
                        <div className="mt-6">
                            <Button to="/">
                                Back Home
                            </Button>
                        </div>
                    </div>
                    <img src={Article} className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100"/>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="mb-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Featured Articles
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                    Daily Information
                </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                    <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200">
                        <img src={Image1} className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200"/>
                    </div>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                        Article 01
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                        How it Started
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">
                        A brief story of how I started IT and what interests me.
                    </p>
                    <Button className="mt-4">Read More</Button> 
                </article>

                <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                    <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200">
                        <img src={Image2} className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200"/>
                    </div>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                        Article 02
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                        My Coding Journey
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-600"> 
                        My experiences and what got me into coding.
                    </p>
                    <Button className="mt-4">Read More</Button> 
                </article>

                <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                    <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200">
                        <img src={Image3} className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200"/>
                    </div>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                        Article 03
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                        My Favorite Games
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">
                        The games that shaped my skills and interest.
                    </p>
                    <Button className="mt-4">Read More</Button> 
                </article>

                <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                    <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200">
                        <img src={Image4} className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200"/>
                    </div>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                        Article 04
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                        My Gaming Goals
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">
                        What I want to achieve in my gaming career. 
                    </p>
                    <Button className="mt-4">Read More</Button> 
                </article>
            </div>
        </section>
    </div>
    );
};

export default ArticlePage;