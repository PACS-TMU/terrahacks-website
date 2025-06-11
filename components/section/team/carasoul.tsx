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
}

export default function TeamCarousel() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

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
      await Promise.allSettled(imagePromises); // Use allSettled to handle some failed images
      setImagesLoaded(true);
    } catch (error) {
      console.error('Some images failed to preload');
      setImagesLoaded(true); // Still show the carousel even if some images fail
    }
  };

  useEffect(() => {
    const supabase = createClient();
    
    const fetchTeamMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('team')
          .select('img, name, position');
       
        if (error) {
          throw error;
        }
        
        if (data) {
          setTeamMembers(data);
          // Preload images after setting team members
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

  // Track individual image loading
  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set([...Array.from(prev), index]));
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
    <div className="w-full max-w-6xl mx-auto mr-9">
    
      
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        // pagination={{
        //   clickable: true,
        //   dynamicBullets: true,
        // }}
        navigation={false}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        centeredSlides={true}
        grabCursor={false}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper !pb-12"
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center justify-center h-full p-4 md:p-6 lg:p-8">
              <div className="bg-white rounded-xl  p-6 w-full max-w-sm mx-auto transition-transform duration-300 hover:scale-105">
                <div className="relative mb-6">
                  {/* Loading placeholder */}
                  {!loadedImages.has(index) && (
                    <div className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full bg-gray-200 animate-pulse mx-auto border-4 border-white shadow-lg flex items-center justify-center">
                      <div className="text-gray-400 text-sm">Loading...</div>
                    </div>
                  )}
                  
                  <img 
                    src={member.img} 
                    alt={member.name}
                    className={`w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full object-cover object-center mx-auto border-4 border-white shadow-lg transition-opacity duration-300 ${
                      loadedImages.has(index) ? 'opacity-100' : 'opacity-0 absolute top-0'
                    }`}
                    onLoad={() => handleImageLoad(index)}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=e5e7eb&color=374151`;
                      handleImageLoad(index);
                    }}
                    loading="eager" // Load images immediately
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <h4 className="text-sm md:text-base lg:text-lg text-blue-600 font-medium mb-4">
                    {member.position}
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}