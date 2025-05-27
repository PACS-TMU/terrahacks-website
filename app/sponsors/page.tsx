import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

// Define sponsor type based on the JSON structure
interface Sponsor {
  id: number;
  fullName: string;
  shortName: string;
  logo: string;
  tier: string;
  link: string;
  isEmpty: boolean;
}

// Import sponsors data
import sponsorsData from "@/public/data/sponsors.json";

// Group sponsors by tier
const groupSponsorsByTier = (sponsors: Sponsor[]) => {
  return sponsors.reduce((acc, sponsor) => {
    if (!sponsor.isEmpty) {
      if (!acc[sponsor.tier]) {
        acc[sponsor.tier] = [];
      }
      acc[sponsor.tier].push(sponsor);
    }
    return acc;
  }, {} as Record<string, Sponsor[]>);
};

// Define tier order and display names
const tierOrder = ["Tree", "Sprout", "Seedling"];
const tierDisplayNames: Record<string, string> = {
  Tree: "Tree Sponsors",
  Sprout: "Sprout Sponsors",
  Seedling: "Seedling Sponsors",
};

export default async function SponsorsPage() {
  const supabase = await createClient();
  
  // Group sponsors by tier
  const sponsorsByTier = groupSponsorsByTier(sponsorsData);
  
  // Function to get signed URL for sponsor logo
  const getSignedUrl = async (logoPath: string) => {
    const { data, error } = await supabase.storage
      .from("sponsors")
      .createSignedUrl(logoPath, 3600); // 1 hour expiry
    
    if (error) {
      console.error("Error getting signed URL:", error);
      return null;
    }
    
    return data.signedUrl;
  };
  
  // Get signed URLs for all sponsors
  const sponsorsWithUrls = await Promise.all(
    tierOrder.map(async (tier) => {
      const sponsors = sponsorsByTier[tier] || [];
      const sponsorsWithSignedUrls = await Promise.all(
        sponsors.map(async (sponsor) => ({
          ...sponsor,
          imageUrl: await getSignedUrl(sponsor.logo),
        }))
      );
      return { tier, sponsors: sponsorsWithSignedUrls };
    })
  );

  return (
    <div className="main min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Our Sponsors
        </h1>
        
        <p className="text-lg md:text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          TerraHacks wouldn't be possible without the generous support of our sponsors. 
          Thank you for helping us create an amazing experience for our participants!
        </p>

        {sponsorsWithUrls.map(({ tier, sponsors }) => (
          sponsors.length > 0 && (
            <div key={tier} className="mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
                {tierDisplayNames[tier]}
              </h2>
              
              <div className={`grid gap-8 ${
                tier === "Tree" 
                  ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" 
                  : tier === "Sprout"
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
              }`}>
                {sponsors.map((sponsor) => (
                  <a
                    key={sponsor.id}
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className={`
                      bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 
                      flex items-center justify-center p-6 group-hover:scale-105
                      ${tier === "Tree" ? "h-48" : tier === "Sprout" ? "h-36" : "h-28"}
                    `}>
                      {sponsor.imageUrl ? (
                        <Image
                          src={sponsor.imageUrl}
                          alt={sponsor.fullName}
                          width={tier === "Tree" ? 300 : tier === "Sprout" ? 200 : 150}
                          height={tier === "Tree" ? 150 : tier === "Sprout" ? 100 : 75}
                          className="object-contain max-h-full max-w-full"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <p className="text-sm">{sponsor.shortName}</p>
                          <p className="text-xs">Image not available</p>
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )
        ))}
        
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold mb-4">Interested in Sponsoring?</h3>
          <p className="text-gray-600 mb-6">
            Join us in making TerraHacks 2025 an unforgettable experience for student innovators!
          </p>
          <a
            href="mailto:contact@terrahacks.ca?subject=Sponsorship%20Inquiry"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors duration-300"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </div>
  );
}