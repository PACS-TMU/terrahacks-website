"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Platforms from "../platforms";

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
  const [imageUrl, setImageUrl] = useState<string>("");
  const [sponsorshipPackageUrl, setSponsorshipPackageUrl] = useState<string>("");
  const [sponsorsWithUrls, setSponsorsWithUrls] = useState<any[]>([]);

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

    // Get the sponsorship package URL
    const sponsorshipPackageData = supabase.storage
      .from("sponsors/sponsorship_package")
      .getPublicUrl("sponsorship_package.pdf");
    setSponsorshipPackageUrl(sponsorshipPackageData.data.publicUrl);

    // Get the image URL
    const imageData = supabase.storage
      .from("main")
      .getPublicUrl("sponsors.png");
    setImageUrl(imageData.data.publicUrl);
  }, []);

  return (
    <section id="sponsors" className="main min-h-[95vh] flex flex-col pb-16 md:pb-24 items-end">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-right">
        OUR SPONSORS
      </h2>

      {/* Content */}
      <div className="max-w-4xl text-right mb-12">
        <p className="text-base md:text-lg leading-relaxed text-gray-800 font-medium mb-4">
          We are grateful to our sponsors for their support; this event would not be possible without them! These contributions will help shape an unforgettable experience for all our attendees.
        </p>
        <button
          className="bg-green-600 text-background px-6 py-3 rounded-lg shadow hover:bg-green-700 transition-colors duration-300"
          onClick={() => window.open(sponsorshipPackageUrl, "_blank")}
        >
          Sponsorship Package
        </button>
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
                <Image
                  src={sponsor.imageUrl}
                  alt={sponsor.full_name}
                  width={1920}
                  height={1080}
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
      <Platforms
        imageUrl={imageUrl}
        alt="Sponsors Background Platforms Image"
      />
    </section>
  );
}