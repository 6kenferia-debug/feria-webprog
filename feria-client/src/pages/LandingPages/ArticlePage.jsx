import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { getArticles } from '../../services/ArticleService';
import defaultArticles from '../../data/article-content';


function ArticlePage() {
    const { name } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await getArticles();
                const list = res?.articles ?? [];
                
                // Merge with default articles to ensure images are available
                const mergedArticles = list.map(apiArticle => {
                    const defaultArticle = defaultArticles.find(a => a.slug === apiArticle.slug);
                    return {
                        ...apiArticle,
                        image: apiArticle.image || defaultArticle?.image,
                        content: apiArticle.content || defaultArticle?.content,
                    };
                });
                
                const found = (mergedArticles.length > 0 ? mergedArticles : defaultArticles).find((a) => a.slug === name);
                setArticle(found ?? null);
            } catch (e) {
                console.error(e);
                // Fallback to default articles if API fails
                const found = defaultArticles.find((a) => a.slug === name);
                setArticle(found ?? null);
            }
        })();
    }, [name]);

    if (!article) {

        return (
            <div className="flex w-full flex-col">
                <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 border border-zinc-200/60">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-3xl font-bold text-teal-900">Article not found</h1> 
                        <Button to="/articles" className="mt-6">Back to Articles</Button> 
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col">
            <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 border border-zinc-200/60">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="mb-1">
                        <Button to="/articles">Back to Articles</Button> 
                    </div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600">
                        Article
                    </p>
                    <h1 className="text-3xl font-bold leading-tight text-teal-900 sm:text-4xl"> 
                        {article.title}
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500">
                        {article.title}
                    </p>
                </div>
            </section>
            
            <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 border border-zinc-200/60">
                <div className="mt-1 border-t border-zinc-300/50 pt-6 max-w-3xl mx-auto">
                    <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] border-3 border-zinc-300/70 bg-white mb-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden">
                        <img 
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <div className="prose prose-sm max-w-none space-y-4 text-black"> 
                        {article.content.map((paragraph, index) => (
                            <p key={index} className="text-base leading-7 text-black whitespace-pre-wrap text-justify indent-8">
                                {paragraph}
                            </p>
                        ))} 
                    </div>
                    
                    <div className="mt-8 border-t border-zinc-300/50 pt-6 text-center">
                        <Button to="/articles">Back to Articles</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ArticlePage;
