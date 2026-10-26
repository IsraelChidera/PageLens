"use client";

import React, { FormEvent, useEffect, useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LuCircleAlert, LuGlobe, LuLoaderCircle, LuSparkles } from 'react-icons/lu';
import { normalizeUrl } from '@/app/lib/url';

type Props = {
    defaultValue?: string;
    loading?: boolean;
    autoFocus?: boolean;
    // When omitted, the form navigates to the audit page with the URL.
    onSubmit?: (url: string) => void;
};

const UrlForm = ({ defaultValue = "", loading = false, autoFocus = false, onSubmit }: Props) => {
    const router = useRouter();
    const id = useId();
    const [value, setValue] = useState(defaultValue);
    const [error, setError] = useState("");

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const url = normalizeUrl(value);
        if (!url) {
            setError("Enter a valid website address, like example.com");
            return;
        }
        setError("");
        if (onSubmit) {
            onSubmit(url);
        } else {
            router.push(`/check-website?url=${encodeURIComponent(url)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="w-full">
            <div className={`flex items-center gap-2 rounded-2xl border bg-white p-1.5 shadow-lg shadow-slate-900/5 transition focus-within:ring-4 ${error ? "border-rose-300 focus-within:ring-rose-500/15" : "border-slate-200 focus-within:border-indigo-400 focus-within:ring-indigo-500/15"}`}>
                <LuGlobe className="ml-3 size-5 shrink-0 text-slate-400" aria-hidden />
                <label htmlFor={`${id}-url`} className="sr-only">Website URL</label>
                <input
                    id={`${id}-url`}
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    spellCheck={false}
                    autoFocus={autoFocus}
                    placeholder="yourwebsite.com"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        if (error) setError("");
                    }}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className="min-w-0 flex-1 bg-transparent py-2.5 text-base text-slate-900 outline-none placeholder:text-slate-400"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-70 sm:px-5"
                >
                    {loading ? <LuLoaderCircle className="size-4 animate-spin" aria-hidden /> : <LuSparkles className="size-4" aria-hidden />}
                    <span>{loading ? "Analyzing" : "Analyze"}</span>
                </button>
            </div>
            {error && (
                <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-left text-sm text-rose-600">
                    <LuCircleAlert className="size-4 shrink-0" aria-hidden />
                    {error}
                </p>
            )}
        </form>
    )
}

export default UrlForm
