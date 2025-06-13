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
            .getPublicUrl("hero_background.png");
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
        <div className="relative">
            {/* Background Image */}
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt="Hero Background Image"
                    width={1920}
                    height={1080}
                    priority={true}
                    className="w-full h-auto object-contain"
                />
            )}
           
            {/* Logo Container with Flip Animation - Moved up to create space below */}
            <div className="absolute inset-0 flex flex-col items-center justify-center -mt-16 lg:-mt-20 xl:-mt-24">
                <div className="relative w-[450px] h-[450px] lg:w-[550px] lg:h-[550px] xl:w-[650px] xl:h-[650px] group cursor-pointer">
                    {/* Container for flip animation */}
                    <div
                        className="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
                        style={{ transformStyle: 'preserve-3d' }}>
                       
                        {/* Front Logo (logoBefore) - Hidden during flip */}
                        {logoBefore && (
                            <div
                                className="absolute inset-0 w-full h-full group-hover:opacity-0 transition-opacity duration-700 scale-110"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
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
                                className="absolute inset-0 w-full h-ful scale-0"
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
                
                {/* Text Container - Now properly ordered */}
                <div className="flex flex-col items-center space-y-4 mt-8">
                    {/* Click here to start - Now above the date */}
                    <Link 
                        href="/newsletter" 
                        className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold text-center drop-shadow-lg text-[#5D2A15] hover:opacity-80 transition-opacity duration-300"
                    >
                        Click Here To Start
                    </Link>
                    
                    {/* Date and location info - Now below the click text */}
                    <p className="text-white text-center drop-shadow-lg text-[#5D2A15]">
                       August 1st 2025 - August 3rd 2025&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hosted at Toronto Metropolitan University
                    </p>
                </div>
            </div>
        </div>
    );
}