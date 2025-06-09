"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

export default function Sponsors() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrls, setImageUrls] = useState<{ terrain: string; stone: string }>({
    terrain: "",
    stone: ""
  });
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get the image URLs from Supabase
    const supabase = createClient();
    
    const terrainUrl = supabase.storage
      .from("main")
      .getPublicUrl("Sponsors_Terrain.png");
    
    const stoneUrl = supabase.storage
      .from("main")
      .getPublicUrl("Sponsors_Stone.png");
    
    setImageUrls({
      terrain: terrainUrl.data.publicUrl,
      stone: stoneUrl.data.publicUrl
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
        OUR SPONSORS
      </h2>
      
      {/* Content */}
      <div className="max-w-4xl mb-12">
        <p className="text-base md:text-lg leading-relaxed text-gray-700">
          We are grateful to our sponsors for their support; this event would not be possible without them! These contributions will help shape an unforgettable experience for all our attendees.
        </p>
      </div>

      {/* Images section - 50/50 split */}
      <div ref={imagesRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {/* First image - Sponsors_Terrain.png */}
        <div 
          className={`relative h-[300px] md:h-[400px] lg:h-[500px] transition-all duration-1000 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-full opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {imageUrls.terrain && (
            <Image
              src={imageUrls.terrain}
              alt="Sponsors Terrain"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>

        {/* Second image - Sponsors_Stone.png */}
        <div 
          className={`relative h-[300px] md:h-[400px] lg:h-[500px] transition-all duration-1000 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-full opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {imageUrls.stone && (
            <Image
              src={imageUrls.stone}
              alt="Sponsors Stone"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
      </div>
    </section>
  );
}