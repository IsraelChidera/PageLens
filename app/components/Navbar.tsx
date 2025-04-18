import React from 'react';
import Container from './Elements/Container';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className='text-white py-8 bg-transparent absolute w-full top-0 left-0'>
            <Container className='flex items-center justify-between'>
                <div>PageLens</div>

                <Link href="/check-website">
                    <button className="cursor-pointer transition-all ease-linear delay-75 hover:translate-1.5 text-sm rounded-[10px] px-10 py-3 bg-transparent border border-white">
                        Start Now
                    </button>
                </Link>
            </Container>
        </nav>
    )
}

export default Navbar