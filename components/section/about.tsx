"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function About() {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    // Get the image URL from Supabase
    const supabase = createClient();
    
    const { data } = supabase.storage
      .from("main")
      .getPublicUrl("about_before.png");
    
    setImageUrl(data.publicUrl);
  }, []);

  return (
    <section className="main min-h-screen flex flex-col py-16 md:py-24">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
        ABOUT TERRAHACKS
      </h2>
      
      {/* Content */}
      <div className="max-w-4xl">
        <p className="text-base md:text-lg leading-relaxed text-gray-700">
          Formed from the passion of making tech opportunities open to all, TerraHacks was created to provide an inclusive platform for everyone interested in technology to further their skills.
          Over the 36-hour period, you (as a hacker) will collaborate with fellow participants, tackle intriguing challenges, and bring your ideas to life. Prepare to immerse yourself in a challenging, creative, and exciting weekend!
          And lastly, no experience is required! This event is for anyone and everyone; regardless of your background or skill level, come join us! See you all in August!
        </p>
      </div>

      {/* Image section - fills remaining space */}
      <div className="flex-1 w-full min-h-[400px]">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="About TerraHacks"
            className="w-full h-full"
            style={{ objectFit: 'fill' }}
          />
        )}
      </div>
    </section>
  );
}