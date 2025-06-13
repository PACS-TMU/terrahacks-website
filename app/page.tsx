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
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Get the background image URL from Supabase
    const supabase = createClient();
    const { data } = supabase.storage
      .from("main")
      .getPublicUrl("Background.png");
    
    setBackgroundUrl(data.publicUrl);

    // Load image to get its natural dimensions
    if (data.publicUrl) {
      const img = new window.Image();
      img.onload = () => {
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = data.publicUrl;
    }
  }, []);

  // Calculate the minimum height needed to show the full image
  const calculateMinHeight = () => {
    if (imageSize.width && imageSize.height) {
      const aspectRatio = imageSize.height / imageSize.width;
      if (typeof window !== 'undefined') {
        return window.innerWidth * aspectRatio;
      }
    }
    return 0;
  };

  return (
    <div className="relative">
      {/* Background container - fixed positioning to prevent layout shifts */}
      <div className="fixed inset-0 w-full h-full">
        {backgroundUrl && (
          <Image
            src={backgroundUrl}
            alt="TerraHacks background"
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
            quality={90}
            placeholder="empty"
          />
        )}
      </div>
      
      {/* Content wrapper with proper spacing */}
      <div className="relative z-10">
        {/* Sections container */}
        <div className="min-h-screen">
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