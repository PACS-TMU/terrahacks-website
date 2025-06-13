"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [logoBefore, setLogoBefore] = useState<string>("");
    const [logoAfter, setLogoAfter] = useState<string>("");
   
    useEffect(() => {
        const supabase = createClient();
       
        // Get the hero background image URL
        const imageData = supabase.storage
            .from("main")
            .getPublicUrl("hero_background2.png");
        setImageUrl(imageData.data.publicUrl);
       
        // Get the logo before and after images
        const logoBeforeData = supabase.storage
            .from("main")
            .getPublicUrl("logo.png");
        setLogoBefore(logoBeforeData.data.publicUrl);
       
        // Preload and get the logo after image
        const logoAfterData = supabase.storage
            .from("main")
            .getPublicUrl("logo_letter.png");
        setLogoAfter(logoAfterData.data.publicUrl);
    }, []);
   
    return (
        <section id="hero" className="relative block pt-35 lg:pt-0" style={{ marginBottom: '0', paddingBottom: '0' }}>
            {/* Background Image */}
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt="Hero Background Image"
                    width={1920}
                    height={1080}
                    priority={true}
                    className="w-full object-cover"
                    style={{ display: 'block', marginBottom: '0', height: 'auto' }}
                />
            )}
           
            {/* Logo Container with Flip Animation - Adjusted positioning for mobile */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 lg:pt-0 -mt-8 lg:-mt-20 xl:-mt-24">
                <div className="relative w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px] xl:w-[650px] xl:h-[650px] group">
                    {/* Container for flip animation */}
                    <div
                        className="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
                        style={{ transformStyle: 'preserve-3d' }}>
                       
                        {/* Front Logo (logoBefore) - Hidden during flip */}
                        {logoBefore && (
                            <div
                                className="absolute inset-0 w-full h-full group-hover:opacity-0 transition-opacity duration-700 scale-110"
                                style={{ backfaceVisibility: 'hidden' }}>
                                <Image
                                    src={logoBefore}
                                    alt="TerraHacks Logo"
                                    fill
                                    priority={true}
                                    className="object-contain"
                                />
                            </div>
                        )}
                       
                        {/* Back Logo (logoAfter) - rotated 180 degrees initially */}
                        {logoAfter && (
                            <div
                                className="absolute inset-0 w-full h-full"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}
                            >
                                <Image
                                    src={logoAfter}
                                    alt="TerraHacks Logo Alternative"
                                    fill
                                    priority={true}
                                    className="object-contain"
                                />
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Text Container - Responsive text sizing */}
                <div className="flex flex-col items-center space-y-4 mt-4 lg:mt-8 px-4">
                    {/* Click here to start - Responsive text sizing */}
                    <Link 
                        href="/newsletter" 
                        className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-center drop-shadow-lg text-[#5D2A15] underline hover:opacity-80 transition-opacity duration-300"
                    >
                        Click Here To Start
                    </Link>
                    
                    {/* Date and location info - Responsive and better mobile layout */}
                    <div className="text-center drop-shadow-lg text-[#5D2A15] text-sm sm:text-base lg:text-lg">
                        <p className="block sm:hidden">
                            August 1st - 3rd, 2025<br />
                            Toronto Metropolitan University
                        </p>
                        <p className="hidden sm:block">
                            August 1st 2025 - August 3rd 2025&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hosted at Toronto Metropolitan University
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}