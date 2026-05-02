import Button from "../../components/Button";
import Profile from '../../assets/images/about.png';
import About1 from '../../assets/images/about_01.jpeg';
import About2 from '../../assets/images/about_02.jpg';
import About3 from '../../assets/images/about_03.JPG';
import About4 from '../../assets/images/about_04.JPG';

const AboutPage = () => {
    return (
        <div className="flex w-full flex-col">
            <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 border border-zinc-200/60">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center"> 
                    <img src={Profile} className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-zinc-200"/>
                    
                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600">
                            About Section
                        </p>                        
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-teal-900 sm:text-4xl">
                            Mark Christian Kent V. Feria
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                            A transferee student from PUP, where he completed a Diploma in Information and Communication Technology. After finishing his diploma, he decided to continue his academic journey at NU and is currently pursuing a Bachelor's degree in Information Technology, as becoming a degree holder and expanding his knowledge in the IT field has always been one of his goals.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button to="/" variant="primary">
                                Back Home
                            </Button>
<Button to="/articles" className="border-2 border-zinc-900">Open Articles</Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 border border-zinc-200/60">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600">
                        Profile Overview
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-teal-900">Current Age</h2>
                </div>
                
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-3xl border-3 border-zinc-300/70 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                        <p className="text-2xl font-extrabold text-teal-600">23</p> 
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Years of Living
                        </p>
                    </div>

                    <div className="rounded-3xl border-3 border-zinc-300/70 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                        <p className="text-2xl font-extrabold text-teal-600">08</p> 
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Month
                        </p>
                    </div>

                    <div className="rounded-3xl border-3 border-zinc-300/70 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                        <p className="text-2xl font-extrabold text-teal-600">05</p> 
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Date
                        </p> 
                    </div>

                    <div className="rounded-3xl border-3 border-zinc-300/70 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                        <p className="text-2xl font-extrabold text-teal-600">2002</p> 
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Year
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 border border-zinc-200/60">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600">
                            Academic Journey
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold text-teal-900">
                            A Brief Story of My Academic Journey
                        </h2>
        
                        <div className="mt-6 space-y-4">
                            <article className="rounded-3xl border-3 border-zinc-300/70 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                                <h3 className="text-lg font-semibold text-black">Introduction
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-black">
                                    He is a transferee student from PUP, where he completed a Diploma in Information and Communication Technology. He is currently pursuing a Bachelor's degree in Information Technology at NU to further expand his knowledge and achieve his goal of becoming a degree holder.
                                </p> 
                            </article>
                            
                            <article className="rounded-3xl border-3 border-zinc-300/70 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                                <h3 className="text-lg font-semibold text-black">Experience</h3>
                                <p className="mt-3 text-sm leading-6 text-black">
                                    During his diploma studies, he gained basic knowledge and practical experience in IT and programming, which sparked his interest in networking and possibly cybersecurity. He is now continuing to develop his skills and adapt to the learning environment at NU.
                                </p> 
                            </article>

                            <article className="rounded-3xl border-3 border-zinc-300/70 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                                <h3 className="text-lg font-semibold text-black">Additional Details</h3>
                                <p className="mt-3 text-sm leading-6 text-black">
                                    He has basic programming skills in C, C++, Java, and Python. He is eager to learn, improve his technical skills, and collaborate with classmates throughout his academic journey.
                                </p> 
                            </article>
                        </div>
                    </div>

                    <div className="rounded-3xl border-3 border-zinc-300/70 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600">
                            Visual Grid
                        </p>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <img src={About1} className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200"/>
        
                            <img src={About2} className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200"/>

                            <img src={About3} className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200"/>

                            <img src={About4} className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200"/>

                        </div>

<Button className="mt-5 border-2 border-zinc-900">View Section</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
