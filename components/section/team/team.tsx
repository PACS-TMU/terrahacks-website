"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Carasoul from "@/components/section/team/carasoul";



export default function Team() {
  const [beforeImageUrl, setBeforeImageUrl] = useState<string>("");
  const [afterImageUrl, setAfterImageUrl] = useState<string>("");
  const [showAfterImage, setShowAfterImage] = useState(false);


    //Caraou
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Get the before image URL from Supabase
    const supabase = createClient();
    
    const beforeData = supabase.storage
      .from("main")
      .getPublicUrl("team_before.png");
    
    setBeforeImageUrl(beforeData.data.publicUrl);
  }, []);

    useEffect(() => {
    // Set up intersection observer for scroll animation
    let timeoutId: NodeJS.Timeout;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !showAfterImage) {
            // Wait 3 seconds before loading and showing the after image
            timeoutId = setTimeout(() => {
              const supabase = createClient();
              const afterData = supabase.storage
                .from("main")
                .getPublicUrl("team_after.png");
              
              setAfterImageUrl(afterData.data.publicUrl);
              setShowAfterImage(true);
            }, 3000); // 3 second delay
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
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
      // Clear timeout if component unmounts or user scrolls away
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showAfterImage]);

  return (
    <section ref={sectionRef} className="main min-h-screen flex flex-col py-16 md:py-24">

   
      {/* Header */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-right">
        MEET THE TEAM
      </h2>
         <Carasoul />
      {/* Description */}

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