import React from 'react';
import Container from './Container';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../Navbar';

const Hero = () => {
    return (
        <header className='relative'>
            <Navbar />
            <div className='pt-[160px] pb-[80px] bg-[url(/bg-hero.png)] h-fit w-full bg-cover bg-center bg-no-repeat'>
                <Container>
                    <div className='flex justify-center text-center'>
                        <div className='w-[750px] text-white'>
                            <h1 className='leading-[105%] lg:leading-[110%] text-[40px] lg:text-[60px] font-bold'>
                                Advanced analytics to grow your business
                            </h1>
                            <p className='lg:mt-6 mt-4 lg:text-[18px] text-sm leading-[135%] text-[#E6E8EC]'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil et pariatur amet obcaecati non illum a. Facere, saepe a ipsam non, doloribus aperiam ad magnam autem quod libero doloremque quo molestias vero iste expedita officia ducimus sunt itaque magni facilis?
                            </p>

                            <div className='mt-10 flex justify-center'>
                                <div className="flex items-center space-x-2">
                                    <Link href="/check-website">
                                        <button className="font-bold text-base rounded-[10px] px-10 py-5 hover:bg-linear-to-r hover:from-[#AC5FE6] hover:to-[#6A36FF]  transition ease-linear delay-75 cursor-pointer bg-linear-to-r from-[#6A36FF] to-[#AC5FE6]">
                                            Generate Audit
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <Image src="/web-dashboard-illustration.png" alt="dashboard illustration" width={1016} height={614} />
                    </div>
                </Container>
            </div>

        </header>
    )
}

export default Hero