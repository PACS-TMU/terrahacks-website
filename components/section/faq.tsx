"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

export default function Faq() {
    const [beforeImageUrl, setBeforeImageUrl] = useState<string>("");
    const [afterImageUrl, setAfterImageUrl] = useState<string>("");
    const [showAfterImage, setShowAfterImage] = useState(false);
    const [faqs, setFaq] = useState<FAQ[]>([]);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const hasTriggeredRef = useRef(false);

    useEffect(() => {
        const supabase = createClient();
        
        // Fetch FAQ data
        const fetchfaq = async () => {
            const { data, error } = await supabase
                .from("faq")
                .select("id, question, answer")
                .order("id", { ascending: true });
            
            if (error) {
                console.error("Error fetching FAQs: ", error);
                return;
            }
            
            setFaq(data || []);
        };
        
        fetchfaq();
        
        // Get the before image URL
        const beforeData = supabase.storage
            .from("main")
            .getPublicUrl("faq_before.png");
        setBeforeImageUrl(beforeData.data.publicUrl);
        
        // Preload the after image
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
            {
                threshold: 0.6,
                rootMargin: "0px"
            }
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

    return (
        <section className="main min-h-screen flex flex-col py-16 md:py-24">
            {/* Header */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                FAQ
            </h2>
            
            {/* FAQ Items */}
            <div className="max-w-6xl mb-12">
                {faqs.map((faq) => (
                    <div key={faq.id} className="faq-item mb-6">
                        <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                        <p className="text-gray-700">{faq.answer}</p>
                    </div>
                ))} 
            </div>
            
            {/* Image section */}
            <div ref={imageContainerRef} className="flex-1 w-full min-h-[400px] relative">
                {/* Before image */}
                {beforeImageUrl && (
                    <img
                        src={beforeImageUrl}
                        alt="FAQ - Before"
                        className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out ${
                            showAfterImage ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                )}
                
                {/* After image */}
                {afterImageUrl && (
                    <img
                        src={afterImageUrl}
                        alt="FAQ - After"
                        className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out ${
                            showAfterImage ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                )}
            </div>
        </section>
    );
}