"use client";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Carousel from "@/components/section/team/carousel";
import Platforms from "@/components/platforms";
import './team.css';

export default function Team() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [moleImageUrl, setMoleImageUrl] = useState<string>("");

  useEffect(() => {
    const supabase = createClient();

    // Get the image URL
    const imageData = supabase.storage
      .from("main")
      .getPublicUrl("team.png");
    setImageUrl(imageData.data.publicUrl);

    // Add mole image fetch
    const moleImageData = supabase.storage
      .from("main")
      .getPublicUrl("mole_4.png");
    setMoleImageUrl(moleImageData.data.publicUrl);
  }, []);

  return (
    <section id="team" className="main min-h-[95vh] flex flex-col pb-16 md:pb-24">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-right">
        MEET THE TEAM
      </h2>

      <Carousel />

      {/* Image section - natural height, no cropping */}
      <Platforms
        imageUrl={imageUrl}
        moleImageUrl={moleImageUrl}
        position="left"
        alt="TerraHacks Team Platforms Image"
        customMoleClasses="absolute top-[9.3%] left-[15.6%] z-10 w-[11%] h-auto"
      />
    </section>
  );
}