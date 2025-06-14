"use client";

import About from "@/components/section/about";
import Sponsors from "@/components/section/sponsors";
import Faq from "@/components/section/faq";
import Team from "@/components/section/team/team";
import Contact from "@/components/section/contact";
import Hero from "@/components/section/hero";
import Footer from "@/components/footer";

import Image from "next/image";

export default function Homepage() {
  return (
    <div className="w-full">   
      {/* Hero section */}
      <div className="relative z-20">
        <Hero />
      </div>

      {/* Container for sections with background - starts immediately after hero */}
      <div className="relative w-full -mt-1 pb-12">
        {/* Background that covers this entire container */}
        <div className="absolute inset-0 z-0 min-h-screen">
          <Image
            src="/assets/background.png"
            alt="Background Gradient"
            fill
            className="object-cover"
            priority
          />
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