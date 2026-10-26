import React from 'react';
import Container from './Elements/Container';
import { LuLink, LuListChecks, LuWandSparkles } from 'react-icons/lu';

const steps = [
    {
        icon: LuLink,
        title: "Enter a URL",
        description: "Paste any live website link: your SaaS, portfolio, product page, or a client's site.",
    },
    {
        icon: LuWandSparkles,
        title: "We analyze",
        description: "Our AI breaks the site down across UX, SEO, accessibility, performance and content.",
    },
    {
        icon: LuListChecks,
        title: "Get your report",
        description: "See scores at a glance and what needs fixing first, with human-friendly advice.",
    },
];

const About = () => {
    return (
        <section id="how-it-works" className="scroll-mt-16 py-20 sm:py-28">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold text-indigo-600">How it works</p>
                    <h2 className='mt-2 text-3xl font-semibold tracking-tight text-slate-900 text-balance sm:text-4xl'>
                        From URL to action plan in three steps
                    </h2>
                </div>

                <ol className="mt-14 grid gap-6 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <li key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <step.icon className="size-5" aria-hidden />
                                </span>
                                <span className="font-mono text-sm font-medium text-slate-300">0{index + 1}</span>
                            </div>
                            <h3 className='mt-6 text-lg font-semibold text-slate-900'>{step.title}</h3>
                            <p className='mt-2 leading-relaxed text-slate-600'>{step.description}</p>
                        </li>
                    ))}
                </ol>
            </Container>
        </section>
    )
}

export default About
