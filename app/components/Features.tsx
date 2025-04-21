import React from 'react';
import Container from './Elements/Container';
import Image from 'next/image';

const services = [
    {
        id: 1,
        title: `UX & Design Analysis`,
        description: `We evaluate visual hierarchy, spacing, clarity, and how easy your content is to consume.`,
        image: `/services-1.png`,
    },
    {
        id: 2,
        title: `SEO Essentials`,
        description: `Quickly uncover missing metadata, bad heading structure, alt tag issues, and more.`,
        image: `/services-2.png`,
    },
    {
        id: 3,
        title: `Accessibility`,
        description: `See how your site performs against accessibility best practices like contrast, ARIA, and keyboard navigation.`,
        image: `/services-3.png`,
    },
    {
        id: 4,
        title: `Performance Checks`,
        description: `Basic insights on image optimization, loading speed, and user experience metrics.                             `,
        image: `/services-4.png`,
    },
]

const OurServices = () => {
    return (
        <section className='py-[80px] mt-20'>
            <Container>
                <h2 className='text-center lg:w-[576px] mx-auto text-[#14358A] font-bold text-[28px] lg:text-[40px] leading-[105%] '>
                    We optimize marketing for business continuity
                </h2>

                <div className="lg:w-[800px] mx-auto">
                    <div className='grid lg:grid-cols-2 lg:gap-8 space-y-6 lg:space-y-0 text-text mt-10 lg:mt-12'>
                        {
                            services.map((service) => (
                                <div
                                    key={service.id}
                                    className={` border border-[#D9D9D9] rounded-[16px] p-8 bg-[#EEEEEE80]`}
                                >
                                    <div className='flex flex-col justify-between h-full'>
                                        <div>
                                            <p className='text-[#006FBA] font-semibold text-base lg:text-[20px]'>{service.title}</p>

                                            <p className='text-[#68718B] mt-2 text-sm lg:text-base leading-[135%] '>
                                                {service.description}
                                            </p>
                                        </div>

                                        <Image className='mt-10' src={service.image} alt="features" width={56} height={56} />
                                    </div>


                                </div>
                            ))
                        }
                        <div></div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default OurServices