import { Link } from 'react-router-dom'; 
import Button from './Button';

const ArticleList = ({ articles }) => {
    return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"> 
        {articles.map((article, index) => (
            <article key={article.slug} className="flex flex-col rounded-3xl border-3 border-zinc-300/70 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                    <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                    Article {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-black">{article.title} </h3>
                <p className="mt-3 text-sm leading-6 text-black flex-grow"> 
                    {String(article.content || '').split('\n\n')[0].substring(0, 150)}...
                </p>

                <Link to={`/articles/${article.slug}`}>
                    <Button className="mt-4" variant="primary">Read More</Button>
                </Link>
            </article>
        ))}
    </div>
    );
};

export default ArticleList;
