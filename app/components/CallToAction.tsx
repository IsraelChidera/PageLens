import React from 'react';
import Container from './Elements/Container';
import UrlForm from './Elements/UrlForm';

const CallToAction = () => {
    return (
        <section className="py-20 sm:py-28">
            <Container>
                <div className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 via-indigo-600 to-violet-700 px-6 py-16 text-center shadow-xl shadow-indigo-600/20 sm:px-16">
                    <div className="absolute inset-0 -z-10 bg-grid opacity-40 invert [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
                    <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
                        Ready to see how your site stacks up?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-indigo-100 text-pretty">
                        Run your first audit now. It&apos;s free and takes less than a minute.
                    </p>
                    <div className="mx-auto mt-10 max-w-xl">
                        <UrlForm />
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default CallToAction
