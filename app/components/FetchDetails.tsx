"use client";

import React from 'react';
import { GoogleGenAI } from "@google/genai";

const FetchDetails = () => {

    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY });

    const fetchData = async () => {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Analyze the following website content and provide a brief overview of its key aspects, including content, potential SEO elements, and user experience. Then, provide a numbered list of specific and actionable notes on how to make this website better. Focus on improvements related to content quality, clarity, SEO optimization, user navigation, accessibility, and overall effectiveness.

            Website URL: https://www.lumixus-studio.netlify.app`,
        });
        console.log(response?.text);
        return response?.text;
    }

    // fetchData();

    return (
        <section>
            <form>
                <div>
                    <input
                        type="text"
                        name='content'
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder="Ask Me Something You Want"
                        className="form-control"
                    />
                </div>

                <div>
                    <button>Submit</button>
                </div>
            </form>
        </section>
    )
}

export default FetchDetails