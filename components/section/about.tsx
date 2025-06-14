"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Platforms from "@/components/platforms";

export default function About() {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const supabase = createClient();

    const imageData = supabase.storage
      .from("main")
      .getPublicUrl("about.png");
    setImageUrl(imageData.data.publicUrl);
  }, []);

  return (
    <section id="about" className="main min-h-[95vh] flex flex-col pt-32 md:pt-24">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
        ABOUT TERRAHACKS
      </h2>

      {/* Content */}
      <div className="max-w-4xl">
        <p className="text-base md:text-lg leading-relaxed text-gray-800 font-medium">
          Formed from the passion of making tech opportunities open to all, TerraHacks was created to provide an inclusive platform for everyone interested in technology to further their skills.
          Over the 36-hour period, you (as a hacker) will collaborate with fellow participants, tackle intriguing challenges, and bring your ideas to life. Prepare to immerse yourself in a challenging, creative, and exciting weekend!
          And lastly, no experience is required! This event is for anyone and everyone; regardless of your background or skill level, come join us! See you all in August!
        </p>
      </div>

      {/* Image section - fills remaining space */}
      <Platforms
        imageUrl={imageUrl}
        alt="About TerraHacks Platforms"
      />
    </section>
  );
}