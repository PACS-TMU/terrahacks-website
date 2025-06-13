"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Carasoul from "@/components/section/team/carasoul";

export default function Team() {
  const [beforeImageUrl, setBeforeImageUrl] = useState<string>("");
  const [afterImageUrl, setAfterImageUrl] = useState<string>("");
  const [showAfterImage, setShowAfterImage] = useState(false);
  const [observerReady, setObserverReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Get the before image URL from Supabase
    const supabase = createClient();
    
    const beforeData = supabase.storage
      .from("main")
      .getPublicUrl("team_before.png");
    
    setBeforeImageUrl(beforeData.data.publicUrl);

    // Progressive delay: 1600ms for Team section (last section)
    const readyTimeout = setTimeout(() => {
      setObserverReady(true);
    }, 1600);

    return () => clearTimeout(readyTimeout);
  }, []);

  useEffect(() => {
    if (!observerReady) return;

    let timeoutId: NodeJS.Timeout;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !showAfterImage && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            
            timeoutId = setTimeout(() => {
              const supabase = createClient();
              const afterData = supabase.storage
                .from("main")
                .getPublicUrl("team_after.png");
              
              setAfterImageUrl(afterData.data.publicUrl);
              setShowAfterImage(true);
            }, 3000);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-100px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showAfterImage, observerReady]);

  return (
    <section ref={sectionRef} className="main min-h-screen flex flex-col py-16 md:py-24">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-right">
        MEET THE TEAM
      </h2>
      
      <Carasoul />
      
      {/* Image section - fills remaining space */}
      <div className="flex-1 w-full min-h-[400px] relative">
        {/* Before image - initially visible */}
        {beforeImageUrl && (
          <img
            src={beforeImageUrl}
            alt="About TerraHacks - Before"
            className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out ${
              showAfterImage ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
        
        {/* After image - loaded and shown when scrolled into view */}
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