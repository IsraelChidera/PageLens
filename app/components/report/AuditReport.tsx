"use client";

import React, { useState } from 'react';
import { LuCheck, LuCircleCheck, LuCopy, LuExternalLink, LuRotateCcw } from 'react-icons/lu';
import ScoreRing from './ScoreRing';
import { categoryMeta, priorityMeta } from './categoryMeta';
import { getScoreTone } from '@/app/lib/score';
import { getHostname } from '@/app/lib/url';
import { PRIORITIES, reportToMarkdown, type AuditReport as Report, type Priority } from '@/app/lib/audit';

type Props = {
    report: Report;
    url: string;
    onReset: () => void;
};

const filters: ("all" | Priority)[] = ["all", ...PRIORITIES];

const AuditReport = ({ report, url, onReset }: Props) => {
    const [filter, setFilter] = useState<"all" | Priority>("all");
    const [copied, setCopied] = useState(false);
    const hostname = getHostname(url);
    const overallTone = getScoreTone(report.overallScore);

    const visible = filter === "all"
        ? report.recommendations
        : report.recommendations.filter((r) => r.priority === filter);

    const countFor = (f: "all" | Priority) =>
        f === "all" ? report.recommendations.length : report.recommendations.filter((r) => r.priority === f).length;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(reportToMarkdown(report, url));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard can be unavailable (e.g. insecure context); nothing useful to show.
        }
    };

    return (
        <div className="animate-fade-up space-y-6">
            {/* Overview */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=64`}
                            alt=""
                            className="size-10 shrink-0 rounded-xl border border-slate-200 bg-white p-1.5"
                        />
                        <div className="min-w-0">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Audit report</p>
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex max-w-full items-center gap-1 font-semibold text-slate-900 transition hover:text-indigo-600"
                            >
                                <span className="truncate">{hostname}</span>
                                <LuExternalLink className="size-3.5 shrink-0" aria-hidden />
                            </a>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleCopy}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                            {copied ? <LuCheck className="size-4 text-emerald-500" aria-hidden /> : <LuCopy className="size-4" aria-hidden />}
                            {copied ? "Copied" : "Copy report"}
                        </button>
                        <button
                            onClick={onReset}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700"
                        >
                            <LuRotateCcw className="size-4" aria-hidden />
                            New audit
                        </button>
                    </div>
                </div>

                <div className="mt-6 flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-8 sm:text-left">
                    <ScoreRing score={report.overallScore} size={140} strokeWidth={12} label="Overall" />
                    <div>
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${overallTone.badge}`}>
                            {overallTone.label}
                        </span>
                        <p className="mt-3 leading-relaxed text-slate-600 text-pretty">{report.summary}</p>
                    </div>
                </div>
            </div>

            {/* Category scores */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {report.categories.map((category) => {
                    const meta = categoryMeta[category.name] ?? categoryMeta.UX;
                    const tone = getScoreTone(category.score);
                    return (
                        <div key={category.name} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className={`flex size-9 items-center justify-center rounded-lg ${meta.tint}`}>
                                    <meta.icon className="size-4" aria-hidden />
                                </span>
                                <span className={`text-2xl font-semibold tabular-nums ${tone.text}`}>{category.score}</span>
                            </div>
                            <p className="mt-4 font-semibold text-slate-900">{category.name}</p>
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${category.score}%` }} />
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">{category.verdict}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-3">
                {/* Recommendations */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Recommendations</h2>
                            <p className="text-sm text-slate-500">Sorted by impact, so start at the top.</p>
                        </div>
                        <div className="inline-flex self-start rounded-lg bg-slate-100 p-1" role="tablist" aria-label="Filter by priority">
                            {filters.map((f) => (
                                <button
                                    key={f}
                                    role="tab"
                                    aria-selected={filter === f}
                                    onClick={() => setFilter(f)}
                                    className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium capitalize transition ${filter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
                                >
                                    {f} <span className="tabular-nums text-slate-400">{countFor(f)}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <ol className="mt-6 space-y-3">
                        {visible.map((rec, index) => {
                            const meta = categoryMeta[rec.category] ?? categoryMeta.UX;
                            const priority = priorityMeta[rec.priority] ?? priorityMeta.low;
                            return (
                                <li key={`${rec.title}-${index}`} className="flex gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-slate-300">
                                    <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${meta.tint}`}>
                                        <meta.icon className="size-4" aria-hidden />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="font-semibold text-slate-900">{rec.title}</h3>
                                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${priority.className}`}>
                                                {priority.label}
                                            </span>
                                            <span className="text-xs text-slate-400">{rec.category}</span>
                                        </div>
                                        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{rec.detail}</p>
                                    </div>
                                </li>
                            );
                        })}
                        {visible.length === 0 && (
                            <li className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                                No {filter} priority items. Nice work!
                            </li>
                        )}
                    </ol>
                </div>

                {/* Strengths */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-lg font-semibold text-slate-900">What&apos;s working</h2>
                    <p className="text-sm text-slate-500">Keep doing these.</p>
                    <ul className="mt-6 space-y-4">
                        {report.strengths.map((strength) => (
                            <li key={strength} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                                <LuCircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-500" aria-hidden />
                                {strength}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AuditReport
