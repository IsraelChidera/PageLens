import React from 'react';
import Container from './Elements/Container';
import Image from 'next/image';
import { MdInput } from 'react-icons/md';
import { TbAnalyze, TbReportAnalytics } from 'react-icons/tb';

const About = () => {
    return (
        <section>
            <Container>
                <h2 className='mb-10 text-center lg:w-[576px] mx-auto text-[#14358A] font-bold text-[28px] lg:text-[40px] leading-[105%] '>
                    How it works
                </h2>

                <div className="lg:w-[1000px] mx-auto pt-10 lg:grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-0 lg:space-y-0 space-y-6">
                    <div className='space-y-10'>
                        <div className="flex items-center space-x-4 w-full">
                            <MdInput className='text-[40px] text-[#14358A] ' />
                            <div>
                                <h3 className='text-[#14358A] font-semibold text-base lg:text-[20px]'>Enter a URL</h3>
                                <p className='text-[#68718B] mt-2 text-sm lg:text-base leading-[135%] '>
                                    Paste any live website link — your SaaS, portfolio, product page, or client’s site.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 w-full">
                            <TbAnalyze className='text-[40px] text-[#14358A] ' />
                            <div>
                                <h3 className='text-[#14358A] font-semibold text-base lg:text-[20px]'>We Analyze</h3>
                                <p className='text-[#68718B] mt-2 text-sm lg:text-base leading-[135%] '>
                                    We break down the site's performance into UX, SEO, accessibility, and mobile categories.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 w-full">
                            <TbReportAnalytics className='text-[40px] text-[#14358A] ' />
                            <div>
                                <h3 className='text-[#14358A] font-semibold text-base lg:text-[20px]'>Get Your Report</h3>
                                <p className='text-[#68718B] mt-2 text-sm lg:text-base leading-[135%] '>
                                    Instantly see what's working and what needs fixing, with human-friendly advice
                                </p>
                            </div>
                        </div>

                    </div>

                    <div>
                        <Image src="/features-img.png" alt="features" width={409} height={306} />
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default About