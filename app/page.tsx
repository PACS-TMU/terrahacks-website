"use client";

import { useState, useEffect } from "react";
import Home from "@/components/section/home";
import About from "@/components/section/about";
import Sponsors from "@/components/section/sponsors";
import Faq from "@/components/section/faq";
import Team from "@/components/section/team/team";
import Contact from "@/components/section/contact";
import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/section/hero";
import { createClient } from "@/utils/supabase/client";
import Footer from "@/components/footer";
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
    <>
      {/* Background Image Container */}
      <div className="fixed inset-0 z-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-blue-50 animate-pulse" />
        )}
        {backgroundUrl && (
          <Image
            src={backgroundUrl}
            alt="TerraHacks background"
            fill
            className="object-cover"
            onLoad={() => setImageLoaded(true)}
            priority
          />
        )}
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Home />
        <About />
        <Sponsors />
        <Faq />
        <Team />
        <Contact />
        <Footer/>
      </div>
    </>
  );
}