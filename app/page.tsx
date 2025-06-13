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
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Get the background image URL from Supabase
    const supabase = createClient();
    const { data } = supabase.storage
      .from("main")
      .getPublicUrl("Background.png");
    
    setBackgroundUrl(data.publicUrl);
  }, []);

  return (
    <div className="relative">
      {/* Background container - absolute positioning for scrolling */}
      <div 
        className="absolute inset-0 w-full"
        style={{
          // Set a minimum height to ensure full viewport coverage
          minHeight: '100vh',
          // Height will be auto to accommodate the full image
          height: 'auto'
        }}
      >
        {/* Placeholder background while image loads */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-blue-50 animate-pulse min-h-screen" />
        )}
        
        {backgroundUrl && (
          <img
            src={backgroundUrl}
            alt="TerraHacks background"
            className="w-full h-auto object-contain object-top"
            onLoad={() => setImageLoaded(true)}
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