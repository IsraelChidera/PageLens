"use client";

import React, { useEffect, useState } from 'react';
import Container from './Elements/Container';
import { GoogleGenAI } from "@google/genai";
import { TbDots } from 'react-icons/tb';
import { IoReturnDownBack } from 'react-icons/io5';
import Link from 'next/link';

const FetchDetails = () => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({
        webLink: ""
    })

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // const isValidURL = (url: string) => {
    //     const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    //     return pattern.test(url);
    // };
    const isValidURL: any = (url: string) => {
        const pattern = new RegExp(
            '^(https?:\\/\\/)?' +
            '([\\w\\d-]+\\.)+[\\w\\d]{2,}' +
            '(\\/[\\w\\d#?&=.-]*)*$',
            'i'
        );
        return pattern.test(url);
    };

    console.log("use::", isValidURL("https://israel.mnm"))

    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY });

    const fetchData = async () => {
        try {
            if (!isValidURL(formData.webLink)) {
                alert("Invalid URL");
                return;
            }
            setLoading(true);
            return "djsdh";
            // const response = await ai.models.generateContent({
            //     model: "gemini-2.0-flash",
            //     contents: `Analyze the following website content and provide a brief overview of its key aspects, including content, potential SEO elements, and user experience. Then, provide a numbered list of specific and actionable notes on how to make this website better. Focus on improvements related to content quality, clarity, SEO optimization, user navigation, accessibility, and overall effectiveness.

            //     Website URL: ${formData.webLink}`,
            // });
            // console.log(response?.text);
            // return response?.text;
        } catch (error: any) {
            const errorMessage = error?.message || "An error occurred while fetching data.";
            console.error("Error fetching data:", errorMessage);
            setErrorMsg(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchData();
        }, 1200)

        return () => clearTimeout(timeout)
    }, [formData.webLink])


    return (
        <section className='relative'>
            <div className=" absolute top-4 right-6 flex justify-end">
                <Link href="/">
                    <IoReturnDownBack className="text-white text-[28px]" />
                </Link>
            </div>

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
                        </div>
                    </div>


                    <div className='mt-10 flex justify-center'>
                        <form className='lg:px-6 py-10 rounded-[10px] lg:w-[1016px] mx-auto bg-purple-700/10'>
                            <div className='flex items-center space-x-2 lg:space-x-4'>
                                <TbDots className='lg:text-[80px] text-4xl text-white' />
                                <input
                                    type="text"
                                    name="webLink"
                                    placeholder='https://website.com'
                                    onChange={handleChange}
                                    className='placeholder:text-[#CDD0D8] block w-full focus:border-white focus:outline-white py-[12px] pl-4 pr-2.5 bg-white rounded-[10px]'
                                    required
                                />
                            </div>
                            <div className='h-[450px] overflow-y-scroll mt-4 rounded-[10px] bg-white border-[#201B1B] border py-3 px-4 '>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi inventore incidunt harum perspiciatis numquam dolorem beatae eius aperiam quis sint modi consequatur et dolores ab ex, quo possimus sapiente sit vero repellendus doloremque. Illum eum consectetur dignissimos quas similique quaerat?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe pariatur praesentium dolor inventore, vero, deleniti rerum nemo vel consequuntur quia nulla! Sunt consectetur reiciendis beatae corrupti aliquid cum, autem vero voluptatum, tempora soluta perferendis veniam adipisci, consequuntur est saepe tenetur alias ipsum ab repellat ad? Tempora quis porro ab voluptate.
                                dffd Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias iste incidunt necessitatibus inventore ea ducimus ipsam maxime, quis qui praesentium nobis a beatae aliquam laboriosam porro totam? Cum, amet provident.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi inventore incidunt harum perspiciatis numquam dolorem beatae eius aperiam quis sint modi consequatur et dolores ab ex, quo possimus sapiente sit vero repellendus doloremque. Illum eum consectetur dignissimos quas similique quaerat?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe pariatur praesentium dolor inventore, vero, deleniti rerum nemo vel consequuntur quia nulla! Sunt consectetur reiciendis beatae corrupti aliquid cum, autem vero voluptatum, tempora soluta perferendis veniam adipisci, consequuntur est saepe tenetur alias ipsum ab repellat ad? Tempora quis porro ab voluptate.
                                dffd Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias iste incidunt necessitatibus inventore ea ducimus ipsam maxime, quis qui praesentium nobis a beatae aliquam laboriosam porro totam? Cum, amet provident.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi inventore incidunt harum perspiciatis numquam dolorem beatae eius aperiam quis sint modi consequatur et dolores ab ex, quo possimus sapiente sit vero repellendus doloremque. Illum eum consectetur dignissimos quas similique quaerat?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe pariatur praesentium dolor inventore, vero, deleniti rerum nemo vel consequuntur quia nulla! Sunt consectetur reiciendis beatae corrupti aliquid cum, autem vero voluptatum, tempora soluta perferendis veniam adipisci, consequuntur est saepe tenetur alias ipsum ab repellat ad? Tempora quis porro ab voluptate.
                                dffd Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias iste incidunt necessitatibus inventore ea ducimus ipsam maxime, quis qui praesentium nobis a beatae aliquam laboriosam porro totam? Cum, amet provident.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi inventore incidunt harum perspiciatis numquam dolorem beatae eius aperiam quis sint modi consequatur et dolores ab ex, quo possimus sapiente sit vero repellendus doloremque. Illum eum consectetur dignissimos quas similique quaerat?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe pariatur praesentium dolor inventore, vero, deleniti rerum nemo vel consequuntur quia nulla! Sunt consectetur reiciendis beatae corrupti aliquid cum, autem vero voluptatum, tempora soluta perferendis veniam adipisci, consequuntur est saepe tenetur alias ipsum ab repellat ad? Tempora quis porro ab voluptate.
                                dffd Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias iste incidunt necessitatibus inventore ea ducimus ipsam maxime, quis qui praesentium nobis a beatae aliquam laboriosam porro totam? Cum, amet provident.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi inventore incidunt harum perspiciatis numquam dolorem beatae eius aperiam quis sint modi consequatur et dolores ab ex, quo possimus sapiente sit vero repellendus doloremque. Illum eum consectetur dignissimos quas similique quaerat?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe pariatur praesentium dolor inventore, vero, deleniti rerum nemo vel consequuntur quia nulla! Sunt consectetur reiciendis beatae corrupti aliquid cum, autem vero voluptatum, tempora soluta perferendis veniam adipisci, consequuntur est saepe tenetur alias ipsum ab repellat ad? Tempora quis porro ab voluptate.
                                dffd Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias iste incidunt necessitatibus inventore ea ducimus ipsam maxime, quis qui praesentium nobis a beatae aliquam laboriosam porro totam? Cum, amet provident.
                            </div>
                        </form>
                    </div>
                </Container>
            </div>

            <div className='mt-20'>
                <Container>
                    <div>

                    </div>
                </Container>
            </div>
        </section>
    )
}

export default FetchDetails