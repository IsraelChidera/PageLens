"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LuRotateCcw, LuScanSearch, LuTriangleAlert } from 'react-icons/lu';
import Container from './Elements/Container';
import UrlForm from './Elements/UrlForm';
import AuditLoading from './report/AuditLoading';
import AuditReport from './report/AuditReport';
import { runAudit, type AuditReport as Report } from '@/app/lib/audit';
import { displayUrl, normalizeUrl } from '@/app/lib/url';

type Status = "idle" | "loading" | "success" | "error";

const examples = ["stripe.com", "linear.app", "airbnb.com"];

const FetchDetails = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const urlParam = normalizeUrl(searchParams.get("url") ?? "") ?? "";

    const [status, setStatus] = useState<Status>("idle");
    const [report, setReport] = useState<Report | null>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [target, setTarget] = useState("");

    // Guards against duplicate runs (React strict mode) and stale responses.
    const lastUrl = useRef("");
    const requestId = useRef(0);

    const analyze = useCallback(async (url: string) => {
        const id = ++requestId.current;
        lastUrl.current = url;
        setTarget(url);
        setStatus("loading");
        setErrorMsg("");
        setReport(null);

        try {
            const result = await runAudit(url);
            if (id !== requestId.current) return;
            setReport(result);
            setStatus("success");
        } catch (error) {
            if (id !== requestId.current) return;
            console.error("Error fetching data:", error);
            setErrorMsg(error instanceof Error ? error.message : "An error occurred while fetching data.");
            setStatus("error");
        }
    }, []);

    // The URL in the query string drives the audit, so results are shareable.
    useEffect(() => {
        if (urlParam && urlParam !== lastUrl.current) {
            analyze(urlParam);
        }
    }, [urlParam, analyze]);

    const handleSubmit = (url: string) => {
        if (url === lastUrl.current) {
            analyze(url);
        } else {
            router.replace(`/check-website?url=${encodeURIComponent(url)}`, { scroll: false });
        }
    };

    const handleReset = () => {
        requestId.current++;
        lastUrl.current = "";
        setStatus("idle");
        setReport(null);
        setTarget("");
        router.replace("/check-website", { scroll: false });
    };

    return (
        <section className='relative isolate'>
            <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
            <div className="absolute left-1/2 top-0 -z-10 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl" />

            <Container className="pb-24 pt-12 sm:pt-16">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className='text-3xl font-semibold tracking-tight text-slate-900 text-balance sm:text-4xl'>
                        Website audit
                    </h1>
                    <p className='mt-3 text-slate-600 text-pretty'>
                        Enter any URL and we&apos;ll analyze its UX, SEO, performance and accessibility, with clear, actionable feedback.
                    </p>
                    <div className="mt-8">
                        <UrlForm
                            defaultValue={target ? displayUrl(target) : ""}
                            loading={status === "loading"}
                            autoFocus={!urlParam}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>

                <div className="mx-auto mt-12 max-w-5xl">
                    {status === "idle" && (
                        <div className="animate-fade-up rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-14 text-center">
                            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                <LuScanSearch className="size-6" aria-hidden />
                            </span>
                            <h2 className="mt-4 font-semibold text-slate-900">Your report will appear here</h2>
                            <p className="mt-1 text-sm text-slate-500">Not sure where to start? Try one of these:</p>
                            <div className="mt-5 flex flex-wrap justify-center gap-2">
                                {examples.map((example) => (
                                    <button
                                        key={example}
                                        onClick={() => handleSubmit(normalizeUrl(example)!)}
                                        className="cursor-pointer rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700"
                                    >
                                        {example}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {status === "loading" && <AuditLoading key={target} url={target} />}

                    {status === "error" && (
                        <div className="animate-fade-up rounded-3xl border border-rose-200 bg-rose-50/50 px-6 py-12 text-center" role="alert">
                            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                                <LuTriangleAlert className="size-6" aria-hidden />
                            </span>
                            <h2 className="mt-4 font-semibold text-slate-900">We couldn&apos;t complete the audit</h2>
                            <p className="mx-auto mt-1 line-clamp-4 max-w-lg break-words text-sm text-slate-600">{errorMsg}</p>
                            <button
                                onClick={() => analyze(target)}
                                className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700"
                            >
                                <LuRotateCcw className="size-4" aria-hidden />
                                Try again
                            </button>
                        </div>
                    )}

                    {status === "success" && report && (
                        <AuditReport report={report} url={target} onReset={handleReset} />
                    )}
                </div>
            </Container>
        </section>
    )
}

export default FetchDetails
