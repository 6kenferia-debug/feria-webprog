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
          {articles.map((article) => (
            <Link 
              key={article._id || article.name}
              to={`/articles/${article.name}`}
              className="group block overflow-hidden rounded-2xl border-2 border-zinc-900 bg-white transition hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(24,24,27,1)]"
            >
              {/* Image Container */}
              <div className="aspect-video w-full border-b-2 border-zinc-900 overflow-hidden bg-zinc-100">
                {article.imageUrl ? (
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    onError={(e) => { e.currentTarget.src = placeholderImage; }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <img 
                    src={placeholderImage} 
                    alt={article.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>

              {/* Text Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold leading-tight text-zinc-900 group-hover:underline">
                  {article.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                  {article.content && article.content[0]}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-teal-600">
                  Read Article
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
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
