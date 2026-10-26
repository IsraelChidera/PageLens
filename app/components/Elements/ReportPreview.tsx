import React from 'react';
import ScoreRing from '../report/ScoreRing';
import { getScoreTone } from '@/app/lib/score';
import { categoryMeta, priorityMeta } from '../report/categoryMeta';
import type { Category, Priority } from '@/app/lib/audit';

const scores: { name: Category; score: number }[] = [
    { name: "UX", score: 88 },
    { name: "SEO", score: 72 },
    { name: "Accessibility", score: 64 },
    { name: "Performance", score: 91 },
    { name: "Content", score: 83 },
];

const fixes: { title: string; category: Category; priority: Priority }[] = [
    { title: "Add alt text to 12 product images", category: "Accessibility", priority: "high" },
    { title: "Write a unique meta description", category: "SEO", priority: "medium" },
];

// Static sample of the audit report, used as the hero visual.
const ReportPreview = () => {
    return (
        <div className="relative mx-auto max-w-4xl" aria-hidden>
            <div className="absolute -inset-x-8 -inset-y-6 -z-10 rounded-[40px] bg-linear-to-r from-indigo-500/20 via-violet-500/20 to-sky-500/20 blur-3xl" />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
                <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                    <div className="flex gap-1.5">
                        <span className="size-2.5 rounded-full bg-slate-300" />
                        <span className="size-2.5 rounded-full bg-slate-300" />
                        <span className="size-2.5 rounded-full bg-slate-300" />
                    </div>
                    <div className="mx-auto w-full max-w-xs truncate rounded-md border border-slate-200 bg-white px-3 py-1 text-center text-xs text-slate-500">
                        yourwebsite.com
                    </div>
                </div>

                <div className="grid gap-6 p-6 text-left sm:p-8 md:grid-cols-[auto_1fr] md:gap-10">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <ScoreRing score={82} size={136} strokeWidth={11} label="Overall" />
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getScoreTone(82).badge}`}>
                            {getScoreTone(82).label}
                        </span>
                    </div>

                    <div className="space-y-3.5">
                        {scores.map(({ name, score }) => {
                            const Icon = categoryMeta[name].icon;
                            return (
                                <div key={name} className="flex items-center gap-3">
                                    <span className={`flex size-7 shrink-0 items-center justify-center rounded-md ${categoryMeta[name].tint}`}>
                                        <Icon className="size-3.5" />
                                    </span>
                                    <span className="w-24 shrink-0 text-sm font-medium text-slate-700">{name}</span>
                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                                        <div className={`h-full rounded-full ${getScoreTone(score).bar}`} style={{ width: `${score}%` }} />
                                    </div>
                                    <span className="w-7 text-right text-sm font-semibold tabular-nums text-slate-900">{score}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 bg-slate-50/50 px-6 py-5 text-left sm:px-8">
                    {fixes.map((fix) => (
                        <div key={fix.title} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
                            <span className="truncate text-sm font-medium text-slate-800">{fix.title}</span>
                            <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${priorityMeta[fix.priority].className}`}>
                                {priorityMeta[fix.priority].label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ReportPreview
