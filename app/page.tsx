"use client";

import { useState, useEffect } from "react";
import Home from "@/components/section/home";
import About from "@/components/section/about";
import Sponsors from "@/components/section/sponsors";
import Faq from "@/components/section/faq";
import Team from "@/components/section/team";
import Contact from "@/components/section/contact";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function Homepage() {
  const [backgroundUrl, setBackgroundUrl] = useState<string>("");

  useEffect(() => {
    // Get the background image URL from Supabase
    const supabase = createClient();
    const { data } = supabase.storage
      .from("main")
      .getPublicUrl("Background.png");
    
    setBackgroundUrl(data.publicUrl);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background image - fixed and full screen */}
      {backgroundUrl && (
        <div className="fixed inset-0 w-full h-full">
          <Image
            src={backgroundUrl}
            alt="TerraHacks background"
            fill
            className="object-cover"
            sizes="100vw"
            priority
            quality={90}
          />
        </div>
      )}
      
      {/* Content sections - no background or blur */}
      <div className="relative z-10">
        <Home />
        <About />
        <Sponsors />
        <Faq />
        <Team />
        <Contact />
      </div>
    </div>
  );
}