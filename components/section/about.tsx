"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrls, setImageUrls] = useState<{ stone: string; terrain: string }>({
    stone: "",
    terrain: ""
  });
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get the image URLs from Supabase
    const supabase = createClient();
    
    const stoneUrl = supabase.storage
      .from("main")
      .getPublicUrl("About_Stone.svg");
    
    const terrainUrl = supabase.storage
      .from("main")
      .getPublicUrl("About_Terrain.png");
    
    setImageUrls({
      stone: stoneUrl.data.publicUrl,
      terrain: terrainUrl.data.publicUrl
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (imagesRef.current) {
      observer.observe(imagesRef.current);
    }

    return () => {
      if (imagesRef.current) {
        observer.unobserve(imagesRef.current);
      }
    };
  }, []);

  return (
    <section className="main py-16 md:py-24">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
        ABOUT TERRAHACKS
      </h2>
      
      {/* Content */}
      <div className="max-w-4xl mb-12">
        <p className="text-base md:text-lg leading-relaxed text-gray-700">
          Formed from the passion of making tech opportunities open to all, TerraHacks was created to provide an inclusive platform for everyone interested in technology to further their skills.
          Over the 36-hour period, you (as a hacker) will collaborate with fellow participants, tackle intriguing challenges, and bring your ideas to life. Prepare to immerse yourself in a challenging, creative, and exciting weekend!
          And lastly, no experience is required! This event is for anyone and everyone; regardless of your background or skill level, come join us! See you all in August!
        </p>
      </div>

      {/* Images section - reduced gap for closer positioning */}
      <div ref={imagesRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 lg:gap-2">
        {/* First image - About_Stone.svg */}
        <div 
          className={`relative h-[400px] md:h-[500px] lg:h-[800px] transition-all duration-1000 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-full opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {imageUrls.stone && (
            <Image
              src={imageUrls.stone}
              alt="About Stone"
              fill
              className="object-contain md:object-right"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>

        {/* Second image - About_Terrain.png */}
        <div 
          className={`relative h-[300px] md:h-[400px] lg:h-[500px] transition-all duration-1000 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-full opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {imageUrls.terrain && (
            <Image
              src={imageUrls.terrain}
              alt="About Terrain"
              fill
              className="object-contain md:object-left"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
      </div>
    </section>
  );
}