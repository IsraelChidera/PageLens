import React from 'react'
import Link from 'next/link'
import Container from './Elements/Container'
import Logo from './Elements/Logo'

const Footer = () => {
    return (
        <footer className='border-t border-slate-200 bg-white'>
            <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Logo />
                    <p className="mt-2 text-sm text-slate-500">Free, instant website audits powered by Gemini AI.</p>
                </div>
                <nav className="flex gap-6 text-sm font-medium text-slate-600">
                    <Link href="/#how-it-works" className="transition hover:text-slate-900">How it works</Link>
                    <Link href="/#features" className="transition hover:text-slate-900">Features</Link>
                    <Link href="/check-website" className="transition hover:text-slate-900">Start audit</Link>
                </nav>
            </Container>
            <div className="border-t border-slate-100">
                <Container className="py-6">
                    <p className="text-center text-sm text-slate-500 sm:text-left">
                        &copy; {new Date().getFullYear()} PageLens · Designed by <span className="font-medium text-slate-700">Israel Chidera</span>
                    </p>
                </Container>
            </div>
        </footer>
    )
}

export default Footer
