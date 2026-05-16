import Button from '../../components/Button';
import Home from '../../assets/images/home.jpg';
import { useEffect, useState } from 'react';
import { getArticles } from '../../services/ArticleService';
import defaultArticles from '../../data/article-content';

const HomePage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await getArticles();
                const apiArticles = res?.articles ?? [];
                
                // Merge with default articles to ensure images are available
                const mergedArticles = apiArticles.map(apiArticle => {
                    const defaultArticle = defaultArticles.find(a => a.slug === apiArticle.slug);
                    return {
                        ...apiArticle,
                        image: apiArticle.image || defaultArticle?.image,
                        isFeatured: apiArticle.isFeatured !== undefined ? apiArticle.isFeatured : defaultArticle?.isFeatured,
                        isActive: apiArticle.isActive !== undefined ? apiArticle.isActive : defaultArticle?.isActive,
                    };
                });
                
                setArticles(mergedArticles.length > 0 ? mergedArticles : defaultArticles);
            } catch (e) {
                console.error(e);
                // Fallback to default articles if API fails
                setArticles(defaultArticles);
            }
        })();
    }, []);

    const featuredArticles = articles.filter((article) => article.isFeatured && article.isActive);

    return (
        <div className="flex w-full flex-col">
            <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 border border-zinc-200/60">

                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600">
                            Hero Section
                        </p>

                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-teal-900 sm:text-4xl">
                            Introduction
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                            A transferee student who is still adjusting to a new environment, he sees this as a valuable opportunity to learn new things, improve his skills, and meet new people. He is eager to grow academically and collaborate with his classmates throughout his journey here at National University. 
                        </p>

                        <div className="mt-6">
                            <Button to="/about" variant="primary"> 
                                Learn More
                            </Button>
                        </div>
                    </div>

                    <img src={Home} className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100"/>
                </div> 
            </section>

            <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 border border-zinc-200/60">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600">
                        Motivational Status
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold text-teal-900">Personality Focus</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-3xl border-3 border-zinc-300/70 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">

                        <p className="text-2xl font-extrabold text-teal-600">100%</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Passion
                        </p>
                    </div>
                    <div className="rounded-3xl border-3 border-zinc-300/70 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                        <p className="text-2xl font-extrabold text-teal-600">24/7</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Learning
                        </p>
                    </div>
                    <div className="rounded-3xl border-3 border-zinc-300/70 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                        <p className="text-2xl font-extrabold text-teal-600">4</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Strengths
                        </p>
                    </div>
                    <div className="rounded-3xl border-3 border-zinc-300/70 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                        <p className="text-2xl font-extrabold text-teal-600">1</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Goal
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 border border-zinc-200/60">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600">
                        Feature Cards
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold text-teal-900">Favorite Activities</h2> 
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {featuredArticles.length ? (
                        featuredArticles.map((article) => (
                            <article key={article.slug} className="flex flex-col rounded-3xl border-3 border-zinc-300/70 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                                <div>
                                    <img src={article.image} className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-teal-200" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-black">{article.title}</h3>

                                <p className="mt-3 text-sm leading-6 text-black">
                                    {String(article.content || '').split('\n\n')[0].substring(0, 200)}...
                                </p>
                                <Button to={`/articles/${article.slug}`} className="mt-auto" variant="primary">
                                    Read Article
                                </Button>
                            </article>
                        ))
                    ) : (
                        <div className="rounded-3xl border-3 border-zinc-300/70 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                            <h3 className="text-lg font-semibold text-black">No featured articles available</h3>
                            <p className="mt-3 text-sm leading-6 text-black">Enable featured article status in the dashboard to show articles here.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
