"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import Platforms from "../platforms";

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

export default function Faq() {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [moleImageUrl, setMoleImageUrl] = useState<string>("");
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    

    useEffect(() => {
        const supabase = createClient();

        const fetchFAQs = async () => {
            const { data, error } = await supabase
                .from("faq")
                .select("id, question, answer")
                .order("id", { ascending: true });

            if (error) {
                console.error("Error fetching FAQs: ", error);
                return;
            }

            setFaqs(data || []);
        };

        fetchFAQs();

        const imageData = supabase.storage
            .from("main")
            .getPublicUrl("faq.png");
        setImageUrl(imageData.data.publicUrl);

        // Add mole image fetch
        const moleImageData = supabase.storage
            .from("main")
            .getPublicUrl("mole_3.png");
        setMoleImageUrl(moleImageData.data.publicUrl);
    }, []);

    const toggleExpand = (id: number) => {
        setExpandedId((prevId) => (prevId === id ? null : id));
    };

    return (
        <section id="faq" className="main min-h-[95vh] flex flex-col items-start pb-16 md:pb-24 px-4 md:px-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                FAQ
            </h2>

            <div className="max-w-4xl w-full mb-12 px-4 md:px-0">
                {faqs.map((faq) => {
                    const isOpen = faq.id === expandedId;

                    return (
                        <div key={faq.id} className="mb-4 border border-gray-300 rounded-md overflow-hidden shadow-sm">
                            <button
                                onClick={() => toggleExpand(faq.id)}
                                className="flex justify-between items-center w-full p-4 bg-gray-100 hover:bg-gray-200 transition-all"
                                aria-expanded={isOpen}
                                aria-controls={`faq-${faq.id}`}
                            >
                                <span className="text-left text-base font-semibold text-gray-900">
                                    {faq.question}
                                </span>
                                {isOpen ? (
                                    <IoChevronUp className="text-xl" />
                                ) : (
                                    <IoChevronDown className="text-xl" />
                                )}
                            </button>

                            <div
                                id={`faq-${faq.id}`}
                                className={`transition-all duration-300 ease-in-out px-4 text-gray-800 font-medium ${isOpen ? "max-h-[300px] py-4 opacity-100" : "max-h-0 overflow-hidden opacity-0"
                                    }`}
                            >
                                {faq.answer}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Image section - natural height, no cropping */}
            <Platforms
                imageUrl={imageUrl}
                moleImageUrl={moleImageUrl}
                position="right"
                alt="FAQ Background Image"
                customMoleClasses="absolute top-[8.2%] left-[24.6%] z-10 w-[11%] h-auto"
            />
        </section>
    );
}