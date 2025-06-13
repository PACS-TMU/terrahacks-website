"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

interface Sponsor {
  id: number;
  full_name: string;
  short_name: string;
  logo: string;
  tier: string;
  link: string;
  is_empty: boolean;
}

export default function Sponsors() {
  const [beforeImageUrl, setBeforeImageUrl] = useState<string>("");
  const [afterImageUrl, setAfterImageUrl] = useState<string>("");
  const [showAfterImage, setShowAfterImage] = useState(false);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [sponsorsWithUrls, setSponsorsWithUrls] = useState<any[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    // Fetch sponsors and their logo URLs
    const fetchSponsors = async () => {
      const { data, error } = await supabase
        .from("sponsors")
        .select("*")
        .eq("is_empty", false)
        .order("id", { ascending: true });
      
      if (error) {
        console.error("Error fetching sponsors:", error);
        return;
      }
      
      setSponsors(data || []);

      // Get public URLs for logos
      const sponsorsWithPublicUrls = (data || []).map((sponsor: Sponsor) => {
        const { data: urlData } = supabase.storage
          .from("sponsors")
          .getPublicUrl(sponsor.logo);
        return {
          ...sponsor,
          imageUrl: urlData?.publicUrl || "",
        };
      });
      setSponsorsWithUrls(sponsorsWithPublicUrls);
    };

    fetchSponsors();

    // Get the before image URL
    const beforeData = supabase.storage
      .from("main")
      .getPublicUrl("sponsors_before.png");
    setBeforeImageUrl(beforeData.data.publicUrl);

    // Preload the after image
    const afterData = supabase.storage
      .from("main")
      .getPublicUrl("sponsors_after.png");
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
        threshold: 0.9,
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
    <section className="main min-h-screen flex flex-col py-16 md:py-24 items-end">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-right">
        OUR SPONSORS
      </h2>

      {/* Content */}
      <div className="max-w-4xl text-right mb-12">
        <p className="text-base md:text-lg leading-relaxed text-gray-700">
          We are grateful to our sponsors for their support; this event would not be possible without them! These contributions will help shape an unforgettable experience for all our attendees.
        </p>
      </div>

      {/* Sponsors grid */}
      <div className="w-full flex justify-end">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-5xl">
          {sponsorsWithUrls.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center p-6 hover:scale-105"
              title={sponsor.full_name}
            >
              {sponsor.imageUrl ? (
                <img
                  src={sponsor.imageUrl}
                  alt={sponsor.full_name}
                  className="object-contain max-h-24 max-w-full grayscale group-hover:grayscale-0 transition"
                  style={{ maxHeight: 96 }}
                />
              ) : (
                <div className="text-gray-400 text-center">
                  <p className="text-sm font-medium">{sponsor.short_name}</p>
                  <p className="text-xs mt-1">Image not available</p>
                </div>
              )}
              <p className="text-center mt-2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {sponsor.short_name}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Image section - fills remaining space */}
      <div ref={imageContainerRef} className="flex-1 w-full min-h-[400px] relative mt-16">
        {/* Before image - initially visible */}
        {beforeImageUrl && (
          <img
            src={beforeImageUrl}
            alt="Sponsors - Before"
            className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out ${
              showAfterImage ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        {/* After image - shown when scrolled into view */}
        {afterImageUrl && (
          <img
            src={afterImageUrl}
            alt="Sponsors - After"
            className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out ${
              showAfterImage ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
    </section>
  );
}