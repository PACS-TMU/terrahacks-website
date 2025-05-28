import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

// Define team member type based on the database schema
interface TeamMember {
  id: number;
  name: string;
  position: string;
  committee: string;
  img: string;
  created_at?: string;
  updated_at?: string;
}

// Define committee order for display
const committeeOrder = [
  "Admin",
  "Technology",
  "Finance and Sponsorships",
  "Logistics and Ops",
  "Marketing",
  "Day-of"
];

// Group team members by committee
const groupByCommittee = (members: TeamMember[]) => {
  return members.reduce((acc, member) => {
    if (!acc[member.committee]) {
      acc[member.committee] = [];
    }
    acc[member.committee].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);
};

export default async function TeamPage() {
  const supabase = await createClient();
  
  // Fetch all team members from the database
  const { data: teamMembers, error } = await supabase
    .from("team")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching team members:", error);
    return (
      <div className="main py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Our Team</h1>
        <p className="text-center text-red-600">Error loading team members.</p>
      </div>
    );
  }

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <div className="main py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Our Team</h1>
        <p className="text-center">No team members found.</p>
      </div>
    );
  }

  // Group members by committee
  const membersByCommittee = groupByCommittee(teamMembers);
  
  // Function to get public URL for team member image
  const getImageUrl = (imagePath: string) => {
    const { data } = supabase.storage
      .from("team")
      .getPublicUrl(imagePath);
    
    return data.publicUrl;
  };

  return (
    <div className="main py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Our Team</h1>

      {committeeOrder.map((committee) => {
        const members = membersByCommittee[committee];
        if (!members || members.length === 0) return null;

        return (
          <div key={committee} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              {committee}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {members.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="mb-3">
                    <Image
                      src={getImageUrl(member.img)}
                      alt={member.name}
                      width={150}
                      height={150}
                      className="rounded-lg mx-auto"
                    />
                  </div>
                  
                  <h3 className="font-semibold">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {member.position}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}