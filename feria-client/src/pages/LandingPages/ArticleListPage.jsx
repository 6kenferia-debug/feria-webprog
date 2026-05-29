import Article from '../../assets/images/article.png';
import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx'; 
import { useEffect, useState } from 'react';
import { getArticles } from '../../services/ArticleService';
import defaultArticles from '../../data/article-content';

const ArticleListPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await getArticles();
                const apiArticles = res?.articles ?? [];

                const normalizedArticles = apiArticles.map((article) => {
                    const defaultArticle = defaultArticles.find((item) => item.slug === article.slug);

                    return {
                        ...article,
                        image: typeof article.image === 'string' && article.image.trim()
                            ? article.image
                            : defaultArticle?.image || Article,
                        content: Array.isArray(article.content)
                            ? article.content
                            : typeof article.content === 'string'
                                ? article.content.split(/\n\n|\n/).map((line) => line.trim()).filter(Boolean)
                                : defaultArticle?.content ?? [],
                        isFeatured: Boolean(article.isFeatured),
                        isActive: Boolean(article.isActive),
                    };
                });

                setArticles(normalizedArticles);
            } catch (e) {
                console.error(e);
                setArticles([]);
            }
        })();
    }, []);

    const visibleArticles = articles.filter((article) => article.isActive && article.isFeatured);


    return (
        <div className="flex w-full flex-col">
            <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 border border-zinc-200/60">

                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600">
                            Articles
                        </p>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-teal-900 sm:text-4xl">
                            Featured Articles Regarding about Me
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                            Articles regarding about my academic journey, personal growth, achievements, and experiences that have shaped who I am today. These featured articles highlight my educational milestones, challenges I have overcome, skills I have developed, and the meaningful moments that contributed to my learning and development. Through these writings, readers can gain insight into my background, aspirations, and the values that guide my academic and personal pursuits.
                        </p>
                        <div className="mt-6">
                            <Button to="/" variant="primary">
                                Back Home
                            </Button>
                        </div>
                    </div>
                    <img src={Article} className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100"/>
                </div>
            </section>
            
            <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 border border-zinc-200/60">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600">
                        Featured Articles
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-teal-900">Something About Me</h2>
                </div>
                
                {visibleArticles.length ? (
                    <ArticleList articles={visibleArticles} />
                ) : (
                    <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-8 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                        <p className="text-base font-semibold text-teal-900">No featured articles are available right now.</p>
                        <p className="mt-2 text-sm text-zinc-600">Enable Featured and Active on an article in the dashboard to show it here.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
export default ArticleListPage;
