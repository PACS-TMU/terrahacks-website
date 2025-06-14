"use client";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Carousel from "@/components/section/team/carousel";
import Platforms from "@/components/platforms";
import './team.css';

export default function Team() {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const supabase = createClient();

    // Get the image URL
    const imageData = supabase.storage
      .from("main")
      .getPublicUrl("team.png");
    setImageUrl(imageData.data.publicUrl);
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
        alt="TerraHacks Team Platforms Image"
      />
    </section>
  );
}