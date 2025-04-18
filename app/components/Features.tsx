import React from 'react';
import Container from './Elements/Container';
import Image from 'next/image';

const services = [
    {
        id: 1,
        title: `AI Automation`,
        description: `Implement intelligent tools to streamline operations, reduce costs, and increase efficiency automatically.`,
        image: `/services-1.png`,
    },
    {
        id: 2,
        title: `Revenue Engagement`,
        description: `Utilize Al to unlock new growth opportunities and boost business revenue without added effort.`,
        image: `/services-2.png`,
    },
    {
        id: 3,
        title: `Customer Service Optimization`,
        description: `Improve customer experience through Al-driven solutions that enhance service quality and satisfaction effortlessly.`,
        image: `/services-3.png`,
    },
    {
        id: 4,
        title: `Performance Guarantee`,
        description: `Deliver measurable results with a commitment to customer satisfaction, offering a refund if expectations are not met.`,
        image: `/services-4.png`,
    },
]

const OurServices = () => {
    return (
        <section className='py-[80px]'>
            <Container>
                <h2 className='text-center lg:w-[576px] mx-auto text-[#14358A] font-bold text-[28px] lg:text-[40px] leading-[105%] '>
                    We optimize marketing for business continuity
                </h2>

                <div className="lg:w-[800px] mx-auto">
                    <div className='grid lg:grid-cols-2 lg:gap-8 space-y-6 lg:space-y-0 text-text mt-10 lg:mt-20'>
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