"use client";

import React, { useEffect, useState } from 'react';
import { LuCircle, LuCircleCheck, LuLoaderCircle } from 'react-icons/lu';
import { getHostname } from '@/app/lib/url';

const steps = [
    "Reaching the website",
    "Reviewing UX & design",
    "Checking SEO essentials",
    "Testing accessibility",
    "Estimating performance",
    "Writing your report",
];

const AuditLoading = ({ url }: { url: string }) => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((i) => Math.min(i + 1, steps.length - 1));
        }, 1800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="animate-fade-up grid gap-6 md:grid-cols-5" role="status" aria-live="polite">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:col-span-2">
                <p className="text-sm font-medium text-slate-500">Analyzing</p>
                <p className="mt-1 truncate text-lg font-semibold text-slate-900">{getHostname(url)}</p>

                <ul className="mt-6 space-y-3.5">
                    {steps.map((step, index) => (
                        <li key={step} className="flex items-center gap-3 text-sm">
                            {index < active ? (
                                <LuCircleCheck className="size-5 shrink-0 text-emerald-500" aria-hidden />
                            ) : index === active ? (
                                <LuLoaderCircle className="size-5 shrink-0 animate-spin text-indigo-600" aria-hidden />
                            ) : (
                                <LuCircle className="size-5 shrink-0 text-slate-300" aria-hidden />
                            )}
                            <span className={index <= active ? "font-medium text-slate-900" : "text-slate-400"}>{step}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:col-span-3" aria-hidden>
                <div className="flex items-center gap-6">
                    <div className="size-28 shrink-0 animate-pulse rounded-full bg-slate-100" />
                    <div className="flex-1 space-y-3">
                        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />
                        <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
                        <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-20 animate-pulse rounded-xl bg-slate-100" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AuditLoading
