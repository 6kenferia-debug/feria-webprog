import Button from '../../components/Button';
import Home from '../../assets/images/home.jpg';
import Image1 from '../../assets/images/VGrid_02.jpg';
import Image2 from '../../assets/images/VGrid_03.png';
import Image3 from '../../assets/images/VGrid_05.jpg';

const HomePage = () => {
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
                    <article className="flex flex-col rounded-3xl border-3 border-zinc-300/70 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">

                        <div>
                            <img src={Image1} className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-teal-200"/>
                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-black">Languages I Use</h3>
                            <p className="mt-3 text-sm leading-6 text-black">
                                Sometimes I use Java, Python, and C++ for my projects and assignments. I also have experience with web development using HTML, CSS, and JavaScript.
                            </p>
                            <Button className="mt-auto" variant="primary">
                                View More
                            </Button>
                    </article>

                    <article className="flex flex-col rounded-3xl border-3 border-zinc-300/70 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                        <div>
                            <img src={Image2} className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-teal-200"/>
                        </div>
                        
                        <h3 className="mt-4 text-lg font-semibold text-black">Games I Play</h3>
                        <p className="mt-3 text-sm leading-6 text-black">
                            I usually play games like Valorant, Dota 2, and Mobile Legends. These games help me relax and have fun while also improving my strategic thinking and teamwork skills.
                        </p>
                        <Button className="mt-auto" variant="primary">
                            View More
                        </Button>
                    </article>
                    
                    <article className="flex flex-col rounded-3xl border-3 border-zinc-300/70 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                        <div>
                            <img src={Image3} className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-teal-200"/>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-black">Hobbies I do</h3>

                        <p className="mt-3 text-sm leading-6 text-black">
                            I enjoy nature walks, photography, and cooking. These hobbies allow me to unwind and express my creativity outside of my academic pursuits.
                        </p>
                        <Button className="mt-auto" variant="primary">
                            View More
                        </Button>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
