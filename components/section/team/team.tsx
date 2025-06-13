"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Carasoul from "@/components/section/team/carasoul";

export default function Team() {
  const [beforeImageUrl, setBeforeImageUrl] = useState<string>("");
  const [afterImageUrl, setAfterImageUrl] = useState<string>("");
  const [showAfterImage, setShowAfterImage] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();
    
    // Get the before image URL
    const beforeData = supabase.storage
      .from("main")
      .getPublicUrl("team_before.png");
    setBeforeImageUrl(beforeData.data.publicUrl);
    
    // Preload the after image
    const afterData = supabase.storage
      .from("main")
      .getPublicUrl("team_after.png");
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
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-right">
        MEET THE TEAM
      </h2>
      
      <Carasoul />
      
      {/* Image section - fills remaining space */}
      <div ref={imageContainerRef} className="flex-1 w-full min-h-[400px] relative">
        {/* Before image - initially visible */}
        {beforeImageUrl && (
          <img
            src={beforeImageUrl}
            alt="Team - Before"
            className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out ${
              showAfterImage ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
        
        {/* After image - shown when scrolled into view */}
        {afterImageUrl && (
          <img
            src={afterImageUrl}
            alt="Team - After"
            className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out ${
              showAfterImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
    </section>
  );
}