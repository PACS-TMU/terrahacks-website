"use client";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Carousel from "@/components/section/team/carousel";
import Platforms from "@/components/platforms";
import './team.css';

export default function Team() {
  const [beforeImageUrl, setBeforeImageUrl] = useState<string>("");
  const [afterImageUrl, setAfterImageUrl] = useState<string>("");
  const [showAfterImage, setShowAfterImage] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    // Get the before image URL
    const beforeData = supabase.storage
      .from("main")
      .getPublicUrl("team_before.png");
    setBeforeImageUrl(beforeData.data.publicUrl);

    // Preload the after image
    const afterData = supabase.storage
      .from("main")
      .getPublicUrl("team_after.png");
    setAfterImageUrl(afterData.data.publicUrl);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            setShowAfterImage(true);
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: "0px"
      }
    );

    if (imageContainerRef.current) {
      observer.observe(imageContainerRef.current);
    }

    return () => {
      if (imageContainerRef.current) {
        observer.unobserve(imageContainerRef.current);
      }
    };
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
        beforeImageUrl={beforeImageUrl}
        afterImageUrl={afterImageUrl}
        showAfterImage={showAfterImage}
        ref={imageContainerRef}
      />
    </section>
  );
}