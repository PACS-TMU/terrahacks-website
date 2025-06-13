"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import Image from "next/image";

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

export default function Faq() {
    const [beforeImageUrl, setBeforeImageUrl] = useState<string>("");
    const [afterImageUrl, setAfterImageUrl] = useState<string>("");
    const [showAfterImage, setShowAfterImage] = useState(false);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const hasTriggeredRef = useRef(false);

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

        const beforeData = supabase.storage
            .from("main")
            .getPublicUrl("faq_before.png");
        setBeforeImageUrl(beforeData.data.publicUrl);

        const afterData = supabase.storage
            .from("main")
            .getPublicUrl("faq_after.png");
        setAfterImageUrl(afterData.data.publicUrl);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasTriggeredRef.current) {
                        hasTriggeredRef.current = true;
                        setShowAfterImage(true);
                    }
                });
            },
            { threshold: 0.6 }
        );

        if (imageContainerRef.current) {
            observer.observe(imageContainerRef.current);
        }

        return () => {
            if (imageContainerRef.current) {
                observer.unobserve(imageContainerRef.current);
            }
        };
    }, []);

    const toggleExpand = (id: number) => {
        setExpandedId((prevId) => (prevId === id ? null : id));
    };

    return (
        <section id="faq" className="main min-h-screen flex flex-col items-start py-16 md:py-24 px-4 md:px-20">
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
            <div ref={imageContainerRef} className="w-full relative mt-8">
                {/* Before image - initially visible */}
                {beforeImageUrl && (
                    <Image
                        src={beforeImageUrl}
                        alt="FAQ - Before"
                        width={1920}
                        height={1080}
                        className={`w-full h-auto transition-opacity duration-1000 ease-in-out ${
                            showAfterImage ? "opacity-0" : "opacity-100"
                        }`}
                    />
                )}

                {/* After image - shown when scrolled into view */}
                {afterImageUrl && (
                    <Image
                        src={afterImageUrl}
                        alt="FAQ - After"
                        width={1920}
                        height={1080}
                        className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out ${
                            showAfterImage ? "opacity-100" : "opacity-0"
                        }`}
                    />
                )}
            </div>
        </section>
    );
}