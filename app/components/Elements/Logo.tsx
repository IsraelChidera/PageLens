import React from 'react';
import Link from 'next/link';
import { LuScanSearch } from 'react-icons/lu';

const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <Link href="/" className={`inline-flex items-center gap-2 font-semibold tracking-tight text-slate-900 ${className}`}>
            <span className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-sm shadow-indigo-500/30">
                <LuScanSearch className="size-[18px]" aria-hidden />
            </span>
            <span className="text-[17px]">PageLens</span>
        </Link>
    )
}

export default Logo
