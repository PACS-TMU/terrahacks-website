import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

// Define sponsor type based on the database schema
interface Sponsor {
  id: number;
  full_name: string;
  short_name: string;
  logo: string;
  tier: string;
  link: string;
  is_empty: boolean;
  created_at?: string;
  updated_at?: string;
}

// Define tier order and display names
const tierOrder = ["Tree", "Sprout", "Seedling"];
const tierDisplayNames: Record<string, string> = {
  Tree: "Tree Sponsors",
  Sprout: "Sprout Sponsors",
  Seedling: "Seedling Sponsors",
};

// Group sponsors by tier
const groupSponsorsByTier = (sponsors: Sponsor[]) => {
  return sponsors.reduce((acc, sponsor) => {
    if (!sponsor.is_empty) {
      if (!acc[sponsor.tier]) {
        acc[sponsor.tier] = [];
      }
      acc[sponsor.tier].push(sponsor);
    }
    return acc;
  }, {} as Record<string, Sponsor[]>);
};

export default async function SponsorsPage() {
  const supabase = await createClient();
  
  // Fetch all sponsors from the database
  const { data: sponsors, error: sponsorsError } = await supabase
    .from("sponsors")
    .select("*")
    .eq("is_empty", false)
    .order("id", { ascending: true });

  if (sponsorsError) {
    console.error("Error fetching sponsors:", sponsorsError);
    return (
      <div className="main min-h-screen py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Sponsors</h1>
          <p className="text-red-600">Error loading sponsors. Please try again later.</p>
        </div>
      </div>
    );
  }

  // If no sponsors found
  if (!sponsors || sponsors.length === 0) {
    return (
      <div className="main min-h-screen py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Sponsors</h1>
          <p className="text-gray-600">No sponsors found.</p>
        </div>
      </div>
    );
  }
  
  // Group sponsors by tier
  const sponsorsByTier = groupSponsorsByTier(sponsors);
  
  // Function to get public URL for sponsor logo
  const getPublicUrl = (logoPath: string) => {
    try {
      const { data } = supabase.storage
        .from("sponsors")
        .getPublicUrl(logoPath);
      
      return data.publicUrl;
    } catch (err) {
      console.error(`Unexpected error for ${logoPath}:`, err);
      return null;
    }
  };
  
  // Get public URLs for all sponsors
  const sponsorsWithUrls = await Promise.all(
    tierOrder.map(async (tier) => {
      const tieredSponsors = sponsorsByTier[tier] || [];
      const sponsorsWithPublicUrls = tieredSponsors.map((sponsor) => ({
        ...sponsor,
        imageUrl: getPublicUrl(sponsor.logo),
      }));
      return { tier, sponsors: sponsorsWithPublicUrls };
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

        {sponsorsWithUrls.map(({ tier, sponsors: tieredSponsors }) => (
          tieredSponsors.length > 0 && (
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
                {tieredSponsors.map((sponsor) => (
                  <a
                    key={sponsor.id}
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    title={sponsor.full_name}
                  >
                    <div className={`
                      bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 
                      flex items-center justify-center p-6 group-hover:scale-105
                      ${tier === "Tree" ? "h-48" : tier === "Sprout" ? "h-36" : "h-28"}
                    `}>
                      {sponsor.imageUrl ? (
                        <Image
                          src={sponsor.imageUrl}
                          alt={sponsor.full_name}
                          width={tier === "Tree" ? 300 : tier === "Sprout" ? 200 : 150}
                          height={tier === "Tree" ? 150 : tier === "Sprout" ? 100 : 75}
                          className="object-contain max-h-full max-w-full"
                          priority={tier === "Tree"} // Load Tree sponsors with priority
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <p className="text-sm font-medium">{sponsor.short_name}</p>
                          <p className="text-xs mt-1">Image not available</p>
                        </div>
                      )}
                    </div>
                    {/* Optional: Show sponsor name on hover */}
                    <p className="text-center mt-2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {sponsor.short_name}
                    </p>
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