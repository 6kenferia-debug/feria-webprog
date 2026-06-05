import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../../components/Button.jsx';
import { getArticles } from '../../services/ArticleService';
import placeholderImage from '../../assets/images/article.png';
import defaultArticles from '../../data/article-content';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getArticles();
        // The API returns { success: true, count: X, data: articles }
        const fetchedArticles = response.data?.data || [];
        setArticles(fetchedArticles.length > 0 ? fetchedArticles : defaultArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles(defaultArticles);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-zinc-500 animate-pulse">Loading Insights...</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-8 bg-zinc-50">
      {/* Hero Section */}
      <section className="border-b-2 border-zinc-900 bg-white px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-teal-600">
            Articles
          </p>
          <h1 className="max-w-2xl text-4xl font-black leading-none text-zinc-900 md:text-6xl text-balance">
            Featured Articles <span className="text-teal-600">Regarding Me.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
            Articles regarding my academic journey, personal growth, achievements, and experiences 
            that have shaped who I am today. Through these writings, readers can gain insight into 
            my background, aspirations, and the values that guide my academic and personal pursuits.
          </p>
          <div className="mt-10">
            <Button to="/">Back Home</Button>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const preview = Array.isArray(article.content)
              ? article.content[0] || ''
              : String(article.content || '');

            return (
              <article
                key={article._id || article.name}
                className="flex flex-col rounded-3xl border-3 border-zinc-300/70 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]"
              >
                <div>
                  <img
                    src={article.imageUrl || placeholderImage}
                    alt={article.title}
                    onError={(e) => { e.currentTarget.src = placeholderImage; }}
                    className="flex aspect-4/3 w-full items-center justify-center rounded-[1.25rem] bg-teal-200 object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-black">{article.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black">
                  {preview.substring(0, 200)}{preview.length > 200 ? '...' : ''}
                </p>
                <Button to={`/articles/${article.name}`} className="mt-auto" variant="primary">
                  Read Article
                </Button>
              </article>
            );
          })}
        </div>
        
        {articles.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            No articles found. Check back soon!
          </div>
        )}
      </section>
    </div>
  );
}

export default ArticleListPage;
