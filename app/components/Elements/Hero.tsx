import React from 'react';
import Container from './Container';
import UrlForm from './UrlForm';
import ReportPreview from './ReportPreview';
import { LuCheck, LuSparkles } from 'react-icons/lu';

const perks = ["100% free", "No sign-up required", "Results in seconds"];

const Hero = () => {
    return (
        <header className='relative isolate overflow-hidden'>
            <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
            <div className="absolute left-1/2 top-0 -z-10 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl" />

            <Container className='pb-20 pt-16 text-center sm:pt-24 lg:pb-28'>
                <div className="animate-fade-up mx-auto max-w-3xl">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                        <LuSparkles className="size-3.5" aria-hidden />
                        AI-powered website audits
                    </span>

                    <h1 className='mt-6 text-4xl font-semibold tracking-tight text-slate-900 text-balance sm:text-5xl lg:text-6xl'>
                        Get a free audit of your website{" "}
                        <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">in seconds</span>
                    </h1>
                    <p className='mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 text-pretty sm:text-lg'>
                        Enter any URL and we&apos;ll analyze its UX, SEO, accessibility and performance, then give you clear, prioritized fixes.
                    </p>

                    <div className='mx-auto mt-10 max-w-xl'>
                        <UrlForm />
                    </div>

                    <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
                        {perks.map((perk) => (
                            <li key={perk} className="flex items-center gap-1.5">
                                <LuCheck className="size-4 text-emerald-500" aria-hidden />
                                {perk}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="animate-fade-up mt-16 [animation-delay:150ms] sm:mt-20">
                    <ReportPreview />
                </div>
            </Container>
        </header>
    )
}

export default Hero
