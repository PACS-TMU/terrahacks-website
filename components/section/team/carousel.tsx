"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

interface TeamMember {
  img: string;
  name: string;
  position: string;
  committee: string;
  priority: number;
}

interface CommitteeGroup {
  committeeName: string;
  members: TeamMember[];
}

export default function Carousel() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [committeeGroups, setCommitteeGroups] = useState<CommitteeGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Preload images function
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = src;
    });
  };

  // Preload all images
  const preloadAllImages = async (members: TeamMember[]) => {
    try {
      const imagePromises = members.map(member => preloadImage(member.img));
      await Promise.allSettled(imagePromises);
      setImagesLoaded(true);
    } catch (error) {
      console.error('Some images failed to preload');
      setImagesLoaded(true);
    }
  };

  // Group team members by committee
  const groupByCommittee = (members: TeamMember[]): CommitteeGroup[] => {
    const grouped = members.reduce((acc, member) => {
      const committee = member.committee || 'Other';
      if (!acc[committee]) {
        acc[committee] = [];
      }
      acc[committee].push(member);
      return acc;
    }, {} as Record<string, TeamMember[]>);

    // Convert to array and sort by committee name
    return Object.entries(grouped)
      .map(([committeeName, members]) => ({
        committeeName,
        members: members.sort((a, b) => {
          const priorityA = (a as any).priority ?? 999;
          const priorityB = (b as any).priority ?? 999;

          if (priorityA !== priorityB) return priorityA - priorityB;
          return a.name.localeCompare(b.name);
        })
      }))
      .sort((a, b) => a.committeeName.localeCompare(b.committeeName)); // Sort committees alphabetically
  };

  useEffect(() => {
    const supabase = createClient();

    const fetchTeamMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('team')
          .select('img, name, position, committee, priority')
          .order('committee', { ascending: true })
          .order('name', { ascending: true });

        if (error) {
          throw error;
        }

        if (data) {
          setTeamMembers(data);
          const grouped = groupByCommittee(data);
          setCommitteeGroups(grouped);
          await preloadAllImages(data);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Track individual image loading with unique identifier
  const handleImageLoad = (memberName: string) => {
    setLoadedImages(prev => new Set([...Array.from(prev), memberName]));
  };

  if (loading || !imagesLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">
          {loading ? "Loading team members..." : "Loading images..."}
        </span>
        {!loading && (
          <div className="mt-2 text-sm text-gray-500">
            {loadedImages.size} of {teamMembers.length} images loaded
          </div>
        )}
      </div>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-600">No team members found.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Right-aligned Carousel Container */}
      <div className="flex justify-end">
        <div className="w-full lg:w-2/3">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            navigation={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            loop={committeeGroups.length > 1}
            centeredSlides={false}
            grabCursor={false}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper !pb-12"
          >
            {committeeGroups.map((group, groupIndex) => (
              <SwiperSlide key={groupIndex}>
                <div className="p-6 flex flex-col items-center justify-center min-h-[500px]">
                  {/* Committee Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                      {group.committeeName}
                    </h3>
                  </div>

                  {/* Committee Members Grid */}
                  <div className="flex justify-center w-full">
                    <div className={`grid gap-6 place-items-center ${group.members.length === 1 ? 'grid-cols-1' :
                      group.members.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
                        group.members.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
                          group.members.length === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' :
                            group.members.length <= 6 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
                              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      }`}>
                      {group.members.map((member, memberIndex) => (
                        <div
                          key={`${group.committeeName}-${member.name}-${memberIndex}`}
                          className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl w-full max-w-xs"
                        >
                          <div className="relative mb-4">
                            {/* Loading placeholder */}
                            {!loadedImages.has(member.name) && (
                              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-200 animate-pulse mx-auto border-4 border-white shadow-lg flex items-center justify-center">
                                <div className="text-gray-400 text-xs">Loading...</div>
                              </div>
                            )}

                            <img
                              src={member.img}
                              alt={member.name}
                              className={`w-24 h-24 md:w-28 md:h-28 rounded-full object-cover object-center mx-auto border-4 border-white shadow-lg transition-opacity duration-300 ${loadedImages.has(member.name) ? 'opacity-100' : 'opacity-0 absolute top-0'
                                }`}
                              onLoad={() => handleImageLoad(member.name)}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=e5e7eb&color=374151`;
                                handleImageLoad(member.name);
                              }}
                              loading="eager"
                            />
                          </div>

                          <div className="text-center">
                            <h4 className="text-lg font-bold text-gray-800 mb-1">
                              {member.name}
                            </h4>
                            <p className="text-sm text-blue-600 font-medium">
                              {member.position}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}