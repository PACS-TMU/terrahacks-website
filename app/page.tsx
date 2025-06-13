"use client";

import { useState, useEffect } from "react";
import Home from "@/components/section/home";
import About from "@/components/section/about";
import Sponsors from "@/components/section/sponsors";
import Faq from "@/components/section/faq";
import Team from "@/components/section/team/team";
import Contact from "@/components/section/contact";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/section/hero";
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
    <>
      <p>Welcome to the homepage!</p>
      <Home />
      <About />
      <Sponsors />
      <Faq />
      <Team />
      <Contact />
    </>
  );
}