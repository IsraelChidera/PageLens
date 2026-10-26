import React from 'react';
import Container from './Elements/Container';
import Link from 'next/link';
import Logo from './Elements/Logo';
import { LuArrowRight } from 'react-icons/lu';

const links = [
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#features", label: "Features" },
];

const Navbar = () => {
    return (
        <nav className='sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-lg'>
            <Container className='flex h-16 items-center justify-between'>
                <Logo />

                <div className="flex items-center gap-1 sm:gap-2">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:block"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/check-website"
                        className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                    >
                        Start free audit
                        <LuArrowRight className="size-4" aria-hidden />
                    </Link>
                </div>
            </Container>
        </nav>
    )
}

export default Navbar
