import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticles } from '../../services/ArticleService';
import NotFoundPage from '../NotFoundPage.jsx';
import Button from '../../components/Button';
import placeholderImage from '../../assets/images/article.png';
import defaultArticles from '../../data/article-content';

const ArticlePage = () => {
    const { name } = useParams();
    const [article, setArticle] = useState(null);
    const [allArticles, setAllArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const normalizeArticles = (articles) => {
            return articles.map((apiArticle) => {
                const defaultArticle = defaultArticles.find((a) => a.name === apiArticle.name);
                const normalizedContent = Array.isArray(apiArticle.content)
                    ? apiArticle.content
                    : typeof apiArticle.content === 'string'
                        ? apiArticle.content.split(/\n\n|\n/).map((line) => line.trim()).filter(Boolean)
                        : defaultArticle?.content ?? [];

                return {
                    ...apiArticle,
                    imageUrl: apiArticle.imageUrl || defaultArticle?.imageUrl || placeholderImage,
                    content: normalizedContent,
                };
            });
        };

        const fetchArticleData = async () => {
            try {
                const response = await getArticles();
                const articlesList = response.data?.data || [];
                const sourceArticles = articlesList.length > 0 ? articlesList : defaultArticles;
                const normalizedArticles = normalizeArticles(sourceArticles);

                setAllArticles(normalizedArticles);
                const foundArticle = normalizedArticles.find((a) => a.name === name);
                setArticle(foundArticle || null);
            } catch (error) {
                console.error('Error loading article:', error);
                const normalizedArticles = normalizeArticles(defaultArticles);
                setAllArticles(normalizedArticles);
                const foundArticle = normalizedArticles.find((a) => a.name === name);
                setArticle(foundArticle || null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticleData();
    }, [name]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-zinc-500 animate-pulse font-bold tracking-widest">LOADING CONTENT...</p>
            </div>
        );
    }

    if (!article) return <NotFoundPage />;

    const featuredArticles = allArticles
        .filter((item) => item.name !== name)
        .slice(0, 3);

    return (
        <div className="mx-auto max-w-4xl px-6 py-12 lg:py-20">
            <div className="mb-12 flex items-center justify-between border-b border-zinc-200 pb-6">
                <Link 
                    to="/articles" 
                    className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-teal-600 transition hover:text-teal-900"
                >
                    <span className="transition-transform group-hover:-translate-x-1">←</span>
                    Back to Articles
                </Link>
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                    {Math.ceil(article.content.join('').length / 1000)} min read
                </span>
            </div>

            <div className="mb-12 overflow-hidden rounded-3xl border-2 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)]">
                {article.imageUrl ? (
                    <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        onError={(e) => { e.currentTarget.src = placeholderImage; }}
                        className="aspect-video w-full object-cover"
                    />
                ) : (
                    <img 
                        src={placeholderImage} 
                        alt={article.title} 
                        className="aspect-video w-full object-cover"
                    />
                )}
            </div>

            {/* Article Content */}
            <article>
                <h1 className="text-4xl font-black tracking-tighter text-zinc-900 md:text-6xl text-balance mb-8">
                    {article.title}
                </h1>

                <div className="prose prose-zinc max-w-none">
                    {article.content && article.content.map((paragraph, i) => (
                        <p key={i} className="mb-6 text-lg leading-relaxed text-zinc-600">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </article>

            <section className="mt-20 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 border border-zinc-200/60">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600">
                        Feature Cards
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-teal-900">More Stories</h2>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {featuredArticles.length ? (
                        featuredArticles.map((item) => {
                            const preview = Array.isArray(item.content)
                                ? item.content[0] || ''
                                : String(item.content || '');

                            return (
                                <article
                                    key={item.name}
                                    className="flex flex-col rounded-3xl border-3 border-zinc-300/70 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]"
                                >
                                    <div>
                                        <img
                                            src={item.imageUrl || placeholderImage}
                                            alt={item.title}
                                            onError={(event) => { event.currentTarget.src = placeholderImage; }}
                                            className="flex aspect-4/3 w-full items-center justify-center rounded-[1.25rem] bg-teal-200 object-cover"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold text-black">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-black">
                                        {preview.substring(0, 200)}{preview.length > 200 ? '...' : ''}
                                    </p>
                                    <Button to={`/articles/${item.name}`} className="mt-auto" variant="primary">
                                        Read Article
                                    </Button>
                                </article>
                            );
                        })
                    ) : (
                        <div className="rounded-3xl border-3 border-zinc-300/70 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                            <h3 className="text-lg font-semibold text-black">No related stories</h3>
                            <p className="mt-3 text-sm leading-6 text-black">Check back later for more content in the dashboard.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer Action */}
            <div className="mt-20 border-t border-zinc-200 pt-10 text-center">
                <h3 className="text-xl font-bold text-zinc-900">Want more updates?</h3>
                <p className="mt-2 text-zinc-500">Subscribe to my newsletter for future academic and IT insights.</p>
                <button className="mt-6 rounded-full bg-teal-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-teal-700">
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default ArticlePage;
