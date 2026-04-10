import Crying from '../assets/images/Me-Cry.png';
import Button from '../components/Button';
import React from 'react'

function NotFoundPage() { 
    return (
        <>
            <div className="flex w-full flex-col">
                <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="flex aspect-[5/1] items-center justify-center rounded-[1.25rem] ">
                    <img src={Crying} alt="Crying" className="items-center justify-center rounded-[1.25rem] h-[200px] w-[200px]"
                    />
                </div>
                </section>

                <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    <div className="mb-6">
                        <h1>Waahhh! Page Not Found :(</h1>
                        <p>The link you followed to get here must be broken...</p>
                        <div className="mt-6 flex flex-wrap gap-3 justify-center">
                            <Button to="/" variant="primary">
                                {'<'} Back to Home
                            </Button>
                        </div>
                    </div>
                </section>
            
            </div>
        </>
    );
}

export default NotFoundPage