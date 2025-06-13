"use client";

import { useState, useEffect } from "react";
import About from "@/components/section/about";
import Sponsors from "@/components/section/sponsors";
import Faq from "@/components/section/faq";
import Team from "@/components/section/team/team";
import Contact from "@/components/section/contact";
import Hero from "@/components/section/hero";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Footer from "@/components/footer";

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
    <div className="w-full">   
      {/* Hero section */}
      <div className="relative z-20">
        <Hero />
      </div>

      {/* Container for sections with background - starts immediately after hero */}
      <div className="relative w-full -mt-1">
        {/* Background that covers this entire container */}
        <div className="absolute inset-0 z-0">
          {!imageLoaded && (
            <div className="w-full h-full bg-gradient-to-b from-blue-200 to-green-200" />
          )}
          {backgroundUrl && (
            <Image
              src={backgroundUrl}
              alt="TerraHacks background"
              fill
              className="object-cover"
              onLoad={() => setImageLoaded(true)}
              priority
              style={{ objectPosition: 'center top' }}
            />
          )}
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Content sections */}
        <div className="relative z-10">
          <About />
          <Sponsors />
          <Faq />
          <Team />
          <Contact />
          <Footer />
        </div>
      </div>
    </div>
  );
}