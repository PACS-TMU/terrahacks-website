"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

export default function Faq(){
    const [beforeImageUrl, setBeforeImageUrl] = useState<string>("");
    const [afterImageUrl, setAfterImageUrl] = useState<string>("");
    const [showAfterImage, setShowAfterImage] = useState(false);
    const [observerReady, setObserverReady] = useState(false);
    const [faqs, setFaq] = useState<FAQ[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const hasTriggeredRef = useRef(false);

    useEffect(()=>{
        const supabase = createClient();
        const fetchfaq = async () => {
            const {data, error} = await supabase
            .from("faq")
            .select("id, question, answer")
            .order("id",{ascending: true});
        if (error) {
            console.error("Error fetching FAQs: ", error);
            return;
        }
        setFaq(data || []);
    };
       fetchfaq(); 
        const beforeData = supabase.storage
            .from("main")
            .getPublicUrl("faq_before.png");
            setBeforeImageUrl(beforeData.data.publicUrl);

        // Set observer ready after 1000ms
        const readyTimeout = setTimeout(() => {
            setObserverReady(true);
        }, 1000);

        return () => clearTimeout(readyTimeout);
    }, []);

    useEffect(() => {
        if (!observerReady) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !hasTriggeredRef.current) {
                hasTriggeredRef.current = true;
                // Load after image and show it immediately
                const supabase = createClient();
                const afterData = supabase.storage
                  .from("main")
                  .getPublicUrl("faq_after.png");
                setAfterImageUrl(afterData.data.publicUrl);
                setShowAfterImage(true);
              }
            });
          },
          {
            threshold: 0.4,
            rootMargin: "0px"
          }
        );

        if (sectionRef.current) {
          observer.observe(sectionRef.current);
        }
        
        return () => {
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        };
    }, [observerReady]);

    return (
         <section ref={sectionRef} className="main min-h-screen flex flex-col py-18 md:py-24">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
        FAQ
      </h2>
       {/* FAQ Items */}
        <div className="max-w-6xl">
            {faqs.map((faq) => (
                <div key={faq.id} className="faq-item mb-6">
                    <h3 className="text-m font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                </div>
            ))} 
        </div>
         {/* Image section */}
      <div className="flex-1 w-full min-h-[400px] relative">
        {/* Before image */}
        {beforeImageUrl && (
          <img
            src={beforeImageUrl}
            alt="About TerraHacks - Before"
            className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out ${
              showAfterImage ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
        
        {/* After image */}
        {afterImageUrl && showAfterImage && (
          <img
            src={afterImageUrl}
            alt="About TerraHacks - After"
            className="absolute top-0 left-0 w-full h-auto opacity-100"
          />
        )}
      </div>
    </section>
    );
}