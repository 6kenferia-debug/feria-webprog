import Button from '../components/Button';
import Profile from '../assets/images/about.png';
import About1 from '../assets/images/about_01.jpeg';
import About2 from '../assets/images/about_02.jpg';
import About3 from '../assets/images/about_03.jpg';
import About4 from '../assets/images/about_04.jpg';

const AboutPage = () => {
    return (
        <div className="flex w-full flex-col">
            <section className=" bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center"> 
                <img src={Profile} className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-zinc-200"/>
                    
                <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        About Section
                        </p>                        
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                            Mark Christian Kent V. Feria
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                            A transferee student from PUP, where he completed a Diploma in Information and Communication Technology. After finishing his diploma, he decided to continue his academic journey at NU and is currently pursuing a Bachelor’s degree in Information Technology, as becoming a degree holder and expanding his knowledge in the IT field has always been one of his goals.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button to="/" variant="primary">
                            Back Home
                            </Button>
                            <Button to="/articles">Open Articles</Button>
                        </div>
                    </div>
                </div>
            </section>

        <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="mb-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Profile Overview
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Current Age</h2>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                    <p className="text-2xl font-bold text-zinc-900">23</p> 
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                        Years of Living
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">08</p> 
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Month
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                    <p className="text-2xl font-bold text-zinc-900">05</p> 
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                        Date
                    </p> 
                </div>

                <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                    <p className="text-2xl font-bold text-zinc-900">2002</p> 
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                        Year
                    </p>
                </div>
            </div>
        </section>

        <section className=" bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Academic Journey
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        A Brief Story of My Academic Journey
                    </h2>
        
                    <div className="mt-6 space-y-4">
                        <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                            <h3 className="text-lg font-semibold text-zinc-900">Introduction
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-zinc-600">
                                He is a transferee student from PUP, where he completed a Diploma in Information and Communication Technology. He is currently pursuing a Bachelor’s degree in Information Technology at NU to further expand his knowledge and achieve his goal of becoming a degree holder.
                            </p> 
                        </article>
                        
                        <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                            <h3 className="text-lg font-semibold text-zinc-900"> Experience</h3>
                            <p className="mt-3 text-sm leading-6 text-zinc-600">
                                During his diploma studies, he gained basic knowledge and practical experience in IT and programming, which sparked his interest in networking and possibly cybersecurity. He is now continuing to develop his skills and adapt to the learning environment at NU.
                            </p> 
                        </article>

                        <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                            <h3 className="text-lg font-semibold text-zinc-900">Additional Details</h3>
                            <p className="mt-3 text-sm leading-6 text-zinc-600">
                                He has basic programming skills in C, C++, Java, and Python. He is eager to learn, improve his technical skills, and collaborate with classmates throughout his academic journey.
                            </p> 
                        </article>
                    </div>
                </div>

                <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Visual Grid
                    </p>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <img src={About1} className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200"/>
    
                        <img src={About2} className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200"/>

                        <img src={About3} className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200"/>

                        <img src={About4} className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200"/>

                    </div>

                    <Button className="mt-5">View Section</Button>
                </div>
            </div>
        </section>
        </div>
    );
};

export default AboutPage;