"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function About() {
  const [beforeImageUrl, setBeforeImageUrl] = useState<string>("");
  const [afterImageUrl, setAfterImageUrl] = useState<string>("");
  const [showAfterImage, setShowAfterImage] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Get the before image URL from Supabase
    const supabase = createClient();
    
    const beforeData = supabase.storage
      .from("main")
      .getPublicUrl("about_before.png");
    
    setBeforeImageUrl(beforeData.data.publicUrl);

    // Preload the after image
    const afterData = supabase.storage
      .from("main")
      .getPublicUrl("about_after.png");
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
  }, []);

  return (
    <section id="about" ref={sectionRef} className="main min-h-screen flex flex-col py-16 md:py-24">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
        ABOUT TERRAHACKS
      </h2>
      
      {/* Content */}
      <div className="max-w-4xl">
        <p className="text-base md:text-lg leading-relaxed text-gray-800 font-medium">
          Formed from the passion of making tech opportunities open to all, TerraHacks was created to provide an inclusive platform for everyone interested in technology to further their skills.
          Over the 36-hour period, you (as a hacker) will collaborate with fellow participants, tackle intriguing challenges, and bring your ideas to life. Prepare to immerse yourself in a challenging, creative, and exciting weekend!
          And lastly, no experience is required! This event is for anyone and everyone; regardless of your background or skill level, come join us! See you all in August!
        </p>
      </div>

      {/* Image section - fills remaining space */}
      <div className="flex-1 w-full min-h-[400px] relative">
        {/* Before image - initially visible */}
        {beforeImageUrl && (
          <Image
            src={beforeImageUrl}
            alt="About TerraHacks - Before"
            width={1920}
            height={1080}
            className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out ${
              showAfterImage ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
        
        {/* After image - shown immediately when scrolled into view */}
        {afterImageUrl && (
          <Image
            src={afterImageUrl}
            alt="About TerraHacks - After"
            width={1920}
            height={1080}
            className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out ${
              showAfterImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
    </section>
  );
}