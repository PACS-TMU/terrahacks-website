"use client";

import { useState, useEffect } from "react";
import Home from "@/components/section/home";
import About from "@/components/section/about";
import Sponsors from "@/components/section/sponsors";
import Faq from "@/components/section/faq";
import Team from "@/components/section/team/team";
import Contact from "@/components/section/contact";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function Homepage() {
  const [backgroundUrl, setBackgroundUrl] = useState<string>("");
  const [imageAspectRatio, setImageAspectRatio] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Estimated aspect ratio for your background image
  // Adjust this based on your actual image dimensions
  const ESTIMATED_ASPECT_RATIO = 0.5625; // 16:9 aspect ratio (9/16)

  useEffect(() => {
    // Get the background image URL from Supabase
    const supabase = createClient();
    const { data } = supabase.storage
      .from("main")
      .getPublicUrl("Background.png");
    
    setBackgroundUrl(data.publicUrl);

    // Preload image to get its aspect ratio
    if (data.publicUrl) {
      const img = new window.Image();
      img.onload = () => {
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        setImageAspectRatio(aspectRatio);
        setImageLoaded(true);
      };
      img.src = data.publicUrl;
    }
  }, []);

  return (
    <div className="relative">
      {/* Background container - no transition for immediate full size */}
      <div 
        className="absolute inset-x-0 top-0 w-full"
        style={{ 
          paddingBottom: `${(imageAspectRatio || ESTIMATED_ASPECT_RATIO) * 100}%`
        }}
      >
        {/* Placeholder background while image loads */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-blue-50 animate-pulse" />
        )}
        
        {backgroundUrl && (
          <Image
            src={backgroundUrl}
            alt="TerraHacks background"
            fill
            className="object-contain object-top"
            sizes="100vw"
            priority
            quality={90}
            onLoadingComplete={() => setImageLoaded(true)}
          />
        )}
      </div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Sections container */}
        <div>
          <Home />
          <About />
          <Sponsors />
          <Faq />
          <Team />
          <Contact />
        </div>
      </div>
    </div>
  );
}