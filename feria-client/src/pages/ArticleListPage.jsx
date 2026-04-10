import Article from '../assets/images/article.png';
import Button from '../components/Button';
import ArticleList from '../components/ArticleList'; 
import articles from '../assets/article-content.js';

const ArticleListPage = () => {
    return (
        <div className="flex w-full flex-col">
            <section className=" bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Articles
                        </p>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                            Featured Articles Regarding about Me
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                            Articles regarding about my academic journey, personal growth, achievements, and experiences that have shaped who I am today. These featured articles highlight my educational milestones, challenges I have overcome, skills I have developed, and the meaningful moments that contributed to my learning and development. Through these writings, readers can gain insight into my background, aspirations, and the values that guide my academic and personal pursuits.
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
            
            <section className=" bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Featured Articles
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Something About Me</h2>
                </div>
                
                <ArticleList articles={articles} />
            </section>
        </div>
    );
}
export default ArticleListPage