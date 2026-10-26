import React from 'react';
import Container from './Elements/Container';
import { IconType } from 'react-icons';
import { LuAccessibility, LuFileText, LuGauge, LuListChecks, LuMousePointerClick, LuSearch } from 'react-icons/lu';

const services: { title: string; description: string; icon: IconType; tint: string }[] = [
    {
        title: `UX & Design`,
        description: `We evaluate visual hierarchy, spacing, clarity, and how easy your content is to consume.`,
        icon: LuMousePointerClick,
        tint: "bg-pink-50 text-pink-600",
    },
    {
        title: `SEO Essentials`,
        description: `Quickly uncover missing metadata, poor heading structure, alt tag issues, and more.`,
        icon: LuSearch,
        tint: "bg-sky-50 text-sky-600",
    },
    {
        title: `Accessibility`,
        description: `See how your site measures up on contrast, ARIA usage, and keyboard navigation.`,
        icon: LuAccessibility,
        tint: "bg-emerald-50 text-emerald-600",
    },
    {
        title: `Performance`,
        description: `Insights on image optimization, loading speed, and the experience users feel.`,
        icon: LuGauge,
        tint: "bg-amber-50 text-amber-600",
    },
    {
        title: `Content & Clarity`,
        description: `Find out whether your messaging is clear, persuasive, and easy to act on.`,
        icon: LuFileText,
        tint: "bg-violet-50 text-violet-600",
    },
    {
        title: `Prioritized Fixes`,
        description: `Every issue comes ranked by impact, so you always know what to tackle first.`,
        icon: LuListChecks,
        tint: "bg-indigo-50 text-indigo-600",
    },
]

const OurServices = () => {
    return (
        <section id="features" className='scroll-mt-16 border-y border-slate-200 bg-slate-50 py-20 sm:py-28'>
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold text-indigo-600">What we check</p>
                    <h2 className='mt-2 text-3xl font-semibold tracking-tight text-slate-900 text-balance sm:text-4xl'>
                        Everything that matters, in one report
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-600 text-pretty">
                        A complete health check of your website, written in plain English rather than jargon.
                    </p>
                </div>

                <div className='mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <span className={`flex size-11 items-center justify-center rounded-xl ${service.tint}`}>
                                <service.icon className="size-5" aria-hidden />
                            </span>
                            <h3 className='mt-6 text-lg font-semibold text-slate-900'>{service.title}</h3>
                            <p className='mt-2 leading-relaxed text-slate-600'>{service.description}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default OurServices
